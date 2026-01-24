import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseUnits, formatEther, formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import LendingPoolABI from './abis/LendingPool.json';
import MockUSDT0ABI from './abis/MockUSDT0.json';
import logo from './assets/rootstock-logo.png';
import './App.css';

// TODO: Update these with deployed addresses
const LENDING_POOL_ADDRESS = '0x65eB9d654c7170bD2b1fB1070437DF5CC5E8da01'; // Deployed on RSK Testnet
const USDT0_ADDRESS = '0xad28C3C13a14baFD41B38633E4dE5f71F56C2FA5';      // Deployed on RSK Testnet

function App() {
  const { address, isConnected } = useAccount();

  const [depositAmount, setDepositAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const { data: accountDataRaw, refetch: refetchAccount } = useReadContract({
    address: LENDING_POOL_ADDRESS,
    abi: LendingPoolABI,
    functionName: 'getAccountData',
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  const accountData = accountDataRaw as [bigint, bigint, bigint, bigint, bigint, bigint] | undefined;

  const { data: usdtBalance, refetch: refetchUsdt } = useReadContract({
    address: USDT0_ADDRESS,
    abi: MockUSDT0ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: usdtAllowance, refetch: refetchAllowance } = useReadContract({
    address: USDT0_ADDRESS,
    abi: MockUSDT0ABI,
    functionName: 'allowance',
    args: [address, LENDING_POOL_ADDRESS],
    query: {
      enabled: !!address,
    },
  });

  const { writeContract, data: txHash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetchAccount();
      refetchUsdt();
      refetchAllowance();
      setDepositAmount('');
      setBorrowAmount('');
      setRepayAmount('');
      setWithdrawAmount('');
    }
  }, [isConfirmed]);

  const handleDeposit = () => {
    if (!depositAmount) return;
    writeContract({
      address: LENDING_POOL_ADDRESS,
      abi: LendingPoolABI,
      functionName: 'depositRBTC',
      value: parseEther(depositAmount),
    });
  };

  const handleWithdraw = () => {
    if (!withdrawAmount) return;
    writeContract({
      address: LENDING_POOL_ADDRESS,
      abi: LendingPoolABI,
      functionName: 'withdrawRBTC',
      args: [parseEther(withdrawAmount)],
    });
  };

  const handleBorrow = () => {
    if (!borrowAmount) return;
    writeContract({
      address: LENDING_POOL_ADDRESS,
      abi: LendingPoolABI,
      functionName: 'borrowUSDT0',
      args: [parseUnits(borrowAmount, 6)],
    });
  };

  const handleApprove = () => {
    if (!repayAmount) return;
    writeContract({
      address: USDT0_ADDRESS,
      abi: MockUSDT0ABI,
      functionName: 'approve',
      args: [LENDING_POOL_ADDRESS, parseUnits(repayAmount, 6)],
    });
  };

  const handleRepay = () => {
    if (!repayAmount) return;
    writeContract({
      address: LENDING_POOL_ADDRESS,
      abi: LendingPoolABI,
      functionName: 'repayUSDT0',
      args: [parseUnits(repayAmount, 6)],
    });
  };

  const formatUSDT = (val: bigint) => formatUnits(val, 6);
  const formatRBTC = (val: bigint) => formatEther(val);

  const formatHealthFactor = (hf: bigint) => {
    const MAX_UINT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    if (hf >= MAX_UINT256) return '∞';
    return parseFloat(formatEther(hf)).toFixed(2);
  };

  const getHealthFactorColor = (hf: bigint) => {
    const MAX_UINT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    if (hf >= MAX_UINT256) return '#4caf50';
    const val = Number(formatEther(hf));
    if (val < 1.1) return '#ff4444';
    return '#4caf50';
  };

  return (
    <div>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="Rootstock Logo" style={{ height: '40px' }} />
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </header>

      {!isConnected && (
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Welcome to Rootstock Lending</h2>
          <p style={{ color: 'var(--rs-text-secondary)', marginBottom: '2rem' }}>
            Connect your wallet to supply collateral and borrow stablecoins.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ConnectButton />
          </div>
        </div>
      )}

      {isConnected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          

          <div className="card">
            <h2>Your Account</h2>
            {accountData ? (
              <div className="account-grid">
                <div className="account-item">
                  <label>Collateral</label>
                  <span>{formatRBTC(accountData[0])} RBTC</span>
                </div>
                <div className="account-item">
                  <label>Debt</label>
                  <span>{formatUSDT(accountData[1])} USDT0</span>
                </div>
                <div className="account-item">
                  <label>Collateral Value</label>
                  <span>${formatEther(accountData[2])}</span>
                </div>
                <div className="account-item">
                  <label>Debt Value</label>
                  <span>${formatEther(accountData[3])}</span>
                </div>
                <div className="account-item">
                  <label>Health Factor</label>
                  <span style={{ color: getHealthFactorColor(accountData[5]) }}>
                    {formatHealthFactor(accountData[5])}
                  </span>
                </div>
                <div className="account-item">
                  <label>Wallet Balance</label>
                  <span>{usdtBalance ? formatUSDT(usdtBalance as bigint) : '0'} USDT0</span>
                </div>
              </div>
            ) : (
              <p>Loading account data...</p>
            )}
          </div>

          <div className="grid-2">
            
            <div className="card">
              <h2>Supply / Withdraw RBTC</h2>
              <div className="row">
                <input 
                  type="number" 
                  placeholder="Amount RBTC" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <button onClick={handleDeposit} disabled={isPending || !depositAmount}>Deposit</button>
              </div>
              <div className="row">
                <input 
                  type="number" 
                  placeholder="Amount RBTC" 
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <button onClick={handleWithdraw} disabled={isPending || !withdrawAmount}>Withdraw</button>
              </div>
            </div>

            <div className="card">
              <h2>Borrow / Repay USDT0</h2>
              <div className="row">
                <input 
                  type="number" 
                  placeholder="Amount USDT0" 
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                />
                <button onClick={handleBorrow} disabled={isPending || !borrowAmount}>Borrow</button>
              </div>
              <div className="row">
                <input 
                  type="number" 
                  placeholder="Amount USDT0" 
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleApprove} disabled={isPending || !repayAmount}>Approve</button>
                  <button onClick={handleRepay} disabled={isPending || !repayAmount}>Repay</button>
                </div>
              </div>
              <small style={{ color: 'var(--rs-text-secondary)' }}>
                Current Allowance: {usdtAllowance ? formatUSDT(usdtAllowance as bigint) : '0'} USDT0
              </small>
            </div>

          </div>

          {isPending && <div className="status-card" style={{ backgroundColor: 'rgba(247, 147, 26, 0.1)', color: 'var(--rs-orange)' }}>Transaction Pending...</div>}
          {isConfirming && <div className="status-card" style={{ backgroundColor: 'rgba(247, 147, 26, 0.1)', color: 'var(--rs-orange)' }}>Waiting for confirmation...</div>}
          {isConfirmed && <div className="status-card" style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}>Transaction Confirmed!</div>}
          {writeError && <div className="status-card" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', color: '#ff4444' }}>Error: {writeError.message}</div>}

        </div>
      )}
    </div>
  );
}

export default App;
