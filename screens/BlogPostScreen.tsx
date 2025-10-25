

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { type BlogPost, type Product, type Category } from '../types';
import ProductCard from '../components/ProductCard';

interface BlogPostScreenProps {
  post: BlogPost;
  onBack: () => void;
  allProducts: Product[];
  allCategories: Category[];
  onProductClick: (product: Product) => void;
}

const BlogPostScreen: React.FC<BlogPostScreenProps> = ({ post, onBack, allProducts, allCategories, onProductClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSticky = scrollY > 10;
  
  const relatedProducts = useMemo(() => {
    if (!post.relatedProductIds || !allProducts) return [];
    return allProducts.filter(p => post.relatedProductIds!.includes(p.id));
  }, [post, allProducts]);

  return (
    <div className="bg-white min-h-screen">
      <Header onBack={onBack} isSticky={isSticky} />

      <main className="pb-12">
        <div className="relative h-64 max-w-sm mx-auto">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
                 <h1 className="text-3xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>{post.title}</h1>
            </div>
        </div>

        <div className="p-6 max-w-sm mx-auto">
            <div className="flex items-center text-xs text-gray-500 mb-4">
                <span>By {post.author}</span>
                <span className="mx-2">|</span>
                <span>{post.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-8 pt-8 border-t">
            <div className="px-6 max-w-sm mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Shop This Story
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {relatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} allCategories={allCategories} />
                    ))}
                </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogPostScreen;
