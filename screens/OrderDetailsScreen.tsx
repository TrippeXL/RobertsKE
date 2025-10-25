import React from 'react';
import { ChevronLeftIcon, formatPrice } from '../constants';
import { type Order, type Product } from '../types';

interface OrderDetailsScreenProps {
  order: Order;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({ order, onBack, onProductClick }) => {

  const subtotal = order.items.reduce((acc, item) => {
    let price = item.price;
    if (item.sale) price *= (1 - item.sale.discount);
    if (item.preOrder) price *= (1 - item.preOrder.discount);
    return acc + price * item.quantity;
  }, 0);
  
  const shipping = order.total - subtotal;

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <header className="p-4 bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          Order Details
        </h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3">
                <div>
                    <p className="font-bold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-500">Placed on {order.date}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {order.status}
                </span>
            </div>
            <div className="pt-3">
                <p className="text-sm font-semibold">Shipping to:</p>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
            </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={`${item.id}-${item.selectedVariant.colorName}`} className="flex">
                  <img 
                    src={item.selectedVariant.images[0]} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    onClick={() => onProductClick(item)}
                  />
                  <div className="flex-1 ml-4 flex justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-sm text-gray-900">
                        {formatPrice((item.price * (1-(item.sale?.discount || 0)) * (1-(item.preOrder?.discount || 0))) * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        </div>
        
         <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
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
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
      </main>
    </div>
  );
};

export default OrderDetailsScreen;