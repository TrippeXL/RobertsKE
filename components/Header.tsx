
import React, { useContext, useState, forwardRef } from 'react';
import { MenuIcon, SearchIcon, CartIcon, ChevronLeftIcon, CloseIcon, AccountIcon, BookmarkIcon, DashboardIcon, BlogIcon, ServicesIcon, ChevronDownIcon, ChevronRightIcon, CATEGORIES } from '../constants';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { type User, type Category } from '../types';

interface HeaderProps {
    onBack?: () => void;
    onHomeClick?: () => void;
    onNavigate?: (view: any, payload?: any) => void;
    isSticky?: boolean;
    isSearchActive?: boolean;
    onSearchClick?: () => void;
    onSearch?: (query: string) => void;
}

const NavMenuItem: React.FC<{
    category: Category;
    onNavigate: (categoryId: string) => void;
}> = ({ category, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    const handleItemClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else {
            onNavigate(category.id);
        }
    };

    return (
        <li className="text-sm">
            <div
                onClick={handleItemClick}
                className="flex items-center justify-between py-2 cursor-pointer hover:text-gray-900"
            >
                <span className={hasChildren ? 'font-semibold' : ''}>{category.name}</span>
                {hasChildren && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
            </div>
            {isOpen && hasChildren && (
                <ul className="pl-3 border-l border-gray-200">
                    {category.children.map(child => <NavMenuItem key={child.id} category={child} onNavigate={onNavigate} />)}
                </ul>
            )}
        </li>
    );
};

const NavMenu: React.FC<{onClose: () => void; onNavigate: HeaderProps['onNavigate']}> = ({onClose, onNavigate}) => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const handleNavigate = (view: any, payload?: any) => {
    if (onNavigate) {
      if (view === 'account' && user?.role === 'super-admin') {
        onNavigate('dashboard');
      } else {
        onNavigate(view, payload);
      }
    }
    onClose();
  }

  const handleLogout = () => {
    logout();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className="relative w-72 h-full bg-[#F9F5F0] shadow-xl p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>Shop by Category</h2>
            <nav className="mt-4 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    <li>
                         <button onClick={() => handleNavigate('shop')} className="flex items-center justify-between py-2 cursor-pointer hover:text-gray-900 w-full font-semibold">
                            <span>All Products</span>
                            <ChevronRightIcon className="w-4 h-4" />
                         </button>
                    </li>
                    {CATEGORIES.map(cat => <NavMenuItem key={cat.id} category={cat} onNavigate={(id) => handleNavigate('category', id)} />)}
                </ul>
                 <div className="pt-4 mt-4 border-t border-gray-200"></div>
                <ul className="space-y-4">
                    {isAuthenticated && (
                      <li>
                        <button onClick={() => handleNavigate('account')} className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full text-left">
                            <AccountIcon className="w-6 h-6"/>
                            <span className="font-semibold">My Account</span>
                        </button>
                      </li>
                    )}
                    <li>
                        <button onClick={() => handleNavigate('preOrder')} className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full text-left">
                            <CartIcon className="w-6 h-6"/>
                            <span className="font-semibold">Pre-Order / Dropshipping</span>
                        </button>
                    </li>
                     {isAuthenticated && (
                        <li>
                            <button onClick={() => handleNavigate('savedItems')} className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full text-left">
                                <BookmarkIcon className="w-6 h-6"/>
                                <span className="font-semibold">My Saved Items</span>
                            </button>
                        </li>
                     )}
                    <div className="pt-4 border-t border-gray-200"></div>
                     <li>
                        <button onClick={() => handleNavigate('blog')} className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full text-left">
                            <BlogIcon className="w-6 h-6"/>
                            <span className="font-semibold">Inspiration (Blog)</span>
                        </button>
                    </li>
                     <li>
                        <button onClick={() => handleNavigate('services')} className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full text-left">
                            <ServicesIcon className="w-6 h-6"/>
                            <span className="font-semibold">After-Sale Services</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="space-y-4 pt-4 border-t border-gray-200">
                 {isAuthenticated && user ? (
                    <>
                        {(user.role === 'staff' || user.role === 'super-admin') && (
                            <button onClick={() => handleNavigate('dashboard')} className="flex items-center space-x-4 text-gray-500 hover:text-gray-900 w-full text-left text-sm">
                                <DashboardIcon className="w-5 h-5"/>
                                <span className="font-medium">Dashboard</span>
                            </button>
                        )}
                        <button onClick={handleLogout} className="w-full text-left text-sm text-red-600 font-semibold bg-white text-center py-2 rounded-full shadow-sm hover:bg-red-50">
                            Log Out
                        </button>
                    </>
                 ) : (
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleNavigate('signIn')} className="w-full text-center py-2 text-sm text-gray-800 font-semibold bg-white rounded-full shadow-sm hover:bg-gray-100">
                            Sign In
                        </button>
                        <button onClick={() => handleNavigate('signUp')} className="w-full text-center py-2 text-sm text-white font-semibold bg-gray-800 rounded-full shadow-sm hover:bg-gray-700">
                            Create Account
                        </button>
                    </div>
                 )}
            </div>
        </div>
    </div>
  )
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ 
    onBack,
    onHomeClick,
    onNavigate,
    isSticky, 
    isSearchActive, 
    onSearchClick,
    onSearch,
}, ref) => {
  const colorClass = isSticky ? 'text-gray-800' : 'text-white';
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
        onSearch(searchQuery);
    }
  };

  return (
    <>
      {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} onNavigate={onNavigate} />}
      <div ref={ref} className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isSticky ? 'bg-[#F9F5F0] shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-sm mx-auto">
            <header className="flex flex-col justify-center p-4 transition-all duration-300">
                <div className="flex items-center justify-between w-full">
                {onBack ? (
                    <button onClick={onBack} className="p-2 -ml-2">
                    <ChevronLeftIcon className={`w-6 h-6 ${isSticky ? 'text-gray-800' : colorClass}`} />
                    </button>
                ) : (
                    <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
                        <MenuIcon className={`w-6 h-6 ${colorClass}`} />
                    </button>
                )}
                
                <button onClick={onHomeClick} className={`text-center font-serif text-xl font-medium tracking-widest ${isSticky ? 'text-gray-800' : colorClass}`}>
                    ROBERTS
                </button>
                
                <div className="flex items-center space-x-2">
                    <button className="p-2" onClick={onSearchClick}>
                    {isSearchActive ? (
                        <CloseIcon className={`w-6 h-6 ${colorClass}`} />
                    ) : (
                        <SearchIcon className={`w-6 h-6 ${colorClass}`} />
                    )}
                    </button>
                    <button className="p-2 relative" onClick={() => onNavigate && onNavigate('cart')}>
                    <CartIcon className={`w-6 h-6 ${colorClass}`} />
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">
                        {cartItemCount}
                        </span>
                    )}
                    </button>
                </div>
                </div>
                
                {isSearchActive && (
                <div className="w-full mt-4 animate-fade-in-down">
                    <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full h-11 px-4 pr-12 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-gray-600">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                    </form>
                </div>
                )}
            </header>
        </div>
      </div>
    </>
  );
});

export default Header;
