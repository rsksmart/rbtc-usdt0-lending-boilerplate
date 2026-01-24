import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { rootstock, rootstockTestnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RBTC Lending',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [rootstock, rootstockTestnet],
});
