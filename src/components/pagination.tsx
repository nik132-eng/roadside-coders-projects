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

  useEffect(() => {
    fetchData().then((products) => setProducts(products));
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className={styles.products}> 
          {products.map((prod) => (
            <span className={styles.products__single} key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pagination;
