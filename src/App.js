import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import NormalLoginForm from './components/NormalLoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import BookList from './components/BookList';
import ItemList from './components/ItemList';
import SearchBookList from './components/SearchBookList';

const App = () => {
  return (
    <Router>
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<NormalLoginForm />} />
                <Route path="/book-list" element={<BookList />} />
                <Route path="/items/by-book/:bibNumber" element={<ItemList />} />
                <Route path="/books/search/:keyword" element={<SearchBookList />} />

                {/* Add more routes as needed */}
            </Routes>
        </div>
    </Router>
);
};

export default App;