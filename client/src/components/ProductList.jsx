import { useEffect, useState, useTransition } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = ({ product }) => {
  const [x, setX] = useState(false);
  const [isPending, startTransition] = useTransition(); // Use transition here

  useEffect(() => {
    const delayRender = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
      startTransition(() => {
        setX(true); // Update state after delay inside transition
      });
    };

    delayRender();
  }, []);

  if (isPending) {
    return <div>Loading...</div>; // Show loading state during transition
  }

  if (!x) {
    return <div>Loading...</div>; // Show loading state until state is updated
  }

  return (
    <Link to={`/products/${product?.id}`}>
      <h2 className="text-xl font-bold">{product?.title}</h2>
      <p>{product?.description}</p>
      <p className="text-green-500">${product?.price}</p>
    </Link>
  );
};

export default ProductsList;
