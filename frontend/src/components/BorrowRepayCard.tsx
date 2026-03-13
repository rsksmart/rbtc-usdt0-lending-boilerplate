type BorrowRepayCardProps = {
  borrowAmount: string;
  repayAmount: string;
  onChangeBorrowAmount: (value: string) => void;
  onChangeRepayAmount: (value: string) => void;
  onBorrow: () => void;
  onApprove: () => void;
  onRepay: () => void;
  isLoading: boolean;
  currentAllowance?: bigint;
  formatUSDT: (value: bigint) => string;
};

function BorrowRepayCard({
  borrowAmount,
  repayAmount,
  onChangeBorrowAmount,
  onChangeRepayAmount,
  onBorrow,
  onApprove,
  onRepay,
  isLoading,
  currentAllowance,
  formatUSDT,
}: BorrowRepayCardProps) {
  return (
    <section className="card">
      <h2>Borrow / Repay USDT0</h2>

      <div className="field">
        <label htmlFor="borrow-amount" className="field-label">
          Amount USDT0 to borrow
        </label>
        <div className="row">
          <input
            id="borrow-amount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={borrowAmount}
            onChange={(event) => onChangeBorrowAmount(event.target.value)}
          />
          <button
            onClick={onBorrow}
            disabled={isLoading || !borrowAmount}
            aria-label="Borrow USDT0 using your RBTC collateral"
          >
            Borrow
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="repay-amount" className="field-label">
          Amount USDT0 to repay
        </label>
        <div className="row">
          <input
            id="repay-amount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={repayAmount}
            onChange={(event) => onChangeRepayAmount(event.target.value)}
          />
          <div className="row-actions">
            <button
              onClick={onApprove}
              disabled={isLoading || !repayAmount}
              aria-label="Approve USDT0 for repayment"
            >
              Approve
            </button>
            <button
              onClick={onRepay}
              disabled={isLoading || !repayAmount}
              aria-label="Repay borrowed USDT0"
            >
              Repay
            </button>
          </div>
        </div>
      </div>

      <small className="allowance-helper">
        Current Allowance:{' '}
        {currentAllowance !== undefined ? formatUSDT(currentAllowance) : '0'} USDT0
      </small>
    </section>
  );
}

export default BorrowRepayCard;
