
import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { checkDrugInteraction } from '../services/geminiService';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [interactionWarning, setInteractionWarning] = useState<string | null>(null);
  const [isCheckingAI, setIsCheckingAI] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const updateItemDiscount = (id: string, discount: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, discount: Math.min(100, Math.max(0, discount)) };
      }
      return item;
    }));
  };

  const calculateItemTotal = (item: CartItem) => {
    const gross = item.price * item.quantity;
    const discountAmount = gross * (item.discount / 100);
    return gross - discountAmount;
  };

  const subTotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const finalTotal = subTotal - (subTotal * (globalDiscount / 100));

  useEffect(() => {
    const runChecks = async () => {
      if (cart.length >= 2) {
        setIsCheckingAI(true);
        const warning = await checkDrugInteraction(cart.map(i => i.name));
        setInteractionWarning(warning);
        setIsCheckingAI(false);
      } else {
        setInteractionWarning(null);
      }
    };
    const timer = setTimeout(runChecks, 1000);
    return () => clearTimeout(timer);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemDiscount,
    globalDiscount,
    setGlobalDiscount,
    subTotal,
    finalTotal,
    interactionWarning,
    isCheckingAI
  };
};
