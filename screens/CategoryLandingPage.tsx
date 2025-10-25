
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { type PreOrderCategory, type Product, type Category } from '../types';

interface CategoryLandingPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  category: PreOrderCategory;
  allCategories: Category[];
}

const CategoryLandingPage: React.FC<CategoryLandingPageProps> = ({ onBack, onProductClick, onNavigate, onHomeClick, onSearch, category, allCategories }) => {
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
            <div className="relative h-64">
                <img src={category.blog.imageUrl} alt={category.blog.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                     <h1 className="text-3xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>{category.blog.title}</h1>
                </div>
            </div>

            <div className="p-4 bg-white max-w-sm mx-auto">
                <p className="text-gray-600 leading-relaxed">{category.blog.content}</p>
            </div>
            
            <div className="p-4 max-w-sm mx-auto">
                <h2 className="text-xl font-bold my-4 text-gray-800">Shop The Collection</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {category.products.map(product => (
                        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
                    ))}
                </div>
            </div>
        </main>
    </div>
  );
};

export default CategoryLandingPage;
