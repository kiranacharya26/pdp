import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 1;
const MIN = 0;
const MAX = 499;

const PricingSlider = ({ minPrice, maxPrice, onPriceChange, isPaidSelected }) => {
    const [values, setValues] = useState([minPrice, maxPrice]);

    useEffect(() => {
        setValues([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const handleChange = (values) => {
        setValues(values);
        onPriceChange(values[0], values[1]);
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <span>${values[0]}</span>
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={handleChange}
                    disabled={!isPaidSelected}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                background: getTrackBackground({
                                    values,
                                    colors: isPaidSelected ? ['#ccc', '#548BF4', '#ccc'] : ['#ccc', '#aaa', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                backgroundColor: '#548BF4',
                            }}
                        />
                    )}
                />
                <span className='text-xs sm:text-sm'>${values[1]}</span>
            </div>
        </div>
    );
};

export default PricingSlider;