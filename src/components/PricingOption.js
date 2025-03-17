import React from 'react';

const PricingOption = ({ option, isSelected, onChange }) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="mr-2"
            />
            <label htmlFor={option.id} className="text-xs sm:text-sm">
                {option.label}
            </label>
        </div>
    );
};

export default PricingOption;