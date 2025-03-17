import React from 'react';

const SortDropdown = ({ onSortChange }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className="relative">
            <select 
                onChange={handleSortChange} 
                className="appearance-none bg-transparent border-b border-gray-400 py-1 pr-6 text-xs sm:text-sm focus:outline-none"
            >
                <option value="name">Relevance</option>
                <option value="higherPrice">Higher Price</option>
                <option value="lowerPrice">Lower Price</option>
            </select>
            {/* Arrow Down Icon */}
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                ↓
            </span>
        </div>
    );
};

export default SortDropdown;
