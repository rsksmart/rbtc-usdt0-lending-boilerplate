import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { rootstock, rootstockTestnet } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'RBTC Lending',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [rootstock, rootstockTestnet],
  transports: {
    [rootstock.id]: http(),
    [rootstockTestnet.id]: http('https://public-node.testnet.rsk.co'), 
  },
});
