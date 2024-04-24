import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import NormalLoginForm from './components/NormalLoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import BookList from './components/BookList';
import ItemList from './components/ItemList';
import SearchBookList from './components/SearchBookList';
import { UserProvider } from './components/UserContext';
import UserTransactionsList from './components/UserTransactionList';
import CustomBarChart from './components/CustomBarChart';
import ManageBooks from './components/Admin/ManageBook';

const App = () => {
  return (
    <UserProvider> {/* Wrap the Router with UserProvider */}
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
                  <Route path="/transactions" element={<UserTransactionsList />} /> 
                  <Route path="/transactions/chart" element={<CustomBarChart />} /> 
                  <Route path="/admin" element={<ManageBooks />} /> 

                  {/* Additional routes can be added here as needed */}
              </Routes>
          </div>
      </Router>
    </UserProvider>
  );
};

export default App;