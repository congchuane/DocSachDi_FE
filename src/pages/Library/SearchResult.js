import React, { useState, useLocation, useEffect } from 'react';
import './Library.css'; // Import the CSS file
import BookCard from '../../components/BookCard';
import image from '../../images/image.png';
import '../Home/Home.css';
import { useBooks } from '../../contexts/BookContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import SearchBar from '../../components/SearchBar';

const SearchResult = () => {
    const navigate = useNavigate();
    const { username, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const { books, searchBooks, searchResults, totalSearchResults, loading } = useBooks();
    const { searchTerm } = useLocation().state || { searchTerm: '' };

    useEffect(() => {
        if (searchTerm) {
            searchBooks(searchTerm);
        }
    }, ['']);

    const onChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='glass-container'>
                <nav className="navbar">
                    <div className="home-logo">
                        <img src={image} alt="image logo" />
                        <a href='#'>Đọc<span className='emphasized-text'>Sách</span>Đi</a>
                    </div>
                    {/* <div className="searchbar">
                        <input
                            className="search"
                            placeholder=""
                            value={searchTerm}
                            onChange={handleSearch}
                            spellCheck="false"
                        />
                    </div> */}
                    <SearchBar />
                    <ul className="nav-links">
                        <li className="nav-link"><a href='/library'>Hướng dẫn</a></li>
                        <li className="nav-link"><a href='/library'>Blog</a></li>
                        <li className="nav-link"><a href='/' onClick={handleLogout} className='active'>Đăng xuất</a></li>
                        <li className="nav-link">Xin chào, <strong>{username}</strong>!</li>
                    </ul>
                </nav>
                <div className='page-title'>
                    <h2>Kết quả tìm kiếm cho: {searchTerm}</h2>
                </div>
                <div className="wrapper">
                    {books.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
                <Pagination
                    align='center'
                    current={currentPage}
                    onChange={onChange}
                    total={books.length}
                />
            </div>
        </div>
    );
};

export default SearchResult;
