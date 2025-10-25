
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import FilterMenu from '../components/FilterMenu';
import { type Product, type Category } from '../types';
import { ChevronRightIcon, ChevronLeftIcon, findCategoryById, getCategoryAndDescendantsIds, getCategoryPath } from '../constants';

interface CategoryScreenProps {
  categoryId: string;
  allCategories: Category[];
  allProducts: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onHomeClick: () => void;
  onSearch: (query: string) => void;
}

const flattenCategoriesForNav = (categories: Category[]): Category[] => {
    let flatList: Category[] = [];
    categories.forEach(cat => {
        flatList.push(cat);
        if (cat.children) {
            flatList = flatList.concat(flattenCategoriesForNav(cat.children));
        }
    });
    return flatList;
};


const CategoryScreen: React.FC<CategoryScreenProps> = ({ categoryId, allCategories, allProducts, onBack, onProductClick, onNavigate, onHomeClick, onSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // For infinite scroll to next category
  const [isNavigatingNext, setIsNavigatingNext] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play hero carousel
  useEffect(() => {
    if (allCategories.length > 0) {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % allCategories.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }
  }, [allCategories.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % allCategories.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + allCategories.length) % allCategories.length);

  const isSticky = scrollY > 10 || isSearchActive;

  const category = useMemo(() => findCategoryById(allCategories, categoryId), [categoryId, allCategories]);
  const breadcrumbs = useMemo(() => getCategoryPath(allCategories, categoryId), [categoryId, allCategories]);
  
  const productsForCategory = useMemo(() => {
    if (!category) return [];
    const relevantIds = getCategoryAndDescendantsIds(category);
    return allProducts.filter(p => relevantIds.includes(p.categoryId));
  }, [category, allProducts]);
  
  const nextCategory = useMemo(() => {
      const flatCategories = flattenCategoriesForNav(allCategories);
      const currentIndex = flatCategories.findIndex(c => c.id === categoryId);
      return currentIndex > -1 && currentIndex < flatCategories.length - 1 ? flatCategories[currentIndex + 1] : null;
  }, [categoryId, allCategories]);

  // Observer for infinite scroll
  useEffect(() => {
    if (!nextCategory || !sentinelRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isNavigatingNext) {
            setIsNavigatingNext(true);
            setTimeout(() => {
                onNavigate('category', nextCategory.id);
            }, 1000); 
        }
    });

    const currentSentinel = sentinelRef.current;
    observer.observe(currentSentinel);

    return () => observer.unobserve(currentSentinel);
  }, [isNavigatingNext, nextCategory, onNavigate]);


  if (!category) {
    return (
        <div>
            <Header onBack={onBack} isSticky={true} onHomeClick={onHomeClick} />
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Category not found</h1>
                <button onClick={onBack} className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-full font-semibold">Go Back</button>
            </div>
        </div>
    );
  }

  const theme = category.theme || { bgClass: 'bg-[#F9F5F0]', primaryText: 'text-gray-800', buttonBg: 'bg-gray-800' };

  return (
    <div className={`${theme.bgClass} min-h-screen`}>
      <Header 
        onBack={onBack}
        isSticky={isSticky} 
        isSearchActive={isSearchActive} 
        onSearchClick={() => setIsSearchActive(!isSearchActive)}
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        onSearch={onSearch}
      />

      <main className="pb-16">
        {/* Hero Carousel Section */}
        <section className="relative w-full h-[450px] text-white">
          <div className="relative w-full h-full overflow-hidden">
            {allCategories.map((cat, index) => (
              <div key={cat.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img src={cat.hero?.imageUrl} alt={cat.hero?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-20 h-full flex flex-col justify-center items-center text-center p-4">
                  <h1 className="text-4xl lg:text-5xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>{cat.hero?.title}</h1>
                  <p className="mt-2 max-w-md mx-auto">{cat.hero?.subtitle}</p>
                  <button 
                    onClick={() => onNavigate('category', cat.id)}
                    className="mt-6 bg-white text-black font-semibold py-2 px-8 rounded-full hover:bg-opacity-90 transition-colors">
                    Shop {cat.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </section>
        
        <FilterMenu 
            allCategories={allCategories}
            activeCategoryId={categoryId}
            onCategorySelect={(id) => onNavigate('category', id)}
            onHomeSelect={onHomeClick}
        />

        {/* Breadcrumbs */}
        <nav className="bg-white border-b">
            <div className="max-w-sm mx-auto px-4 py-2 flex items-center text-xs text-gray-500 overflow-x-auto scrollbar-hide">
                <button onClick={onHomeClick} className="hover:underline whitespace-nowrap">Home</button>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id}>
                        <ChevronRightIcon className="w-4 h-4 mx-1 flex-shrink-0" />
                        {index === breadcrumbs.length - 1 ? (
                            <span className="font-semibold text-gray-700 whitespace-nowrap">{crumb.name.replace('# ', '')}</span>
                        ) : (
                            <button onClick={() => onNavigate('category', crumb.id)} className="hover:underline whitespace-nowrap">
                                {crumb.name}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>


        <div className="max-w-sm mx-auto p-4 flex">
            {/* Sidebar for desktop view (hidden on mobile) */}
            {category.children && category.children.length > 0 && (
                <aside className="w-1/3 pr-4 hidden sm:block">
                     <h3 className="font-bold text-lg mb-2" style={{fontFamily: "'Playfair Display', serif"}}>Categories</h3>
                     <ul>
                        {category.children.map(child => (
                             <li key={child.id}>
                                <button onClick={() => onNavigate('category', child.id)} className="text-sm py-1 text-gray-600 hover:text-gray-900">
                                    {child.name}
                                </button>
                            </li>
                        ))}
                     </ul>
                </aside>
            )}

            {/* Product Grid */}
            <div className="flex-1">
                <h2 className={`text-2xl font-bold mb-4 text-center sm:text-left ${theme.primaryText}`} style={{fontFamily: "'Playfair Display', serif"}}>
                    {category.name.replace('# ', '')}
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {productsForCategory.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
                ))}
                {productsForCategory.length === 0 && (
                    <p className="col-span-2 text-center text-gray-500 py-8">No products found in this category.</p>
                )}
                </div>
            </div>
        </div>
      </main>

      {nextCategory && <div ref={sentinelRef} className="h-10" />}
        {isNavigatingNext && nextCategory && (
            <div className="fixed bottom-10 left-0 right-0 max-w-sm mx-auto p-4 text-center z-50">
                <div className="inline-block bg-white p-4 rounded-lg shadow-lg">
                     <p className="font-semibold text-gray-800 animate-pulse">Loading {nextCategory.name}...</p>
                </div>
            </div>
      )}
    </div>
  );
};

export default CategoryScreen;
