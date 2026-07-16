import styles from '../styles/Products.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button 
        className={styles.paginationBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {pageNumbers.map(number => (
        <button 
          key={number}
          className={`${styles.paginationBtn} ${currentPage === number ? styles.activePage : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      <button 
        className={styles.paginationBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
