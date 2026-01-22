import { createContext, useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { WalletConnectV2Adapter } from "@web3auth/wallet-connect-v2-adapter";
import { ethers } from "ethers";

const Web3AuthContext = createContext(null);

export const Web3AuthProvider = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1f",
    rpcTarget: "https://public-node.testnet.rsk.co",
    displayName: "Rootstock Testnet",
    blockExplorerUrl: "https://explorer.testnet.rsk.co",
    ticker: "tRBTC",
    tickerName: "Testnet RBTC",
  };

  const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID || ""; 

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
        });
        web3authInstance.configureAdapter(metamaskAdapter);

        const walletConnectAdapter = new WalletConnectV2Adapter({
          clientId,
          options: {
            projectId: import.meta.env.VITE_REOWN_PROJECT_ID || "00d4b5e3e5b3d8b42f8e354c07226687",
            showQrModal: true,
          }
        });
        web3authInstance.configureAdapter(walletConnectAdapter);
        
        console.log("Web3Auth Instance created:", web3authInstance);
        if (typeof web3authInstance.initModal !== 'function') {
            console.error("CRITICAL: initModal is not a function on web3authInstance", web3authInstance);
            console.log("Available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(web3authInstance)));
        }

        setWeb3Auth(web3authInstance);

        await web3authInstance.initModal();
        console.log("Web3Auth Modal Initialized");
        
        if (web3authInstance.connected) {
          setProvider(web3authInstance.provider);
          setLoggedIn(true);
          const user = await web3authInstance.getUserInfo();
          setUserInfo(user);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      console.log("Connecting to Web3Auth...");
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
      const user = await web3auth.getUserInfo();
      setUserInfo(user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setUserInfo(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getEthersProvider = () => {
    if (!provider) return null;
    return new ethers.BrowserProvider(provider);
  };

  const getSigner = async () => {
    const ethersProvider = getEthersProvider();
    if (!ethersProvider) return null;
    return await ethersProvider.getSigner();
  };

  return (
    <Web3AuthContext.Provider
      value={{
        web3auth,
        provider,
        loggedIn,
        userInfo,
        login,
        logout,
        getEthersProvider,
        getSigner,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => useContext(Web3AuthContext);
