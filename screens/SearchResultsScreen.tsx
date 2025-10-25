
import React, { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { type Product, type SearchState, type Category } from '../types';

interface SearchResultsScreenProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  searchState: SearchState;
  allCategories: Category[];
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ onBack, onProductClick, onNavigate, onHomeClick, onSearch, searchState, allCategories }) => {
  const [isSearchActive, setIsSearchActive] = useState(true);
  const { query, results } = searchState;

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="max-w-sm mx-auto">
          <Header 
            onBack={onBack} 
            onNavigate={onNavigate}
            onHomeClick={onHomeClick}
            isSticky={true}
            isSearchActive={isSearchActive}
            onSearchClick={() => setIsSearchActive(!isSearchActive)}
            onSearch={onSearch}
          />
        </div>
      </div>

      <main className="p-4">
        <div className="py-4">
            <h1 className="text-2xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Search Results</h1>
            <p className="mt-1 text-gray-600">
                {results.length} {results.length === 1 ? 'result' : 'results'} for <span className="font-semibold">"{query}"</span>
            </p>
        </div>
        
        {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {results.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
                ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your search.</p>
                <button onClick={onBack} className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                    Continue Shopping
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default SearchResultsScreen;
