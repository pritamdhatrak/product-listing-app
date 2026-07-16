import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Products.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const convertToINR = (usdPrice) => {
    return Math.round(usdPrice * 83);
  };

  const getStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  if (loading) {
    return (
      <div>
        <div className="navbar">
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>🛒 My Online Store</h1>
          </Link>
        </div>
        <div className="main-content">
          <div style={{textAlign: 'center', padding: '100px'}}>
            <h3>Loading product...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <div className="navbar">
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>🛒 My Online Store</h1>
          </Link>
        </div>
        <div className="main-content">
          <h2>Product not found!</h2>
          <Link href="/">
            <button className={styles.backBtn}>Go Back to Store</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{product.title} - My Online Store</title>
      </Head>

      <div className="navbar">
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h1>🛒 My Online Store</h1>
        </Link>
      </div>

      <div className="main-content">
        <div className={styles.detailContainer}>
          <div className="row">
            <div className="col-md-6">
              <img 
                src={product.image} 
                alt={product.title}
                className={styles.detailImage}
              />
            </div>
            
            <div className="col-md-6">
              <h1 className={styles.detailTitle}>{product.title}</h1>
              
              <div className={styles.detailCategory}>
                Category: {product.category}
              </div>
              
              {product.rating && (
                <div style={{ margin: '15px 0', fontSize: '18px' }}>
                  <span style={{ color: 'orange' }}>
                    {getStars(product.rating.rate)}
                  </span>
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    {product.rating.rate}/5 ({product.rating.count} people rated this)
                  </span>
                </div>
              )}
              
              <div className={styles.detailPrice}>
                ₹{convertToINR(product.price).toLocaleString('en-IN')}
              </div>
              
              <div className={styles.description}>
                <h4>About this product:</h4>
                <p>{product.description}</p>
              </div>
              
              <div className={styles.actionButtons}>
                <button className={styles.buyBtn}>
                  Buy Now
                </button>
                
                <Link href="/">
                  <button className={styles.backBtn}>
                    Back to Store
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
