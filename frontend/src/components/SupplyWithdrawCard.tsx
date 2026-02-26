type SupplyWithdrawCardProps = {
  depositAmount: string;
  withdrawAmount: string;
  onChangeDepositAmount: (value: string) => void;
  onChangeWithdrawAmount: (value: string) => void;
  onDeposit: () => void;
  onWithdraw: () => void;
  isLoading: boolean;
};

function SupplyWithdrawCard({
  depositAmount,
  withdrawAmount,
  onChangeDepositAmount,
  onChangeWithdrawAmount,
  onDeposit,
  onWithdraw,
  isLoading,
}: SupplyWithdrawCardProps) {
  return (
    <section className="card">
      <h2>Supply / Withdraw RBTC</h2>

      <div className="field">
        <label htmlFor="deposit-amount" className="field-label">
          Amount RBTC to deposit
        </label>
        <div className="row">
          <input
            id="deposit-amount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={depositAmount}
            onChange={(event) => onChangeDepositAmount(event.target.value)}
          />
          <button onClick={onDeposit} disabled={isLoading || !depositAmount}>
            Deposit
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="withdraw-amount" className="field-label">
          Amount RBTC to withdraw
        </label>
        <div className="row">
          <input
            id="withdraw-amount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={withdrawAmount}
            onChange={(event) => onChangeWithdrawAmount(event.target.value)}
          />
          <button onClick={onWithdraw} disabled={isLoading || !withdrawAmount}>
            Withdraw
          </button>
        </div>
      </div>
    </section>
  );
}

export default SupplyWithdrawCard;
