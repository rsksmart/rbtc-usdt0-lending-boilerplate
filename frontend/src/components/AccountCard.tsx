import type { AccountData } from '../types/lending';
import {
  formatHealthFactor,
  formatRBTC,
  formatUSDT,
  formatUsdE18,
  getHealthFactorColor,
} from '../utils/format';

type AccountCardProps = {
  accountData?: AccountData;
  usdtBalance?: bigint;
  rbtcBalance?: bigint;
};

function AccountCard({ accountData, usdtBalance, rbtcBalance }: AccountCardProps) {
  return (
    <section className="card">
      <h2>Your Account</h2>
      {accountData ? (
        <div className="account-grid">
          <div className="account-item">
            <span className="account-label">Collateral</span>
            <span className="account-value">{formatRBTC(accountData[0])} RBTC</span>
          </div>
          <div className="account-item">
            <span className="account-label">Debt</span>
            <span className="account-value">{formatUSDT(accountData[1])} USDT0</span>
          </div>
          <div className="account-item">
            <span className="account-label">Collateral Value</span>
            <span className="account-value">${formatUsdE18(accountData[2])}</span>
          </div>
          <div className="account-item">
            <span className="account-label">Debt Value</span>
            <span className="account-value">${formatUsdE18(accountData[3])}</span>
          </div>
          <div className="account-item">
            <span className="account-label">Health Factor</span>
            <span
              className="account-value"
              style={{ color: getHealthFactorColor(accountData[5]) }}
            >
              {formatHealthFactor(accountData[5])}
            </span>
          </div>
          <div className="account-item">
            <span className="account-label">RBTC Balance</span>
            <span className="account-value">
              {rbtcBalance !== undefined ? formatRBTC(rbtcBalance) : '0'} RBTC
            </span>
            {rbtcBalance === 0n && (
              <small style={{ color: 'var(--rs-error)', fontSize: '0.7rem' }}>
                <a href="https://faucet.rootstock.io/" target="_blank" rel="noreferrer">Get RBTC Faucet</a>
              </small>
            )}
          </div>
          <div className="account-item">
            <span className="account-label">USDT0 Balance</span>
            <span className="account-value">
              {usdtBalance !== undefined ? formatUSDT(usdtBalance) : '0'} USDT0
            </span>
          </div>
        </div>
      ) : (
        <p>Loading account data...</p>
      )}
    </section>
  );
}

export default AccountCard;
