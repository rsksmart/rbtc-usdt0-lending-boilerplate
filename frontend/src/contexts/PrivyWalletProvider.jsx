import { PrivyProvider } from '@privy-io/react-auth';

export const PrivyWalletProvider = ({ children }) => {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#F3861F',
          showWalletLoginFirst: true,
        },
        supportedChains: [{
          id: 31,
          name: 'Rootstock Testnet',
          network: 'rootstock-testnet',
          rpcUrls: {
            default: {
              http: ['https://public-node.testnet.rsk.co'],
            },
            public: {
              http: ['https://public-node.testnet.rsk.co'],
            },
          },
          nativeCurrency: {
            name: 'Rootstock Bitcoin',
            symbol: 'tRBTC',
            decimals: 18,
          },
        }],
      }}
    >
      {children}
    </PrivyProvider>
  );
};
