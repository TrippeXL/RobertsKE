
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { type Product, type Category } from '../types';

interface BlackFridayScreenProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigate: (view: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  deals: Product[];
  allCategories: Category[];
}

const BlackFridayScreen: React.FC<BlackFridayScreenProps> = ({ onBack, onProductClick, onNavigate, onHomeClick, onSearch, deals, allCategories }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isSticky = scrollY > 10 || isSearchActive;

  return (
    <div className="bg-[#F9F5F0] min-h-screen">
      <Header 
        onBack={onBack} 
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        isSticky={isSticky} 
        isSearchActive={isSearchActive}
        onSearchClick={() => setIsSearchActive(!isSearchActive)}
        onSearch={onSearch}
      />

      <main>
        <div className="relative bg-gray-800 text-white text-center py-20 px-4">
          <img src="https://images.unsplash.com/photo-1508825635848-3de63e173733?q=80&w=1887&auto=format&fit=crop" alt="Black Friday" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Black Friday</h1>
            <p className="mt-2 text-lg">Unbeatable Deals, Just For You!</p>
          </div>
        </div>
        
        <div className="p-4 max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {deals.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default BlackFridayScreen;
