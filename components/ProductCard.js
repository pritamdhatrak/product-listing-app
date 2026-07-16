import Link from 'next/link';
import styles from '../styles/Products.module.css';

export default function ProductCard({ product }) {
  const convertToINR = (usdPrice) => {
    const inrPrice = usdPrice * 83;
    return Math.round(inrPrice);
  };

  const getStars = (rating) => {
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
  };

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.image}
        />
        
        <div className={styles.title}>
          {product.title}
        </div>
        
        <div className={styles.price}>
          ₹{convertToINR(product.price).toLocaleString('en-IN')}
        </div>
        
        <div className={styles.category}>
          {product.category}
        </div>
        
        {product.rating && (
          <div className={styles.rating}>
            <span className={styles.stars}>
              {getStars(product.rating.rate)}
            </span>
            <span>({product.rating.count} reviews)</span>
          </div>
        )}
      </div>
    </Link>
  );
}
