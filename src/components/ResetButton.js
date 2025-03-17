import React from 'react';

const ResetButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-xs sm:text-sm text-black-500 px-2 sm:px-3 py-1 sm:py-1.5 rounded"
        >
            Reset
        </button>
    );
};

export default ResetButton;
