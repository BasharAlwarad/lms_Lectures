import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

export default function Product() {
  const { setCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const handleAddToCart = (e) => {
    setCart((pre) => pre + 1);
  };

  useEffect(() => {
    // Fetch product details based on the ID from the URL
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 w-full mx-auto text-center">
      <h1 className="text-3xl font-bold underline">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto my-4 w-[15rem] h-[15rem]"
      />
      <p>{product.description}</p>
      <p className="text-green-500">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="btn border-t-cyan-500 bg-red-600 p-5"
      >
        Add To Cart
      </button>
    </div>
  );
}
