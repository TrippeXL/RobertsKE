
import React, { useContext, useMemo } from 'react';
import { type Product, type Category } from '../types';
import StarRating from './StarRating';
import { formatPrice, CartIcon, getCategoryPath } from '../constants';
import { CartContext } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  allCategories?: Category[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, allCategories }) => {
  const { addToCart, openModal } = useContext(CartContext);
  const imageUrl = product.variants[0]?.images[0] || '';
  const salePrice = product.sale ? product.price * (1 - product.sale.discount) : null;
  const preOrderPrice = product.preOrder ? product.price * (1 - product.preOrder.discount) : null;

  const displayPrice = salePrice ?? preOrderPrice ?? product.price;

  const categoryName = useMemo(() => {
    if (!allCategories) return "Uncategorized"; // Fallback if prop not provided
    const path = getCategoryPath(allCategories, product.categoryId);
    // Get the immediate parent's name, or the item's name if it's a top-level category
    return path.length > 1 ? path[path.length - 2].name : (path[0]?.name || "Uncategorized");
  }, [product.categoryId, allCategories]);
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation
    const defaultVariant = product.variants[0];
    if (defaultVariant) {
        const success = addToCart({
            product,
            selectedVariant: defaultVariant,
            quantity: 1,
        });
        if (success) {
            openModal();
        }
    }
  };

  return (
    <div className="flex flex-col cursor-pointer group" onClick={onClick}>
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {product.sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
        )}
        {product.preOrder && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">PRE-ORDER</div>
        )}
        <button 
          onClick={handleAddToCartClick}
          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.variants[0]?.stock <= 0}
          aria-label={`Add ${product.name} to cart`}
        >
          <CartIcon className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-1">{categoryName}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
            {(salePrice || preOrderPrice) ? (
                <div>
                    <span className="font-bold text-sm text-red-600">{formatPrice(displayPrice)}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(product.price)}</span>
                </div>
            ) : (
                <span className="font-bold text-sm text-gray-900">{formatPrice(product.price)}</span>
            )}
        </div>
        <div className="flex items-center">
            <StarRating rating={product.rating} small />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
