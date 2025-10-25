
import React from 'react';

const TwitterIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.54v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.29 1.97-2.08z"></path></svg>
);
const InstagramIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.234.194-6.321 2.275-6.516 6.516-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.195 4.242 2.281 6.321 6.516 6.516 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.234-.194 6.321-2.275 6.516-6.516.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.195-4.242-2.281-6.321-6.516-6.516-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
);
const FacebookIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
);


interface FooterProps {
    onNavigate: (view: 'shop' | 'blog' | 'services', payload?: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-[#F9F5F0] border-t border-gray-200">
            <div className="max-w-sm mx-auto px-4 pt-12 pb-8">
                <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
                    <div className="mb-8 md:mb-0 md:w-1/3">
                        <h3 className="text-lg font-bold text-gray-800" style={{fontFamily: "'Playfair Display', serif"}}>ROBERTS</h3>
                        <p className="mt-2 text-sm text-gray-600">
                           Curating beautiful spaces with unique and sustainable home decor in the heart of Kenya.
                        </p>
                    </div>

                    <div className="mb-8 md:mb-0 md:w-1/3">
                        <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li><button onClick={() => onNavigate('shop')} className="hover:underline">Shop</button></li>
                            <li><button className="hover:underline">About Us</button></li>
                            <li><button onClick={() => onNavigate('blog')} className="hover:underline">Blog</button></li>
                        </ul>
                    </div>

                    <div className="md:w-1/3">
                        <h4 className="font-semibold text-gray-800 mb-3">Customer Service</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li><button className="hover:underline">Contact Us</button></li>
                            <li><button className="hover:underline">FAQ</button></li>
                            <li><button onClick={() => onNavigate('services')} className="hover:underline">After-Sale Services</button></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 sm:mb-0">
                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-gray-800"><TwitterIcon /></a>
                        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-800"><InstagramIcon /></a>
                        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-800"><FacebookIcon /></a>
                    </div>
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Roberts Indoor Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
