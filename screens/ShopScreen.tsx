
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import FilterMenu from '../components/FilterMenu';
import { type Product, type Category } from '../types';

interface ShopScreenProps {
  allProducts: Product[];
  allCategories: Category[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
}

// Helper to get all descendant IDs for filtering
const getCategoryAndDescendantsIds = (category: Category): string[] => {
  let ids = [category.id];
  if (category.children) {
    for (const child of category.children) {
      ids = [...ids, ...getCategoryAndDescendantsIds(child)];
    }
  }
  return ids;
};

const findCategoryById = (categories: Category[], id: string): Category | null => {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return null;
};


const ShopScreen: React.FC<ShopScreenProps> = ({ allProducts, allCategories, onBack, onProductClick, onNavigate, onHomeClick, onSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return allProducts;
    
    const activeCategory = findCategoryById(allCategories, activeCategoryId);
    if (!activeCategory) return allProducts;

    const relevantIds = getCategoryAndDescendantsIds(activeCategory);
    return allProducts.filter(p => relevantIds.includes(p.categoryId));
  }, [activeCategoryId, allProducts, allCategories]);
  

  return (
    <div className="bg-[#F9F5F0] min-h-screen">
      <Header 
        onBack={onBack} 
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        isSticky={true} 
        isSearchActive={isSearchActive}
        onSearchClick={() => setIsSearchActive(!isSearchActive)}
        onSearch={onSearch}
      />

      <main>
        <section className="relative w-full h-48 bg-gray-800 text-white flex flex-col justify-center items-center text-center p-4">
            <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1769&auto=format&fit=crop" alt="Stylish interior" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
            <div className="relative z-10">
                <h1 className="text-4xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>All Products</h1>
                <p className="mt-2 max-w-xs mx-auto text-sm">Explore our curated collection of home decor.</p>
            </div>
        </section>
        
        <FilterMenu 
            allCategories={allCategories}
            activeCategoryId={activeCategoryId}
            onCategorySelect={(id) => setActiveCategoryId(id === activeCategoryId ? null : id)}
            onHomeSelect={() => {
                setActiveCategoryId(null);
                onHomeClick();
            }}
        />

        <div className="p-4 max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
              ))}
            </div>
             {filteredProducts.length === 0 && (
                <div className="col-span-2 text-center text-gray-500 py-16">
                    <p>No products found in this category.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default ShopScreen;
