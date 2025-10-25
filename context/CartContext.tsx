
import React, { createContext, useState, useEffect } from 'react';
import { type CartItem, type Product, type ProductVariant } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: { product: Product; selectedVariant: ProductVariant; quantity: number }) => boolean;
  removeFromCart: (productId: number, variantColorName: string) => void;
  updateQuantity: (productId: number, variantColorName: string, quantity: number) => void;
  clearCart: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => false,
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = window.localStorage.getItem('roberts-cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart from localStorage", error);
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('roberts-cart', JSON.stringify(cart));
  }, [cart]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addToCart = (newItem: { product: Product; selectedVariant: ProductVariant; quantity: number }): boolean => {
    const { product, selectedVariant, quantity } = newItem;
    
    const availableStock = selectedVariant.stock;
    if (availableStock <= 0) {
        alert("Sorry, this item is currently out of stock.");
        return false;
    }

    const existingItem = cart.find(
        item => item.id === product.id && item.selectedVariant.colorName === selectedVariant.colorName
    );

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > availableStock) {
            alert(`Sorry, only ${availableStock} units are available. You already have ${existingItem.quantity} in your cart.`);
            return false;
        }
    } else {
        if (quantity > availableStock) {
            alert(`Sorry, only ${availableStock} units are available.`);
            return false;
        }
    }
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedVariant.colorName === selectedVariant.colorName
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, selectedVariant, quantity }];
      }
    });
    
    return true;
  };

  const removeFromCart = (productId: number, variantColorName: string) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === productId && item.selectedVariant.colorName === variantColorName))
    );
  };

  const updateQuantity = (productId: number, variantColorName: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId && item.selectedVariant.colorName === variantColorName) {
           // Inventory Check on quantity update
          const availableStock = item.selectedVariant.stock;
          if (quantity > availableStock) {
              alert(`Sorry, only ${availableStock} units are available.`);
              return {...item, quantity: availableStock};
          }
          return { ...item, quantity: Math.max(0, quantity) }; // prevent negative quantity
        }
        return item;
      }).filter(item => item.quantity > 0) // remove if quantity is 0
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isModalOpen, openModal, closeModal }}>
      {children}
    </CartContext.Provider>
  );
};
