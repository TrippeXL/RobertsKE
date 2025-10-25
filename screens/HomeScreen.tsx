
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import FilterMenu from '../components/FilterMenu';
import { type Product, type Category, type HomeBanner, type BlogPost } from '../types';
import { HOME_BANNERS, BLOG_POSTS, ChevronLeftIcon, ChevronRightIcon } from '../constants';

interface HomeScreenProps {
  productsData: Product[];
  onProductClick: (product: Product) => void;
  onNavigate: (view: any, payload?: any) => void;
  onSearch: (query: string) => void;
  onHomeClick: () => void;
  categories: Category[];
}

// Sub-component for the new category product grid
const CategoryProductGrid: React.FC<{
  category: Category;
  products: Product[];
  allCategories: Category[];
  onProductClick: (product: Product) => void;
  onViewAllClick: () => void;
}> = ({ category, products, onProductClick, onViewAllClick, allCategories }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl" style={{fontFamily: "'Playfair Display', serif"}}>{category.name}</h2>
      <button onClick={onViewAllClick} className="font-semibold text-sm text-gray-800 hover:underline">
        View all
      </button>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
      ))}
    </div>
  </div>
);

// Simplified banner/blog type for the interleaved content component
interface InterleavedContent {
  id: number | string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  link: { view: any; payload?: any; };
}

