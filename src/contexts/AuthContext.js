import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const initializeAuthState = () => {
    const storedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const storedIsAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const storedUsername = localStorage.getItem('username');
    const storedAuthHeader = localStorage.getItem('authHeader');

    return {
        isAuthenticated: storedIsAuthenticated || false,
        isAdmin: storedIsAdmin || false,
        username: storedUsername || '',
        authHeader: storedAuthHeader || ''
    };
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initializeAuthState().isAuthenticated);
    const [isAdmin, setIsAdmin] = useState(initializeAuthState().isAdmin);
    const [username, setUsername] = useState(initializeAuthState().username);
    const [authHeader, setAuthHeader] = useState(initializeAuthState().authHeader);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }, [isAdmin]);

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    useEffect(() => {
        if (authHeader) {
            localStorage.setItem('authHeader', authHeader);
        } else {
            localStorage.removeItem('authHeader');
        }
    }, [authHeader]);

    const setAuthState = (username, password, isAdmin) => {
        setUsername(username);
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        const headers = {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        };
        setAuthHeader(headers.Authorization);
    };

    const login = async ({ username, password }) => {
        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
        if (response.data.success) {
            setAuthState(response.data.user.username, password, response.data.user.role === 'ROLE_ADMIN');
            return true;
        } else {
            return false;
        }
    };

    const register = async ({ username, password, email }) => {
        const response = await axios.post('http://localhost:8080/api/auth/register', { username, password, email });
        if (response.data.success) {
            setAuthState(response.data.user.username, password, response.data.user.role === 'ROLE_ADMIN');
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUsername('');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setAuthHeader('');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('username');
        localStorage.removeItem('authHeader');
    };

    return (
        <AuthContext.Provider value={{ isAdmin, isAuthenticated, username, register, login, logout, authHeader }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
