import React, { useState, useEffect, useCallback } from 'react';
import Filter from '../components/Filter';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const pricingOptionsMap = {
    free: 0,
    paid: 1,
    viewOnly: 2
};

const HomePage = () => {
    const [contentList, setContentList] = useState([]);
    const [filteredContent, setFilteredContent] = useState([]);
    const [page, setPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('name');

    useEffect(() => {
        fetch('https://closet-recruiting-api.azurewebsites.net/api/data')
            .then((response) => response.json())
            .then((data) => {
                setContentList(data);
                setFilteredContent(data);
            });
    }, []);

    const handleFilterChange = (selectedOptions, keyword, minPrice, maxPrice) => {
        let filtered = contentList;

        if (selectedOptions.length > 0) {
            const selectedValues = selectedOptions.map(option => pricingOptionsMap[option]);
            filtered = filtered.filter((item) =>
                selectedValues.includes(item.pricingOption)
            );
        }

        if (keyword) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                item.creator.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        if (selectedOptions.includes('paid')) {
            filtered = filtered.filter((item) =>
                item.price >= minPrice && item.price <= maxPrice
            );
        }

        setFilteredContent(filtered);
    };

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
        let sortedContent = [...filteredContent];
        if (criteria === 'higherPrice') {
            sortedContent.sort((a, b) => b.price - a.price);
        } else if (criteria === 'lowerPrice') {
            sortedContent.sort((a, b) => a.price - b.price);
        } else {
            sortedContent.sort((a, b) => a.title.localeCompare(b.title));
        }
        setFilteredContent(sortedContent);
    };

    const loadMoreItems = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);

    useInfiniteScroll(loadMoreItems);

    const itemsToDisplay = filteredContent.slice(0, page * 20); // Adjust the number of items per page as needed

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150'; // Placeholder image URL
    };

    return (
        <div>
            <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {itemsToDisplay.map((content) => (
                    <div key={content.id} className="border rounded">
                        <img
                            src={content.imagePath}
                            alt={content.title}
                            className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 object-cover mb-2"
                            onError={handleImageError}
                        />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4">
  {/* Title and Creator in one block */}
  <div className="flex flex-col">
    <h3 className="text-md font-bold">{content.title}</h3>
    <p className="text-sm text-gray-600">{content.creator}</p>
  </div>

  {/* Pricing Details in another block */}
  <div className="flex flex-col sm:items-end">
    <p className="text-sm text-gray-600">{pricingOptionsMap[content.pricingOption]}</p>
    {content.pricingOption === 1 && (
      <p className="text-sm text-gray-600">${content.price || 'N/A'}</p>
    )}

                        {content.pricingOption === 0 && (
                            <p className="text-sm text-gray-600">Free</p>
                        )} 
                        {content.pricingOption === 2 && (
                            <p className="text-sm text-gray-600">View Only</p>
                        )} 
  </div>
</div>

                       
 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;