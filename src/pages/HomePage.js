import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContent, setFilteredContent, setSortCriteria } from '../redux/contentSlice';
import Filter from '../components/Filter';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const pricingOptionsMap = {
    free: 0,
    paid: 1,
    viewOnly: 2
};

const HomePage = () => {
    const dispatch = useDispatch();
    const { contentList, filteredContent, sortCriteria } = useSelector(state => state.content);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        setLoading(true); // Start loading
        fetch('https://closet-recruiting-api.azurewebsites.net/api/data')
            .then(response => response.json())
            .then(data => {
                dispatch(setContent(data));
                dispatch(setFilteredContent(data));
                setLoading(false); // Stop loading after data is fetched
            })
            .catch(() => setLoading(false)); // Stop loading even if there's an error
    }, [dispatch]);

    const handleFilterChange = (selectedOptions, keyword, minPrice, maxPrice) => {
        let filtered = contentList;

        if (selectedOptions.length > 0) {
            const selectedValues = selectedOptions.map(option => pricingOptionsMap[option]);
            filtered = filtered.filter(item => selectedValues.includes(item.pricingOption));
        }

        if (keyword) {
            filtered = filtered.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()) || item.creator.toLowerCase().includes(keyword.toLowerCase()));
        }

        if (selectedOptions.includes('paid')) {
            filtered = filtered.filter(item => item.price >= minPrice && item.price <= maxPrice);
        }

        dispatch(setFilteredContent(filtered));
        setPage(1);
    };

    const handleSortChange = (criteria) => {
        dispatch(setSortCriteria(criteria));
        let sortedContent = [...filteredContent];

        if (criteria === 'higherPrice') {
            sortedContent.sort((a, b) => b.price - a.price);
        } else if (criteria === 'lowerPrice') {
            sortedContent.sort((a, b) => a.price - b.price);
        } else {
            sortedContent.sort((a, b) => a.title.localeCompare(b.title));
        }
        dispatch(setFilteredContent(sortedContent));
        setPage(1);
    };

    const loadMoreItems = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    useInfiniteScroll(loadMoreItems);

    const itemsToDisplay = filteredContent.slice(0, page * 20);

    return (
        <div className="container mx-auto">
            <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

            {loading ? ( 
                <p className="text-center text-white text-lg font-semibold my-8">Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4 md:p-6">
                    {itemsToDisplay.map(content => (
                        <div key={content.id} className="rounded-xl shadow-lg bg-gray-900 text-white flex flex-col min-h-[450px] overflow-hidden">
                            <div className="flex-grow flex">
                                <img
                                    src={content.imagePath}
                                    alt={content.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold">{content.title}</h3>
                                        <p className="text-sm">{content.creator}</p>
                                    </div>
                                    <div className="flex flex-col sm:items-end">
                                        <p className="text-sm">{pricingOptionsMap[content.pricingOption]}</p>
                                        {content.pricingOption === 1 && <p className="text-sm">${content.price || 'N/A'}</p>}
                                        {content.pricingOption === 0 && <p className="text-sm">Free</p>}
                                        {content.pricingOption === 2 && <p className="text-sm">View Only</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
