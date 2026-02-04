"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  isCart: (id: string) => boolean;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, newQty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("nostrum-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nostrum-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const isCart = (id: string) => {
    return cart.some((c) => c.id === id);
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        isCart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
