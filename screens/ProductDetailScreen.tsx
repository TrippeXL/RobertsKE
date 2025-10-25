
import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { type Product, type ProductVariant, type Category } from '../types';
import { HeartIcon, WhatsAppIcon, formatPrice, BUSINESS_PHONE_NUMBER, getCategoryPath } from '../constants';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useSavedItems } from '../context/SavedItemsContext';
import { USERS } from '../constants';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  allProducts: Product[];
  allCategories: Category[];
  onProductClick: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack, onNavigate, onHomeClick, onSearch, allProducts, allCategories, onProductClick }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [mainImage, setMainImage] = useState<string>(product.variants[0].images[0]);
  const { addToCart, openModal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isSearchActive]);
  
  const creator = USERS.find(u => u.phone === product.creatorId);

  const relatedProducts = useMemo(() => {
    const path = getCategoryPath(allCategories, product.categoryId);
    if (path.length === 0) return [];
    const topLevelCategoryId = path[0].id;
    return allProducts
      .filter(p => p.id !== product.id && p.categoryId.startsWith(topLevelCategoryId))
      .slice(0, 4);
  }, [product, allProducts, allCategories]);

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setMainImage(variant.images[0]);
  }

  const handleToggleSavedItem = () => {
    if (isSaved(product.id)) {
      removeSavedItem(product.id);
    } else {
      addSavedItem(product);
    }
  };

  const handleAddToCart = () => {
    const success = addToCart({ product: { ...product }, selectedVariant, quantity: 1 });
    if (success) {
      openModal();
    }
  };

  const getPrice = () => {
    let currentPrice = product.price;
    if (product.sale) {
        currentPrice = product.price * (1 - product.sale.discount);
    } else if (product.preOrder) {
        currentPrice = product.price * (1 - product.preOrder.discount);
    }
    return currentPrice;
  }

  const finalPrice = getPrice();
  const stockStatus = selectedVariant.stock;

  return (
    <div className="bg-white min-h-screen">
      <Header 
        ref={headerRef}
        onBack={onBack} 
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        onSearch={onSearch}
        isSticky={true} 
        isSearchActive={isSearchActive} 
        onSearchClick={() => setIsSearchActive(!isSearchActive)} 
      />
      <main className="pb-40" style={{paddingTop: `${headerHeight}px`}}>
        <div className="max-w-sm mx-auto">
          <img src={mainImage} alt={product.name} className="w-full h-80 object-cover" />
          
          <div className="flex justify-center space-x-2 p-4">
            {selectedVariant.images.slice(0, 4).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} thumbnail ${index + 1}`} 
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${img === mainImage ? 'border-2 border-gray-800' : 'border border-gray-200'}`} 
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          
          <div className="px-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                <div className="flex items-center mt-1">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                </div>
              </div>
              <button onClick={handleToggleSavedItem} className="p-2 rounded-full border border-gray-300">
                  <HeartIcon 
                    className={`w-5 h-5 ${isSaved(product.id) ? 'text-red-500' : 'text-gray-600'}`} 
                    isFilled={isSaved(product.id)}
                  />
              </button>
            </div>
            
             {creator && (
              <div className="mt-3">
                <button onClick={() => onNavigate('creatorProfile', creator)} className="text-sm text-gray-500 hover:text-gray-800">
                  Sold by <span className="font-semibold underline">{creator.name}</span>
                </button>
              </div>
            )}

            <div className="my-4">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(finalPrice)}</span>
              {(product.sale || product.preOrder) && (
                <span className="text-lg text-gray-400 line-through ml-2">{formatPrice(product.price)}</span>
              )}
            </div>

            {product.preOrder && (
              <div className="bg-blue-100 text-blue-800 text-sm font-semibold p-3 rounded-lg mb-4 text-center">
                {product.preOrder.discount * 100}% less on pre-order. Arrives in ~{product.preOrder.arrivalDays} days.
              </div>
            )}
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="mb-4">
              {stockStatus > 0 && stockStatus <= 5 && <p className="text-sm font-semibold text-orange-600 mb-2">Only {stockStatus} left!</p>}
              {stockStatus > 5 && <p className="text-sm font-semibold text-green-600 mb-2">In Stock</p>}
              {stockStatus <= 0 && <p className="text-sm font-semibold text-red-600 mb-2">Out of Stock</p>}
            </div>

            {product.variants.length > 1 && (
              <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Color: {selectedVariant.colorName}</p>
                  <div className="flex items-center space-x-2">
                      {product.variants.map((variant) => (
                          <button 
                              key={variant.colorName} 
                              style={{ backgroundColor: variant.color }} 
                              className={`w-8 h-8 rounded-full border-2 ${selectedVariant.colorName === variant.colorName ? 'border-gray-800' : (variant.color === '#EAEAEA' || variant.color === '#FFFFFF' || variant.color === 'transparent' ? 'border-gray-300' : 'border-transparent') } focus:outline-none ring-2 ring-offset-2 ring-transparent focus:ring-gray-800`}
                              onClick={() => handleVariantSelect(variant)}
                              title={variant.colorName}
                          ></button>
                      ))}
                  </div>
              </div>
             )}
          </div>

          <section className="mt-8 pt-6 border-t">
              <div className="px-4">
                   <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                   {product.reviews.length > 0 ? (
                      <div className="space-y-4">
                          {product.reviews.map(review => (
                              <div key={review.id} className="border-b pb-3">
                                  <div className="flex items-center mb-1">
                                      <img src={review.avatarUrl} alt={review.author} className="w-8 h-8 rounded-full object-cover mr-3" />
                                      <div>
                                          <p className="font-semibold text-sm">{review.author}</p>
                                          <StarRating rating={review.rating} small/>
                                      </div>
                                  </div>
                                  <p className="text-sm text-gray-600">{review.comment}</p>
                                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                              </div>
                          ))}
                      </div>
                   ) : (
                      <p className="text-sm text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
                   )}

                   {user && (
                      <div className="mt-6">
                          <h3 className="font-semibold text-gray-800 mb-2">Write a Review</h3>
                          <form onSubmit={e => e.preventDefault()}>
                              <textarea className="w-full p-2 border rounded-md text-sm" placeholder="Share your experience..."></textarea>
                              <button className="mt-2 bg-gray-800 text-white py-2 px-4 rounded-full font-semibold text-sm">Submit Review</button>
                          </form>
                      </div>
                   )}
              </div>
          </section>

          <section className="mt-12">
              <div className="px-4">
                  <h2 className="text-xl font-bold text-gray-800">You Might Also Like</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
                  {relatedProducts.map(relatedProduct => (
                      <ProductCard key={relatedProduct.id} product={relatedProduct} onClick={() => onProductClick(relatedProduct)} allCategories={allCategories} />
                  ))}
              </div>
          </section>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white p-4 border-t border-gray-200 z-30">
        <div className="flex space-x-4">
          <button 
            className="flex-1 py-3 border border-gray-800 text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={stockStatus <= 0}
            >
            {stockStatus > 0 ? 'Add to cart' : 'Out of Stock'}
          </button>
          <a href={`https://wa.me/${BUSINESS_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
            <WhatsAppIcon className="w-5 h-5" />
            <span>Contact on WhatsApp</span>
          </a>
        </div>
         <div className="w-32 h-1.5 bg-gray-300 rounded-full mx-auto mt-4"></div>
      </footer>
    </div>
  );
};

export default ProductDetailScreen;
