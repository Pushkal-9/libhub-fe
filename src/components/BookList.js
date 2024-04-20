import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Spin, Card, Row, Col } from 'antd';
import {useNavigate} from "react-router-dom";

function BookList() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const onSelectingClick = (book) => {
        navigate('/items/by-book/'+book.bibNumber);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                setBooks(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the books:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card
                title="LibHub: A Centralized Library Catalog"
                bordered={false}
                style={{
                    border: '1px solid #e8e8e8',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                }}
            >
                    <Row gutter={2} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Col span={2}><strong>Bib Number</strong></Col>
                    <Col span={8}><strong>Title</strong></Col>
                    <Col span={6}><strong>Author</strong></Col>
                    <Col span={4}><strong>Publisher</strong></Col>
                    <Col span={2}><strong>Publication Year</strong></Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={books}
                    renderItem={(book, index) => (
                        <Row
                            gutter={16}
                            style={{
                                padding: '20px 0',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#add8e6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f5f5f5' : 'white'}
                            onClick={() => onSelectingClick(book)}
                        >
                            <Col span={2}>{book.bibNumber}</Col>
                            <Col span={8}>{book.title}</Col>
                            <Col span={6}>{book.author}</Col>
                            <Col span={4}>{book.publisher}</Col>
                            <Col span={2}>{book.publicationYear}</Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
}

export default BookList;