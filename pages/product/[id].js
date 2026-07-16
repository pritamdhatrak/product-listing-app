import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Products.module.css';

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className="main-content">
        <h2>Product not found!</h2>
        <Link href="/">
          <button className={styles.backBtn}>Go Back to Store</button>
        </Link>
      </div>
    );
  }

  const convertToINR = (usdPrice) => {
    const inrPrice = usdPrice * 83;
    return Math.round(inrPrice);
  };

  const getStars = (rating) => {
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
  };

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

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const product = await response.json();

    return {
      props: {
        product: product
      }
    };
  } catch (error) {
    console.log('Error fetching product:', error);
    return {
      props: {
        product: null
      }
    };
  }
}
