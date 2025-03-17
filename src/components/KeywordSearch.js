import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons

const KeywordSearch = ({ onKeywordChange }) => {
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        onKeywordChange(newKeyword);
    };

    return (
        <div className="relative  w-full">
            <input
                type="text"
                value={keyword}
                onChange={handleInputChange}
                placeholder="Search by keyword"
                className="border p-2 pr-10 rounded w-full text-xs sm:text-sm focus:outline-none"
            />
            {/* Search Icon */}
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base" />
        </div>
    );
};

export default KeywordSearch;
