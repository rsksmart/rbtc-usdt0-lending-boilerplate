type StatusVariant = 'pending' | 'confirming' | 'success' | 'error';

type StatusMessageProps = {
  message: string;
  variant: StatusVariant;
};

function StatusMessage({ message, variant }: StatusMessageProps) {
  if (!message) {
    return null;
  }

  const role = variant === 'error' ? 'alert' : 'status';
  const ariaLive = variant === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={`status-card status-card-${variant}`}
      role={role}
      aria-live={ariaLive}
    >
      {message}
    </div>
  );
}

export default StatusMessage;
