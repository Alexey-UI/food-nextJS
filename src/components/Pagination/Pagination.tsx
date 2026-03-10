import styles from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({page, totalPages, onChange}: PaginationProps) => {
  const createPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPages();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <svg
          width="11"
          height="23"
          viewBox="0 0 11 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2133 21.87L1.51998 13.1767C0.493317 12.15 0.493317 10.47 1.51998 9.44333L10.2133 0.75"
            stroke={page === 1 ? '#AFADB5' : '#151411'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.pages}>
        {pages.map((p, index) => {
          const key = typeof p === 'number' ? `page-${p}` : `dots-${index}`;

          if (typeof p !== 'number') {
            return (
              <span
                key={key}
                className={styles.dots}
              >
                  ...
                </span>
            );
          }

          return (
            <button
              key={key}
              className={`${styles.page} ${p === page ? styles.active : ''}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        className={styles.arrow}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <svg
          width="13"
          height="23"
          viewBox="0 0 11 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 21.87L9.44333 13.1767C10.47 12.15 10.47 10.47 9.44333 9.44333L0.75 0.75"
            stroke={page === totalPages ? '#AFADB5' : '#151411'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
