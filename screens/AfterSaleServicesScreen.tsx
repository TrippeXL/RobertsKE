import React from 'react';
import { ChevronLeftIcon } from '../constants';
import { type DesignService } from '../types';

interface AfterSaleServicesScreenProps {
  onBack: () => void;
  onNavigate: (view: 'portfolio' | 'blog') => void;
}

const AfterSaleServicesScreen: React.FC<AfterSaleServicesScreenProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <header className="p-4 bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          After-Sale Services
        </h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>We take measurements, deliver, and fit.</h2>
                <p className="text-gray-600 mt-2 text-sm">Our commitment to you doesn't end at the checkout. We offer a complete service to ensure your new pieces fit perfectly into your Kenyan home.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1593085512500-213c3a44a7a8?q=80&w=1887&auto=format&fit=crop" alt="Measuring a space" className="w-full h-40 object-cover"/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Process</h3>
            <ol className="space-y-4 text-sm">
                <li className="flex items-start">
                    <span className="font-bold text-gray-800 mr-3">1.</span>
                    <p className="text-gray-700"><b>Measurement & Consultation:</b> For custom fits, our team visits your home in Nairobi to take precise measurements and ensure your chosen items will be a perfect match.</p>
                </li>
                 <li className="flex items-start">
                    <span className="font-bold text-gray-800 mr-3">2.</span>
                    <p className="text-gray-700"><b>Careful Delivery:</b> We handle the logistics. Our team delivers your items to your doorstep with the utmost care.</p>
                </li>
                 <li className="flex items-start">
                    <span className="font-bold text-gray-800 mr-3">3.</span>
                    <p className="text-gray-700"><b>Professional Fitting:</b> We don't just drop boxes. Our service includes assembly and fitting to bring your vision to life exactly as you imagined it.</p>
                </li>
            </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Flexible Payments for Pre-Orders</h3>
            <p className="text-sm text-gray-600">Our Pre-Order and Dropshipping items are paid in two convenient installments: a 50% down payment to secure your order, and the final 50% upon delivery and fitting.</p>
        </div>
        
        <div className="text-center">
             <button onClick={() => onNavigate('portfolio')} className="w-full mt-2 bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                View Our Work
            </button>
        </div>
      </main>
    </div>
  );
};

export default AfterSaleServicesScreen;