import { useEffect, useState } from 'react';
import styles from './pagination.module.scss'; 
interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const fetchData = async (): Promise<Product[]> => {
  try {
    const res = await fetch('https://dummyjson.com/products/?limit=100');
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Pagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1); 

  useEffect(() => {
    fetchData().then((products) => setProducts(products));
  }, [pageNumber]);

  function pageHandler(page: number): void {
    console.log(page, "page");
    const totalPages = Math.ceil(products.length / 10); 
    if (page > 0 && page <= totalPages) { 
      setPageNumber(page);
    }
  }

  return (
    <div>
      {products.length > 0 && (
        <div className={styles.products}> 
          {products.slice(pageNumber * 10 -10 ,pageNumber * 10).map((prod) => (
            <span className={styles.products__single} key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
        <div className={styles.pagination}>
            
        <span onClick={()=> pageHandler(pageNumber - 1)}>👈🏻</span>
        <span>{pageNumber}</span>
        <span onClick={()=> pageHandler(pageNumber + 1)}>👉🏻</span>
        </div>
    </div>
  );
};

export default Pagination;
