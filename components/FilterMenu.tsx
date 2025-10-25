import React, { useState, useEffect, useRef, useMemo } from 'react';
import { type Category } from '../types';
import { ChevronRightIcon, getCategoryPath } from '../constants';

interface FilterMenuProps {
  allCategories: Category[];
  activeCategoryId: string | null;
  onCategorySelect: (categoryId: string) => void;
  onHomeSelect: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ allCategories, activeCategoryId, onCategorySelect, onHomeSelect }) => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When the active category changes from outside (e.g., page scroll), update the menu's path
    if (activeCategoryId) {
      const path = getCategoryPath(allCategories, activeCategoryId);
      setActivePath(path.map(c => c.id));

      // Scroll the active item into view
      setTimeout(() => {
        const activeElement = menuRef.current?.querySelector(`[data-id="${activeCategoryId}"]`);
        activeElement?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 100);
    } else {
        setActivePath([]);
    }
  }, [activeCategoryId, allCategories]);

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category.id);
  };

  const menuItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    let currentLevel: Category[] = allCategories;
    let pathIndex = 0;

    while(currentLevel && currentLevel.length > 0) {
        const activeIdInLevel = activePath[pathIndex];
        let nextLevel: Category[] | undefined = undefined;

        currentLevel.forEach((category) => {
            const isActive = activePath[pathIndex] === category.id;
            const isSelected = activeCategoryId === category.id;

            let buttonStyle = '';
            let name = category.name;

            if (pathIndex === 0) { // Parent
                buttonStyle = `font-bold text-sm tracking-wider uppercase ${isSelected ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`;
            } else if (pathIndex === 1) { // Child
                buttonStyle = `text-sm ${isSelected ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`;
            } else { // Grandchild
                buttonStyle = `text-xs ${isSelected ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'}`;
                name = name.replace('# ', '#');
            }
            
            if (items.length > 0 && pathIndex > 0 && items[items.length-1]?.type !== 'separator') {
                 // Fix: Wrap ChevronRightIcon in React.Fragment to pass the key prop, which it doesn't accept directly.
                 // Also, use category.id to ensure the key is unique within the list, fixing a potential React warning.
                 items.push(<React.Fragment key={`sep-${category.id}`}><ChevronRightIcon className="w-5 h-5 text-gray-300 flex-shrink-0" /></React.Fragment>);
            }

            items.push(
                <button
                  key={category.id}
                  data-id={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`py-2 px-4 rounded-full transition-colors whitespace-nowrap ${buttonStyle}`}
                >
                  {name}
                </button>
            );

            if (isActive && category.children) {
                nextLevel = category.children;
            }
        });

        currentLevel = nextLevel!;
        pathIndex++;
    }

    return items;
  }, [activePath, activeCategoryId, allCategories, onCategorySelect]);

  return (
    <section className="py-4 bg-white border-b border-gray-200 sticky top-16 z-30">
      <div ref={menuRef} className="max-w-sm mx-auto px-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <button
            onClick={() => {
                setActivePath([]);
                onHomeSelect();
            }}
            className={`py-2 px-4 rounded-full font-bold text-sm tracking-wider uppercase transition-colors ${!activeCategoryId ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Home
          </button>
          <div className="w-px h-6 bg-gray-200"></div>
          {menuItems}
        </div>
      </div>
    </section>
  );
};

export default FilterMenu;
