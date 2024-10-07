import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [newestBooks, setNewestBooks] = useState([]);
    const [searchResults, setSearchResults] = useState(0);
    const [totalSearchResults, setTotalSearchResults] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllBooks = async () => {
            const response = await axios.get('http://localhost:8080/api/books');
            const updatedBooks = response.data.map(book => {
                return {
                    ...book,
                    coverPath: book.coverPath.replace(/^\/Users\/vinguyen\/OneDrive\/GitHub\/docsachdi\/public/, '')
                };
            });
            setBooks(updatedBooks);
        };
        getAllBooks();
    }, []);

    useEffect(() => {
        const getNewestBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books/newest');
                setNewestBooks(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sách:', error);
            }
        };
        getNewestBooks();
    }, []);

    const searchBooks = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/books/search', {
                params: { title: searchTerm, author: searchTerm, tag: searchTerm },
            });
            setSearchResults(response.data);
            setTotalSearchResults(response.data.length);
        } catch (error) {
            console.error('Error searching books:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BookContext.Provider value={{ books, newestBooks, searchBooks, searchResults, totalSearchResults, loading }}>
            {children}
        </BookContext.Provider>
    );
};
