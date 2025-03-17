import { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleFetchProducts = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        console.log(data);

        // Start a transition to update products
        startTransition(() => {
          setProducts(data);
        });
        if (!isPending) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    handleFetchProducts();
  }, []);

  // Show loading state during transition
  if (loading) {
    return (
      <div className="w-full text-center mx-auto">
        Loading 🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖 Loading
      </div>
    ); // Show loading state during transition
  }

  return (
    <div className="p-4 w-full mx-auto text-center">
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-4">
            <ProductList product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
