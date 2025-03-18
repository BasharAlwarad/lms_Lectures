import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Test from './pages/Test';
import Cart from './components/Cart';
import Product from './pages/Product';
import UseActionState from './pages/UseActionState';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <div>
        <Nav />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/test" element={<Test />} />
            <Route path="/useActionState" element={<UseActionState />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}
