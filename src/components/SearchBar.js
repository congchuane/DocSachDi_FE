import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        navigate('/search', { state: { searchTerm: term } });
    };

    return (
        <div className="searchbar">
            <input
                className="search"
                placeholder="Tìm kiếm sách..."
                value={searchTerm}
                onChange={handleSearch}
                spellCheck="false"
            />
        </div>
    );
};

export default SearchBar;
