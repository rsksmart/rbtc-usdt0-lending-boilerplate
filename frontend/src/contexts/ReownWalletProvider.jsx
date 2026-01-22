import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || "";

const rootstockTestnet = {
  id: 31,
  name: 'Rootstock Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Rootstock Bitcoin',
    symbol: 'tRBTC',
  },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
    public: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.testnet.rsk.co' },
  },
  testnet: true,
}

const metadata = {
  name: 'RBTC Lending',
  description: 'RBTC-USDT0 Lending Boilerplate',
  url: 'https://rbtc-lending.com',
  icons: ['https://avatars.mywebsite.com/']
}

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [rootstockTestnet],
  projectId,
  features: {
    analytics: false 
  }
})

export const ReownWalletProvider = ({ children }) => {
  return <>{children}</>;
};
