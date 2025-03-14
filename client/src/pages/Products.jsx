import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleFetchProducts = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    handleFetchProducts();
  }, []);

  return (
    <div className="p-4 w-full mx-auto text-center">
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-4">
            <Link to={`/products/${product.id}`}>
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p>{product.description}</p>
              <p className="text-green-500">${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
