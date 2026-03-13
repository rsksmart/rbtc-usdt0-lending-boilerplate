import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/rootstock-logo.png';

function HeaderBar() {
  return (
    <header>
      <div className="header-left">
        <img src={logo} alt="Rootstock Logo" className="app-logo" />
      </div>
      <ConnectButton showBalance={false} chainStatus="icon" />
    </header>
  );
}

export default HeaderBar;
