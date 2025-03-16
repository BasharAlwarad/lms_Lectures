import { useState, useTransition } from 'react';
import Products from '../pages/Products';

const Test = () => {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const switchTab = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  const setStyles = (thisTab) => {
    return tab === thisTab ? 'bg-blue-500 text-white' : 'bg-white text-black';
  };

  return (
    <main>
      <nav className="flex flex-row space-x-4 w-full justify-center">
        <button className={setStyles('home')} onClick={() => switchTab('home')}>
          Home
        </button>
        <button
          className={setStyles('products')}
          onClick={() => switchTab('products')}
        >
          Products
        </button>
        <button
          className={setStyles('contact')}
          onClick={() => switchTab('contact')}
        >
          Contact
        </button>
      </nav>
      <section>
        {isPending && <div>Loading...</div>}{' '}
        {/* Show loading state during tab transition */}
        {!isPending && tab === 'home' && <h1>Home</h1>}
        {!isPending && tab === 'products' && <Products />}
        {!isPending && tab === 'contact' && <h1>Contact</h1>}
      </section>
    </main>
  );
};

export default Test;
