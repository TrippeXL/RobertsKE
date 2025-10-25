
import React, { useRef, useEffect } from 'react';
import { ChevronLeftIcon } from '../constants';
import { type BlogPost } from '../types';

interface BlogScreenProps {
  posts: BlogPost[];
  onBack: () => void;
  onPostClick: (post: BlogPost) => void;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ posts, onBack, onPostClick }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef({ left: 0, top: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    scrollPos.current = { left: gridRef.current.scrollLeft, top: gridRef.current.scrollTop };
    gridRef.current.style.cursor = 'grabbing';
    gridRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !gridRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    gridRef.current.scrollLeft = scrollPos.current.left - dx;
    gridRef.current.scrollTop = scrollPos.current.top - dy;
  };

  const handleMouseUp = () => {
    if (!gridRef.current) return;
    isDragging.current = false;
    gridRef.current.style.cursor = 'grab';
  };
  
  useEffect(() => {
    const gridEl = gridRef.current;
    if (gridEl) {
        gridEl.addEventListener('mouseleave', handleMouseUp);
        return () => gridEl.removeEventListener('mouseleave', handleMouseUp);
    }
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-[#F9F5F0] h-screen flex flex-col overflow-hidden">
      <header className="p-4 bg-white shadow-sm flex items-center z-10 flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          Inspiration
        </h1>
        <div className="w-6 h-6"></div>
      </header>

       <div 
        ref={gridRef}
        className="flex-1 overflow-auto cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        <div className="grid grid-cols-2 gap-0 w-max p-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => onPostClick(post)}
              className={`w-40 h-56 p-4 flex flex-col justify-end text-white cursor-pointer relative overflow-hidden group
                ${post.bgColor === 'black' ? 'bg-gray-800' : 'bg-yellow-500'}`}
            >
              <img src={post.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{post.title}</h3>
                <p className="text-xs mt-1 opacity-80">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="flex-shrink-0 p-4 text-center text-xs text-gray-400">
            Click and drag to explore
       </div>
    </div>
  );
};

export default BlogScreen;