# RBTC/USDT0 Simple Lending Boilerplate

## Overview
This is a Rootstock (RSK) blockchain lending boilerplate project that demonstrates how to:
- Deposit RBTC (native token) as collateral
- Borrow USDT0 (ERC-20, 6 decimals) against collateral
- Query prices via UmbrellaOracleAdapter (mock oracle)
- Compute health factor for loan positions

**Educational purposes only - not audited for production use**

## Recent Changes
**2025-09-30**: Initial project setup
- Upgraded to Node.js v22.17.0 (required by Hardhat)
- Installed npm dependencies
- Configured Demo workflow to run the lending demo
- Fixed Hardhat analytics prompt issue

## Project Architecture

### Smart Contracts
- **LendingPool.sol**: Core lending logic (deposit, borrow, repay, withdraw)
- **UmbrellaOracleAdapter.sol**: Mock price oracle with owner-settable prices
- **MockUSDT0.sol**: ERC-20 token (6 decimals) for testing
- **IPriceOracle.sol**: Price oracle interface

### Key Features
- Collateral: RBTC (18 decimals)
- Borrow Asset: USDT0 (6 decimals)
- Oracle: Returns USD prices with 18 decimals
- LTV (Loan-to-Value): 70% configured
- Health Factor calculation for position monitoring

### Scripts
- **demo.js**: Local Hardhat demo (deposits, borrows, repays, withdraws)
- **demo-testnet.js**: RSK testnet deployment script

## Technology Stack
- **Hardhat**: v2.22.7 (Smart contract development framework)
- **Node.js**: v22.17.0 (Required by Hardhat)
- **OpenZeppelin Contracts**: v4.9.6 (Security-audited contract libraries)
- **Solidity**: v0.8.19

## Workflows
- **Demo**: Runs `echo "n" | npx hardhat run scripts/demo.js`
  - Compiles contracts
  - Deploys to local Hardhat network
  - Demonstrates full lending cycle
  - Output type: console

## Development Notes
- Hardhat analytics prompt is handled via piped input ("n")
- Local development uses Hardhat's built-in network
- No interest accrual implemented (simplified model)
- No liquidation mechanism (educational scope)
- Single collateral/borrow asset only

## User Preferences
- None documented yet

## Omitted Features (By Design)
- Interest rate calculations
- Liquidation mechanisms
- Multiple collateral types
- Production oracle integration
- Role-based access beyond Ownable
