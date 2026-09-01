import React from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <div className="px-margin-mobile mb-2.5 max-w-md mx-auto">
      <div className="relative">
        <span className="material-symbols-outlined text-lg absolute right-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="ابحث عن أكلتك المفضلة (كريب، بيتزا، برجر...)..."
          className="w-full pl-8 pr-10 py-2 bg-white border border-[#eae7e7] rounded-xl text-xs sm:text-sm text-[#1c1b1b] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all text-right"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="مسح البحث"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>
    </div>
  );
};
