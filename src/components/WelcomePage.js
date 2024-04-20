import React from 'react';
import myImage from '../libhub_logo.jpeg'; // Ensure this path is correct

const WelcomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src={myImage} alt="LibHub Logo" style={{ width: '300px' }} />
            <h2>Welcome to LibHub</h2>
            <p>A Centralized Library Catalog</p>
        </div>
    );
};

export default WelcomePage;
