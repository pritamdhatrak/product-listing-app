import styles from '../styles/Products.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading products...</p>
    </div>
  );
}
