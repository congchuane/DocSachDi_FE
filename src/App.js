import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyLayout from './components/MyLayout.js';
import PrivateRoute from './components/PrivateRoute.js';
import AdminRoute from './components/AdminRoute.js';
import Home from './pages/Home/Home.js';
import BookDetail from './pages/Book/BookDetail.js';
import Library from './pages/Library/Library.js';
import SearchResult from './pages/Library/SearchResult.js';
import Login from './pages/Login/Login.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Users from './pages/Dashboard/Users.js';
import AddBook from './pages/Dashboard/AddBook.js';
import AccessDenied from './pages/Error/AccessDenied';
import NotFound from './pages/Error/NotFound';
import { BookProvider } from './contexts/BookContext';
import { AuthProvider } from './contexts/AuthContext.js';


const App = () => {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <MyLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/library" element={<PrivateRoute><Library /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><SearchResult /></PrivateRoute>} />
              <Route path="/book/:bookId" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
              <Route path="/addbook" element={<AdminRoute><AddBook /></AdminRoute>} />
              <Route path="/accessdenied" element={<AccessDenied />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MyLayout>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
