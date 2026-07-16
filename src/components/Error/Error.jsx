import styles from "./Error.module.css";

function Error({ message, onRetry }) {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
}

export default Error;
