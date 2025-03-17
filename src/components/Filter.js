import React, { useState } from 'react';
import PricingOption from './PricingOption';
import ResetButton from './ResetButton';
import KeywordSearch from './KeywordSearch';
import SortDropdown from './SortDropdown';
import PricingSlider from './PricingSlider';

const pricingOptions = [
    { id: 'free', label: 'Free' },
    { id: 'paid', label: 'Paid' },
    { id: 'viewOnly', label: 'View Only' },
];

const Filter = ({ onFilterChange, onSortChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(499);

    const handleOptionChange = (optionId) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId];
            onFilterChange(newSelectedOptions, keyword, minPrice, maxPrice);
            return newSelectedOptions;
        });
    };

    const handleKeywordChange = (newKeyword) => {
        setKeyword(newKeyword);
        onFilterChange(selectedOptions, newKeyword, minPrice, maxPrice);
    };

    const handlePriceChange = (newMinPrice, newMaxPrice) => {
        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
        onFilterChange(selectedOptions, keyword, newMinPrice, newMaxPrice);
    };

    const handleReset = () => {
        setSelectedOptions([]);
        setKeyword('');
        setMinPrice(0);
        setMaxPrice(499);
        onFilterChange([], '', 0, 499);
    };

    const isPaidSelected = selectedOptions.includes('paid');

    return (
        <div>
            <KeywordSearch onKeywordChange={handleKeywordChange} />
            <div className="flex items-center justify-between flex-wrap gap-4 bg-black rounded-xl p-2 mt-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <h2 className="text-lg font-bold whitespace-nowrap">Pricing Options</h2>
                    <div className="flex gap-4 flex-wrap text-xs sm:text-sm">
                        {pricingOptions.map((option) => (
                            <PricingOption
                                key={option.id}
                                option={option}
                                isSelected={selectedOptions.includes(option.id)}
                                onChange={handleOptionChange}
                            />
                        ))}
                    </div>
                    <div className="w-80 sm:w-40 md:w-64 lg:w-72"> 
                        <PricingSlider  minPrice={minPrice}
                            maxPrice={maxPrice} onPriceChange={handlePriceChange} isPaidSelected={isPaidSelected} />
                    </div>
                </div>
                <ResetButton onClick={handleReset} />
            </div>
            <div className="flex justify-between items-center mt-4">
                <div></div>
                <SortDropdown onSortChange={onSortChange} className="ml-auto" />
            </div>
        </div>
    );
};

export default Filter;