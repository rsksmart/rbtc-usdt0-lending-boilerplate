# RBTC-USDT0 Lending Boilerplate Frontend

The frontend interface for the RBTC-USDT0 Lending Boilerplate, built with React and Vite. This application demonstrates how to integrate multiple Web3 authentication providers and interact with the Rootstock Testnet.

## Features

- **Multi-Provider Authentication**:
  - **Web3Auth**: Social logins (Google, etc.) and plug-and-play wallet connection.
  - **Reown (formerly WalletConnect)**: Connect external wallets like MetaMask, Trust Wallet, etc.
  - **Privy**: Embedded wallet solutions for seamless onboarding.
- **Rootstock Integration**: Pre-configured for Rootstock Testnet (Chain ID 31).
- **Modern UI**: Dark-themed, responsive interface matching Rootstock branding.
- **Vite Polyfills**: Configured to support Node.js globals (Buffer, process) required by Web3 libraries.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the `frontend` directory based on the example below. You will need API keys from the respective service providers.

```env
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
VITE_REOWN_PROJECT_ID=your_reown_project_id
VITE_PRIVY_APP_ID=your_privy_app_id
```

- **Web3Auth Client ID**: Get it from the [Web3Auth Dashboard](https://dashboard.web3auth.io/).
- **Reown Project ID**: Get it from [Reown Cloud](https://cloud.reown.com/).
- **Privy App ID**: Get it from the [Privy Dashboard](https://dashboard.privy.io/).

## Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).