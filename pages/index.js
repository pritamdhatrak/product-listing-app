import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import styles from '../styles/Products.module.css';

export default function Home({ products }) {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setIsLoading(true);
    
    const searchTimer = setTimeout(() => {
      if (searchText === '') {
        setFilteredProducts(products);
      } else {
        const searchResults = products.filter(product =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(searchResults);
      }
      setIsLoading(false);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(searchTimer);
  }, [searchText, products]);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Head>
        <title>My Online Store - Shop Products</title>
      </Head>

      <div className="navbar">
        <h1>🛒 My Online Store</h1>
      </div>

      <div className="main-content">
        <h1 className="page-title">Welcome to Our Store!</h1>
        
        <SearchBar value={searchText} onChange={setSearchText} />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {currentProducts.length > 0 ? (
              <>
                <div className={styles.productGrid}>
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                  />
                )}
              </>
            ) : (
              <div className={styles.noProducts}>
                <h3>Sorry! No products found</h3>
                <p>Try searching for something else</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    return {
      props: {
        products: products
      }
    };
  } catch (error) {
    console.log('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
}
