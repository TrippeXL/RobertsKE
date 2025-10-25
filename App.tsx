
import React, { useState, useContext, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import BlackFridayScreen from './screens/BlackFridayScreen';
import PreOrderScreen from './screens/PreOrderScreen';
import CategoryLandingPage from './screens/CategoryLandingPage';
import SearchResultsScreen from './screens/SearchResultsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AccountScreen from './screens/AccountScreen';
import SavedItemsScreen from './screens/SavedItemsScreen';
import DashboardScreen from './screens/DashboardScreen';
import CategoryScreen from './screens/CategoryScreen';
import BlogScreen from './screens/BlogScreen';
import BlogPostScreen from './screens/BlogPostScreen';
import AfterSaleServicesScreen from './screens/AfterSaleServicesScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreatorProfileScreen from './screens/CreatorProfileScreen';
import ShopScreen from './screens/ShopScreen';
import Footer from './components/Footer';


import { type Product, type PreOrderCategory, type SearchState, type BlogPost, type Category, type User, type Order } from './types';
import { PRODUCTS, PRE_ORDER_CATEGORIES, BLACK_FRIDAY_DEALS, BLOG_POSTS, CATEGORIES, USERS, ORDERS, DESIGN_SERVICES, WhatsAppIcon, generateWhatsAppMessage, BUSINESS_PHONE_NUMBER } from './constants';
import { CartProvider, CartContext } from './context/CartContext';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

// --- Start of AddToCartModal Component ---
const AddToCartModal: React.FC<{
    onNavigate: (view: any, payload?: any) => void;
}> = ({ onNavigate }) => {
    const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);
    const { cart, isModalOpen, closeModal } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (isModalOpen) {
            setShowCheckoutOptions(false); // Reset on open
        }
    }, [isModalOpen]);

    const handleWhatsAppCheckout = () => {
        const message = generateWhatsAppMessage(cart, user);
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
        closeModal();
    };

    const handleProceedToPay = () => {
        onNavigate('cart');
        closeModal();
    }

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-lg p-6 w-full max-w-sm" style={{animation: 'slideInUp 0.3s ease-out'}}>
                {!showCheckoutOptions ? (
                    <>
                        <h2 className="text-xl font-bold text-center text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>
                            Successfully Added!
                        </h2>
                        <div className="space-y-4 mt-6">
                            <button onClick={closeModal} className="w-full py-3 border border-gray-800 text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                Continue Shopping
                            </button>
                            <button onClick={() => setShowCheckoutOptions(true)} className="w-full py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors">
                                Check Out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-center text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>
                            Checkout Options
                        </h2>
                         <div className="space-y-4 mt-6">
                             <button onClick={handleProceedToPay} className="w-full py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors">
                                Proceed to Pay
                            </button>
                             <button onClick={handleWhatsAppCheckout} className="w-full py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                                <WhatsAppIcon className="w-5 h-5" />
                                <span>Checkout with WhatsApp</span>
                            </button>
                             <button onClick={() => setShowCheckoutOptions(false)} className="w-full text-center text-sm text-gray-600 hover:underline mt-2">
                                Go Back
                            </button>
                        </div>
                    </>
                )}
            </div>
             <style>{`
                @keyframes slideInUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
// --- End of AddToCartModal Component ---


type View = 
  | { name: 'home' }
  | { name: 'productDetail'; product: Product }
  | { name: 'cart' }
  | { name: 'blackFriday' }
  | { name: 'preOrder' }
  | { name: 'categoryLanding'; category: PreOrderCategory }
  | { name: 'search'; state: SearchState }
  | { name: 'checkout' }
  | { name: 'account' }
  | { name: 'savedItems' }
  | { name: 'dashboard' }
  | { name: 'category'; categoryId: string }
  | { name: 'blog' }
  | { name: 'blogPost'; post: BlogPost }
  | { name: 'services' }
  | { name: 'portfolio' }
  | { name: 'orderDetails'; order: Order }
  | { name: 'signIn' }
  | { name: 'signUp' }
  | { name: 'creatorProfile'; creator: User }
  | { name: 'shop' };

const AppContent: React.FC = () => {
  const [history, setHistory] = useState<View[]>([{ name: 'home' }]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const currentView = history[history.length - 1];

  const navigateTo = (viewName: View['name'], payload?: any) => {
    const protectedRoutes: View['name'][] = ['account', 'dashboard', 'checkout', 'savedItems'];
    if (protectedRoutes.includes(viewName) && !isAuthenticated) {
        setHistory(prev => [...prev, { name: 'signIn' }]);
        window.scrollTo(0, 0);
        return;
    }

    if (viewName === 'account' && user?.role === 'super-admin') {
      setHistory(prev => [...prev, { name: 'dashboard' }]);
      window.scrollTo(0,0);
      return;
    }

    let newView: View;
    switch (viewName) {
      case 'home': newView = { name: 'home' }; break;
      case 'cart': newView = { name: 'cart' }; break;
      case 'blackFriday': newView = { name: 'blackFriday' }; break;
      case 'preOrder': newView = { name: 'preOrder' }; break;
      case 'checkout': newView = { name: 'checkout' }; break;
      case 'account': newView = { name: 'account' }; break;
      case 'savedItems': newView = { name: 'savedItems' }; break;
      case 'dashboard': newView = { name: 'dashboard' }; break;
      case 'category': newView = { name: 'category', categoryId: payload }; break;
      case 'blog': newView = { name: 'blog' }; break;
      case 'blogPost': newView = { name: 'blogPost', post: payload }; break;
      case 'services': newView = { name: 'services' }; break;
      case 'portfolio': newView = { name: 'portfolio' }; break;
      case 'orderDetails': newView = { name: 'orderDetails', order: payload }; break;
      case 'signIn': newView = { name: 'signIn' }; break;
      case 'signUp': newView = { name: 'signUp' }; break;
      case 'productDetail': newView = { name: 'productDetail', product: payload }; break;
      case 'categoryLanding': newView = { name: 'categoryLanding', category: payload }; break;
      case 'creatorProfile': newView = { name: 'creatorProfile', creator: payload }; break;
      case 'shop': newView = { name: 'shop' }; break;
      default: newView = { name: 'home' };
    }
    setHistory(prev => [...prev, newView]);
    window.scrollTo(0, 0);
  }

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const resetTo = (view: View) => {
    setHistory([view]);
    window.scrollTo(0,0);
  }

  const resetToHome = () => resetTo({ name: 'home' });

  const handleSelectProduct = (product: Product) => {
    navigateTo('productDetail', product);
  };
  
  const handleSelectPreOrderCategory = (category: PreOrderCategory) => {
    navigateTo('categoryLanding', category);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    // This search logic needs to be updated if product.category is removed
    const results = PRODUCTS.filter(p => 
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())) && p.status === 'published'
    );
    const searchState: SearchState = { query, results };
    setHistory(prev => [...prev, { name: 'search', state: searchState }]);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView.name) {
      case 'signIn':
        return <SignInScreen onSignUpClick={() => resetTo({name: 'signUp'})} onSignInSuccess={() => resetTo({name: 'home'})} />;
      case 'signUp':
        return <SignUpScreen onSignInClick={() => resetTo({name: 'signIn'})} onSignUpSuccess={() => resetTo({name: 'home'})} />;
      case 'productDetail':
        return <ProductDetailScreen 
                  product={currentView.product} 
                  onBack={goBack}
                  allProducts={PRODUCTS.filter(p => p.status === 'published')}
                  allCategories={CATEGORIES}
                  onProductClick={handleSelectProduct} 
                  onNavigate={navigateTo}
                  onSearch={handleSearch}
                  onHomeClick={resetToHome}
               />;
      case 'cart':
        return <CartScreen 
                  onBack={goBack} 
                  onProductClick={handleSelectProduct}
                  onCheckout={() => navigateTo('checkout')}
                  onHomeClick={resetToHome}
               />;
      case 'blackFriday':
        return <BlackFridayScreen 
                  onBack={goBack} 
                  onProductClick={handleSelectProduct} 
                  deals={BLACK_FRIDAY_DEALS} 
                  allCategories={CATEGORIES}
                  onNavigate={navigateTo}
                  onSearch={handleSearch}
                  onHomeClick={resetToHome}
                />;
      case 'preOrder':
        return <PreOrderScreen 
                  onBack={goBack} 
                  allProducts={PRODUCTS.filter(p => p.status === 'published')}
                  allCategories={CATEGORIES}
                  onProductClick={handleSelectProduct}
                  onNavigate={navigateTo}
                  onSearch={handleSearch}
                  onHomeClick={resetToHome}
                />;
      case 'categoryLanding':
        return <CategoryLandingPage 
                  onBack={goBack} 
                  category={currentView.category} 
                  allCategories={CATEGORIES}
                  onProductClick={handleSelectProduct} 
                  onNavigate={navigateTo}
                  onSearch={handleSearch}
                  onHomeClick={resetToHome}
                />;
      case 'search':
        return <SearchResultsScreen 
                  searchState={currentView.state}
                  allCategories={CATEGORIES}
                  onBack={goBack}
                  onProductClick={handleSelectProduct}
                  onNavigate={navigateTo}
                  onSearch={handleSearch}
                  onHomeClick={resetToHome}
                />;
      case 'checkout':
        return <CheckoutScreen onBack={goBack} onHomeClick={resetToHome} />;
      case 'account':
        return <AccountScreen onBack={goBack} onNavigate={navigateTo} orders={ORDERS} />;
      case 'savedItems':
        return <SavedItemsScreen onBack={goBack} onProductClick={handleSelectProduct} allCategories={CATEGORIES} />;
      case 'dashboard':
        return <DashboardScreen onBack={goBack} />;
      case 'category':
        return <CategoryScreen 
                categoryId={currentView.categoryId}
                allCategories={CATEGORIES}
                allProducts={PRODUCTS.filter(p => p.status === 'published')}
                onBack={goBack}
                onProductClick={handleSelectProduct}
                onNavigate={navigateTo}
                onSearch={handleSearch}
                onHomeClick={resetToHome}
              />;
      case 'blog':
        return <BlogScreen 
                posts={BLOG_POSTS.filter(p => p.status === 'published')}
                onBack={goBack}
                onPostClick={(post) => navigateTo('blogPost', post)}
              />;
      case 'blogPost':
        return <BlogPostScreen 
                  post={currentView.post} 
                  onBack={goBack} 
                  allProducts={PRODUCTS.filter(p => p.status === 'published')}
                  allCategories={CATEGORIES}
                  onProductClick={handleSelectProduct}
                />;
      case 'services':
        return <AfterSaleServicesScreen onBack={goBack} onNavigate={navigateTo} />;
      case 'portfolio':
        return <PortfolioScreen onBack={goBack} onProductClick={handleSelectProduct} />;
      case 'orderDetails':
        return <OrderDetailsScreen order={currentView.order} onBack={goBack} onProductClick={handleSelectProduct} />;
      case 'creatorProfile':
        return <CreatorProfileScreen 
                  creator={currentView.creator} 
                  onBack={goBack} 
                  onProductClick={handleSelectProduct}
                  allCategories={CATEGORIES}
                />;
      case 'shop':
        return <ShopScreen 
                allProducts={PRODUCTS.filter(p => p.status === 'published')}
                allCategories={CATEGORIES}
                onBack={goBack}
                onProductClick={handleSelectProduct}
                onNavigate={navigateTo}
                onSearch={handleSearch}
                onHomeClick={resetToHome}
              />;
      case 'home':
      default:
        return <HomeScreen 
                  productsData={PRODUCTS.filter(p => p.status === 'published')} 
                  onProductClick={handleSelectProduct} 
                  onNavigate={navigateTo} 
                  onSearch={handleSearch}
                  categories={CATEGORIES}
                  onHomeClick={resetToHome}
               />;
    }
  };

  return (
    <CartProvider>
      <SavedItemsProvider>
        <div key={history.length} className="animate-fade-in">
          {renderContent()}
        </div>
        <Footer onNavigate={navigateTo} />
        <AddToCartModal onNavigate={navigateTo} />
      </SavedItemsProvider>
    </CartProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