// Sub-component for the new interleaved banner/blog
const InterleavedContentCard: React.FC<{
  content: InterleavedContent;
  onNavigate: (view: any, payload?: any) => void;
}> = ({ content, onNavigate }) => (
    <div 
        onClick={() => onNavigate(content.link.view, content.link.payload)}
        className="h-80 rounded-lg overflow-hidden relative cursor-pointer group"
    >
        <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-xl" style={{fontFamily: "'Playfair Display', serif"}}>{content.title}</h3>
            <p className="text-xs mt-1 max-w-[90%]">{content.subtitle}</p>
            <button className="mt-4 bg-white text-black font-semibold py-1 px-4 rounded-full text-sm">
                {content.buttonText}
            </button>
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ productsData, onProductClick, onNavigate, onSearch, onHomeClick, categories }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // State for infinite scroll
  const [displayedCategoriesCount, setDisplayedCategoriesCount] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Refs for scroll synchronization
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingToSection = useRef(false);

  // Auto-play hero carousel
  useEffect(() => {
    const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % categories.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [categories.length]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
      if (isNearBottom && !isLoadingMore && displayedCategoriesCount < categories.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayedCategoriesCount(prevCount => prevCount + 1);
          setIsLoadingMore(false);
        }, 500);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, displayedCategoriesCount, categories.length]);

  // Intersection Observer to sync filter with page scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToSection.current) return;
        
        const intersectingEntry = entries.find(e => e.isIntersecting);
        if (intersectingEntry) {
          const categoryId = intersectingEntry.target.getAttribute('data-category-id');
          if (categoryId && categoryId !== activeCategoryId) {
            setActiveCategoryId(categoryId);
          }
        }
      },
      { 
        rootMargin: '-40% 0px -60% 0px', // Trigger when section is in the upper-middle of the screen
        threshold: 0 
      }
    );

    const currentSections = sectionRefs.current.slice(0, displayedCategoriesCount).filter(ref => ref !== null);
    currentSections.forEach(ref => observer.observe(ref!));

    return () => {
      currentSections.forEach(ref => observer.unobserve(ref!));
    };
  }, [displayedCategoriesCount, activeCategoryId]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % categories.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + categories.length) % categories.length);
  
  const isSticky = scrollY > 10 || isSearchActive;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newArrivals = useMemo(() => {
    return [...productsData]
        .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        .slice(0, 10);
  }, [productsData]);
  
  const interleavedContent: InterleavedContent[] = useMemo(() => [
    ...HOME_BANNERS,
    ...BLOG_POSTS.filter(p => p.status === 'published').map(p => ({
        id: `blog-${p.id}`,
        title: p.title,
        subtitle: p.excerpt,
        imageUrl: p.imageUrl,
        buttonText: 'Read More',
        link: { view: 'blogPost', payload: p } as { view: 'blogPost', payload: BlogPost }
    }))
  ], []);

  const visibleCategories = useMemo(() => {
      return categories.slice(0, displayedCategoriesCount);
  }, [categories, displayedCategoriesCount]);

  const handleFilterClick = (categoryId: string) => {
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    const sectionEl = sectionRefs.current[categoryIndex];

    isScrollingToSection.current = true;
    setActiveCategoryId(categoryId);
    
    if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
        isScrollingToSection.current = false;
    }, 1200);
  };

  return (
    <div className="bg-[#F9F5F0]">
      <Header 
        ref={headerRef}
        isSticky={isSticky} 
        isSearchActive={isSearchActive} 
        onSearchClick={() => setIsSearchActive(!isSearchActive)}
        onNavigate={onNavigate}
        onHomeClick={onHomeClick}
        onSearch={onSearch}
      />

      <main>
        {/* Hero Carousel Section */}
        <section className="relative w-full h-[450px] text-white">
          <div className="relative w-full h-full overflow-hidden">
            {categories.map((category, index) => (
              <div key={category.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img src={category.hero?.imageUrl} alt={category.hero?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-20 h-full flex flex-col justify-center items-center text-center p-4">
                  <h1 className="text-4xl lg:text-5xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>{category.hero?.title}</h1>
                  <p className="mt-2 max-w-md mx-auto">{category.hero?.subtitle}</p>
                  <button 
                    onClick={() => onNavigate('category', category.id)}
                    className="mt-6 bg-white text-black font-semibold py-2 px-8 rounded-full hover:bg-opacity-90 transition-colors">
                    Shop {category.name}
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

        {/* Hierarchical Filter Menu */}
        <FilterMenu 
            allCategories={categories}
            activeCategoryId={activeCategoryId}
            onCategorySelect={handleFilterClick}
            onHomeSelect={onHomeClick}
        />

        {/* New Arrivals Slider */}
        <section className="py-8">
            <div className="max-w-sm mx-auto px-4">
                 <h2 className="text-2xl" style={{fontFamily: "'Playfair Display', serif"}}>New Arrivals</h2>
                 <p className="text-sm text-gray-500 mb-4">Fresh picks from our latest collections.</p>
            </div>
            <div className="pl-4 max-w-sm mx-auto overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4">
                    {newArrivals.map(product => (
                        <div key={product.id} className="w-40 flex-shrink-0">
                             <ProductCard product={product} onClick={() => onProductClick(product)} allCategories={categories} />
                        </div>
                    ))}
                    {newArrivals.length === 0 && (
                        <p className="text-sm text-gray-500 pl-4">No new arrivals yet.</p>
                    )}
                </div>
            </div>
        </section>

        {/* Shop by Category Section */}
        <section className="py-8 bg-white">
            <div className="max-w-sm mx-auto px-4">
                <h2 className="text-2xl mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Shop by Category</h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-2">
                {categories.map((category) => (
                <div
                    key={category.id}
                    onClick={() => onNavigate('category', category.id)}
                    className="snap-center flex-shrink-0 w-4/5 px-2"
                >
                    <div className="h-[28rem] rounded-lg overflow-hidden relative cursor-pointer group">
                        <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-xl tracking-wide">{category.name}</h3>
                            <p className="text-xs mt-1 max-w-[90%]">{category.description}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>

        {/* Infinite Scroll Content Feed */}
        <section className="py-12">
          <div className="max-w-sm mx-auto px-4 space-y-12">
            {visibleCategories.map((category, index) => {
              const categoryProducts = productsData
                .filter(p => p.categoryId.startsWith(category.id))
                .slice(0, 6);
              const content = interleavedContent[index % interleavedContent.length];

              return (
                <div
                    key={category.id}
                    ref={el => (sectionRefs.current[index] = el)}
                    data-category-id={category.id}
                    className="scroll-mt-32" 
                >
                  <CategoryProductGrid
                    category={category}
                    products={categoryProducts}
                    onProductClick={onProductClick}
                    onViewAllClick={() => onNavigate('category', category.id)}
                    allCategories={categories}
                  />
                  {content && (
                    <InterleavedContentCard 
                      content={content}
                      onNavigate={onNavigate}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {isLoadingMore && (
          <div className="text-center py-8 text-gray-500">
            <p>Loading more...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeScreen;
