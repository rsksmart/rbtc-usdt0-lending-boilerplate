import { ConnectButton } from '@rainbow-me/rainbowkit';

function WelcomeCard() {
  return (
    <section className="card welcome-card">
      <h2>Welcome to Rootstock Lending</h2>
      <p className="card-subtitle">
        Connect your wallet to supply collateral and borrow stablecoins.
      </p>
      <div className="welcome-actions">
        <ConnectButton />
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.875rem' }}>
        Need test tokens?{' '}
        <a 
          href="https://faucet.rootstock.io/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Rootstock Faucet
        </a>
      </p>
    </section>
  );
}

export default WelcomeCard;
