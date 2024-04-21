import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Layout, Input } from 'antd';
import myImage from '../libhub_logo.jpeg';
import { useUser } from './UserContext';

const { Header } = Layout;


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchKeyword, setSearchKeyword] = useState('');
    const { user, setUser } = useUser(); 
    const onSearch = (value) => {
        if (value.trim()) {
            navigate(`/books/search/${value}`);
            setSearchKeyword(value);
        }
    };

    const handleSignOut = () => {
        setUser(null); // Clear the user from context
        navigate('/'); // Redirect to the home page
    };

    useEffect(() => {
        if (!location.pathname.includes('/books/search')) {
            setSearchKeyword('');
        }
    }, [location.pathname]);

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                {/* Wrap both the image and the text inside the Link to make them clickable */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <img src={myImage} alt="LibHub Logo" style={{ maxHeight: '64px' }} />
                    <span style={{ marginLeft: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>LibHub</span>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input.Search
                    placeholder="Search Books"
                    onSearch={onSearch}
                    style={{ marginRight: '20px', maxWidth: '200px' }}
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                />
                <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                    <Menu.Item key="catalog">
                        <Link to="/book-list">Catalog</Link>
                    </Menu.Item>
                    {user ? (
                        <>
                        <Menu.Item key="transactions">
                            <Link to="/transactions">Transactions</Link>
                        </Menu.Item>
                        <Menu.Item key="signout" onClick={handleSignOut}>
                            Sign Out
                        </Menu.Item>
                    </>
                    ) : (
                        <>
                            <Menu.Item key="signin">
                                <Link to="/signin">Sign In</Link>
                            </Menu.Item>
                            <Menu.Item key="signup">
                                <Link to="/signup">Sign Up</Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </div>
        </Header>
    );
};

export default Navbar;