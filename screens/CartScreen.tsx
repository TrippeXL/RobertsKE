import React, { useContext } from 'react';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { type Product } from '../types';
import { CloseIcon, formatPrice, generateWhatsAppMessage, BUSINESS_PHONE_NUMBER, WhatsAppIcon } from '../constants';

interface CartScreenProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onCheckout: () => void;
  onHomeClick: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ onBack, onProductClick, onCheckout, onHomeClick }) => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const subtotal = cart.reduce((acc, item) => {
    let price = item.price;
    if (item.sale) price *= (1 - item.sale.discount);
    if (item.preOrder) price *= (1 - item.preOrder.discount);
    return acc + price * item.quantity;
  }, 0);
  
  const shipping = subtotal > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const hasPreOrderItems = cart.some(item => item.preOrder);

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage(cart, user);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="max-w-sm mx-auto">
            <Header onBack={onBack} isSticky={true} onHomeClick={onHomeClick} />
        </div>
      </div>

      <main className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Shopping Cart
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty.</p>
            <button onClick={onBack} className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-full font-semibold hover:bg-gray-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedVariant.colorName}`} className="flex bg-white p-3 rounded-lg shadow-sm">
                  <img 
                    src={item.selectedVariant.images[0]} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md cursor-pointer"
                    onClick={() => onProductClick(item)}
                  />
                  <div className="flex-1 ml-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                             <h2 className="font-semibold text-gray-800 text-sm pr-2">{item.name}</h2>
                             <button onClick={() => removeFromCart(item.id, item.selectedVariant.colorName)} className="p-1 -mr-1">
                                <CloseIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                             </button>
                        </div>
                      <p className="text-xs text-gray-500">Color: {item.selectedVariant.colorName}</p>
                      {item.preOrder && <p className="text-xs font-semibold text-blue-600">Pre-Order</p>}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button onClick={() => updateQuantity(item.id, item.selectedVariant.colorName, item.quantity - 1)} className="px-3 py-1 text-lg">-</button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.selectedVariant.colorName, item.quantity + 1)} className="px-3 py-1 text-lg">+</button>
                      </div>
                      <span className="font-bold text-gray-900">
                        {formatPrice((item.price * (1-(item.sale?.discount || 0)) * (1-(item.preOrder?.discount || 0))) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasPreOrderItems && (
                <div className="mt-6 bg-blue-100 text-blue-800 text-sm p-3 rounded-lg">
                    <p><b>Payment Note:</b> Your cart contains pre-order items. These are paid in two installments: 50% upfront, and the remaining 50% upon delivery.</p>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-sm mt-8">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-800">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
               <button onClick={onCheckout} className="w-full mt-6 bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                Proceed to Checkout
              </button>
              <button onClick={handleWhatsAppCheckout} className="w-full mt-2 bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <WhatsAppIcon className="w-5 h-5" />
                <span>Checkout with WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartScreen;
