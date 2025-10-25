import React, { useContext } from 'react';
import { ChevronLeftIcon } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { type Order } from '../types';

interface AccountScreenProps {
  onBack: () => void;
  onNavigate: (view: 'signIn' | 'orderDetails', payload?: any) => void;
  orders: Order[];
}

const AccountScreen: React.FC<AccountScreenProps> = ({ onBack, onNavigate, orders }) => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen flex items-center justify-center">
        <p>You are not logged in.</p>
        <button onClick={() => onNavigate('signIn')} className="text-blue-500 ml-2">Login</button>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    onNavigate('signIn');
  };

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen">
      <header className="p-4 bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          My Account
        </h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
            <form className="space-y-4 text-sm">
                <div>
                    <label className="text-gray-600 font-medium">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50"/>
                </div>
                 <div>
                    <label className="text-gray-600 font-medium">Email Address</label>
                    <input type="email" defaultValue={user.email} className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50"/>
                </div>
                 <div>
                    <label className="text-gray-600 font-medium">Phone Number</label>
                    <input type="tel" defaultValue={user.phone} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"/>
                </div>
                 <div>
                    <label className="text-gray-600 font-medium">Delivery Address</label>
                    <textarea defaultValue={user.address} className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50 h-20"></textarea>
                </div>
                <button type="submit" onClick={e => e.preventDefault()} className="w-full mt-2 bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                    Save Changes
                </button>
            </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Login & Security</h2>
            <button className="w-full text-left py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Change Password
            </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order History</h2>
            <div className="space-y-4">
              {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="text-sm border-b pb-2 cursor-pointer hover:bg-gray-50 -mx-6 px-6" onClick={() => onNavigate('orderDetails', order)}>
                    <div className="flex justify-between">
                      <p className="font-semibold">{order.id}</p>
                      <p className={`font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-500'}`}>{order.status}</p>
                    </div>
                    <p className="text-gray-500">Placed on: {order.date}</p>
                </div>
              )) : (
                <p className="text-center text-sm text-gray-500 pt-2">You haven't placed any orders yet.</p>
              )}
            </div>
        </div>

        <div className="pt-4">
            <button onClick={handleLogout} className="w-full text-center py-3 text-sm text-red-600 font-semibold bg-white rounded-full shadow-sm hover:bg-red-50">
                Log Out
            </button>
        </div>
      </main>
    </div>
  );
};

export default AccountScreen;