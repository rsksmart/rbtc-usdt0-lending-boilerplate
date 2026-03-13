import { formatEther, formatUnits, maxUint256 } from 'viem';
import { USDT0_DECIMALS } from '../config/contracts';

export const MAX_UINT256 = maxUint256;

export function formatUSDT(value: bigint) {
  return formatUnits(value, USDT0_DECIMALS);
}

export function formatRBTC(value: bigint) {
  return formatEther(value);
}

export function formatUsdE18(value: bigint) {
  return formatEther(value);
}

export function formatHealthFactor(value: bigint) {
  if (value >= MAX_UINT256) {
    return '∞';
  }

  return parseFloat(formatEther(value)).toFixed(2);
}

export function getHealthFactorColor(value: bigint) {
  if (value >= MAX_UINT256) {
    return 'var(--rs-success)';
  }

  const numeric = Number(formatEther(value));

  if (numeric < 1.1) {
    return 'var(--rs-error)';
  }

  return 'var(--rs-success)';
}
