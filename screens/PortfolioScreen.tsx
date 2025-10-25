import React from 'react';
import { ChevronLeftIcon } from '../constants';
import { PORTFOLIO_ITEMS } from '../constants';
import { type Product } from '../types';

interface PortfolioScreenProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const PortfolioScreen: React.FC<PortfolioScreenProps> = ({ onBack, onProductClick }) => {
  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <header className="p-4 bg-white shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our Work
        </h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>Transforming Spaces Across Kenya</h2>
            <p className="text-gray-600 mt-2 text-sm">From cozy apartments in Kilimani to spacious homes in Karen, see how we've brought our clients' visions to life.</p>
        </div>
        
        <div className="space-y-8">
            {PORTFOLIO_ITEMS.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
                    <div className="p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase">{item.category}</p>
                        <h3 className="text-lg font-bold text-gray-800 mt-1" style={{fontFamily: "'Playfair Display', serif"}}>{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default PortfolioScreen;