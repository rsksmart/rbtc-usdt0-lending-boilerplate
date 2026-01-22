import { useState, useEffect } from "react";
import { useWeb3Auth } from "./contexts/Web3AuthContext";
import { ethers } from "ethers";
import "./App.css";

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

function App() {
  const {
    web3auth,
    provider: web3AuthProvider,
    loggedIn: web3AuthLoggedIn,
    userInfo: web3AuthUserInfo,
    login: loginWeb3Auth,
    logout: logoutWeb3Auth,
    getEthersProvider: getWeb3AuthEthersProvider,
    getSigner: getWeb3AuthSigner,
  } = useWeb3Auth();

  const { login: loginPrivy, authenticated: privyAuthenticated, logout: logoutPrivy, user: privyUser } = usePrivy();
  const { wallets: privyWallets } = useWallets();

  const { open: openReown } = useAppKit();
  const { address: reownAddress, isConnected: reownConnected } = useAppKitAccount();
  const { walletProvider: reownWalletProvider } = useAppKitProvider('eip155');

  const loggedIn = web3AuthLoggedIn || privyAuthenticated || reownConnected;
  
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [address, setAddress] = useState("");

  const getGlobalSigner = async () => {
    if (web3AuthLoggedIn) {
        return getWeb3AuthSigner();
    }
    if (privyAuthenticated && privyWallets.length > 0) {
        const provider = await privyWallets[0].getEthersProvider();
        return provider.getSigner();
    }
    if (reownConnected && reownWalletProvider) {
        const provider = new ethers.BrowserProvider(reownWalletProvider);
        return provider.getSigner();
    }
    throw new Error("No wallet connected");
  };

  const getGlobalProvider = async () => {
    if (web3AuthLoggedIn) {
        return getWeb3AuthEthersProvider();
    }
    if (privyAuthenticated && privyWallets.length > 0) {
        return privyWallets[0].getEthersProvider();
    }
    if (reownConnected && reownWalletProvider) {
        return new ethers.BrowserProvider(reownWalletProvider);
    }
    return null;
  };

  const handleLogout = async () => {
    if (web3AuthLoggedIn) await logoutWeb3Auth();
    if (privyAuthenticated) await logoutPrivy();
    if (reownConnected) await openReown({ view: 'Account' }); 
    setBalance("0");
    setAddress("");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (loggedIn) {
        try {
            const signer = await getGlobalSigner();
            const addr = await signer.getAddress();
            setAddress(addr);
            
            const provider = await getGlobalProvider();
            if (provider) {
                const bal = await provider.getBalance(addr);
                setBalance(ethers.formatEther(bal));
            }
        } catch (e) {
            console.error("Error fetching balance", e);
        }
      }
    };
    fetchBalance();
  }, [loggedIn, web3AuthLoggedIn, privyAuthenticated, reownConnected, privyWallets, reownWalletProvider]);

  const LoginView = () => (
    <div className="card login-card">
      <h2>Welcome to <span className="highlight-orange">RBTC Lending</span></h2>
      <p>Connect your wallet to get started</p>
      
      <div className="login-buttons">
        <button onClick={loginWeb3Auth} className="btn-web3auth">
            Login with Web3Auth
        </button>
        
        <button onClick={loginPrivy} className="btn-privy">
            Login with Privy
        </button>
        
        <button onClick={() => openReown()} className="btn-reown">
            Connect with Reown
        </button>
      </div>
    </div>
  );

  const DashboardView = () => {
    let userName = "User";
    let userEmail = "";
    
    if (web3AuthLoggedIn) {
        userName = web3AuthUserInfo?.name || "Web3Auth User";
        userEmail = web3AuthUserInfo?.email;
    } else if (privyAuthenticated) {
        userName = "Privy User";
        userEmail = privyUser?.email?.address || privyUser?.wallet?.address;
    } else if (reownConnected) {
        userName = "Reown User";
        userEmail = reownAddress;
    }

    return (
        <div className="dashboard">
        <div className="header">
            <h2>Dashboard</h2>
            <div className="user-info">
                <p><strong>User:</strong> {userName}</p>
                {userEmail && <p><strong>Info:</strong> {userEmail}</p>}
                <p><strong>Address:</strong> {address.slice(0, 6)}...{address.slice(-4)}</p>
                <p><strong>Balance:</strong> {parseFloat(balance).toFixed(4)} RBTC</p>
                <button onClick={handleLogout} className="logout-btn">Logout / Switch</button>
            </div>
        </div>
        </div>
    );
  };

  if (!web3auth) {
    return <div>Loading Web3Auth...</div>;
  }

  return (
    <div className="App">
      <h1>Rootstock Lending dApp</h1>
      {loggedIn ? <DashboardView /> : <LoginView />}
    </div>
  );
}

export default App;
