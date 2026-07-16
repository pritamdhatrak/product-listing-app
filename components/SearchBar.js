import styles from '../styles/Products.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for products here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
