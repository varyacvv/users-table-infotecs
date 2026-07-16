import styles from "./Pagination.module.css";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        ←
      </button>

      <span>
        Страница {page} из {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
