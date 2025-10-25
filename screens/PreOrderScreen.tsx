
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { type Product, type Category } from '../types';
import { CATEGORIES } from '../constants';

interface PreOrderScreenProps {
  onBack: () => void;
  allProducts: Product[];
  allCategories: Category[];
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
}

const PreOrderScreen: React.FC<PreOrderScreenProps> = ({ onBack, allProducts, allCategories, onProductClick, onNavigate, onHomeClick, onSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isSticky = scrollY > 10 || isSearchActive;

  useEffect(() => {
    if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isSearchActive, isSticky]);

  const preOrderProducts = useMemo(() => {
    return allProducts.map(p => ({
      ...p,
      price: p.price * 0.7, // Apply 30% discount
      originalPrice: p.price,
      preOrder: {
        discount: 0.3,
        arrivalDays: p.preOrder?.arrivalDays || 60,
      }
    }));
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return preOrderProducts;
    const activeCategory = CATEGORIES.find(c => c.name === activeFilter);
    if (!activeCategory) return [];
    return preOrderProducts.filter(p => p.categoryId.startsWith(activeCategory.id));
  }, [activeFilter, preOrderProducts]);
  
  const filterCategories = ['All', ...CATEGORIES.map(c => c.name)];

  return (
    <div className="bg-[#F9F5F0] min-h-screen">
      <Header 
        ref={headerRef}
        onBack={onBack} 
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        isSticky={isSticky} 
        isSearchActive={isSearchActive}
        onSearchClick={() => setIsSearchActive(!isSearchActive)}
        onSearch={onSearch}
      />

      <main>
        <section className="relative w-full h-56 bg-gray-800 text-white flex flex-col justify-center items-center text-center p-4">
            <img src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1887&auto=format&fit=crop" alt="Pre-order concept" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
            <div className="relative z-10" style={{ paddingTop: `${headerHeight}px` }}>
                <h1 className="text-3xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Order on Pre-Order & Save 30%</h1>
                <p className="mt-2 max-w-xs mx-auto text-sm">Get access to our full catalog via dropshipping. Less cost, same quality.</p>
            </div>
        </section>
        
        <div className="py-4 bg-white border-b border-gray-200 sticky top-16 z-30">
            <div className="max-w-sm mx-auto px-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center space-x-3 whitespace-nowrap">
                    {filterCategories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`py-2 px-4 rounded-full font-bold text-sm tracking-wider uppercase transition-colors ${activeFilter === cat ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>


        <div className="p-4 max-w-sm mx-auto">
            <div className="bg-blue-100 text-blue-800 text-sm p-4 rounded-lg mb-6">
                <p className="font-bold">How it works:</p>
                <p>All items on this page are available via our dropshipping program. They are paid in two convenient installments: a 50% down payment to secure your order, and the final 50% upon delivery.</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
              ))}
            </div>
        </div>

      </main>
    </div>
  );
};

export default PreOrderScreen;
