import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="p-1 w-full mx-auto ">
      <h4 className="text-2xl font-bold underline">Cart</h4>
      <p>
        Items in cart: <span className="text-red-500">{cart}</span>
      </p>
    </div>
  );
};

export default Cart;
