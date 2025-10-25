
import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { type User, type Product, type Category } from '../types';
import { PRODUCTS } from '../constants';

interface CreatorProfileScreenProps {
  creator: User;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  allCategories: Category[];
}

const CreatorProfileScreen: React.FC<CreatorProfileScreenProps> = ({ creator, onBack, onProductClick, allCategories }) => {
  const creatorProducts = PRODUCTS.filter(p => p.creatorId === creator.phone && p.status === 'published');

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <div className="bg-white shadow-sm">
        <Header onBack={onBack} isSticky={true} />
      </div>

      <main className="p-4">
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <img src={creator.avatarUrl} alt={creator.name} className="w-20 h-20 rounded-full object-cover"/>
          <div>
            <h1 className="text-2xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>{creator.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{creator.bio}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
          Products by {creator.name}
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {creatorProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CreatorProfileScreen;
