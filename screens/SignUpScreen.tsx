
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { type User } from '../types';

interface SignUpScreenProps {
  onSignInClick: () => void;
  onSignUpSuccess: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignInClick, onSignUpSuccess }) => {
  const [details, setDetails] = useState<Omit<User, 'role' | 'bio' | 'avatarUrl'>>({
      name: '',
      phone: '',
      email: '',
      address: '',
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({
        ...details,
        [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.phone || !details.email) {
        setError('Please fill out all required fields.');
        return;
    }
    if (signup(details)) {
        onSignUpSuccess();
    } else {
        setError('Could not create account. The phone number may already be in use.');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] min-h-screen flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-xs">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Create Account
            </h1>
            <p className="text-center text-gray-500 mb-8">Join the Roberts family</p>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" value={details.name} onChange={handleChange} required className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" value={details.phone} onChange={handleChange} required className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" value={details.email} onChange={handleChange} required className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Delivery Address (Optional)</label>
                    <textarea name="address" value={details.address} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md h-20"></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors">
                    Sign Up
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <button onClick={onSignInClick} className="font-semibold text-gray-800 hover:underline">
                    Sign In
                </button>
            </p>
        </div>
    </div>
  );
};

export default SignUpScreen;
