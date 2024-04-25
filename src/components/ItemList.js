import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, Spin, Card, Row, Col, Button, notification } from 'antd';
import { useUser } from './UserContext';
import api from './api';


function ItemList() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { bibNumber } = useParams(); // Use useParams hook to access bibNumber from the URL
    const navigate = useNavigate();
    const { user, setUser } = useUser(); 


    useEffect(() => {
        fetchItems();
    }, [bibNumber]);

    const fetchItems = () => {
        setIsLoading(true);
        api.get(`/items/by-book/${bibNumber}`)
            .then(response => {
                setItems(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(`There was an error fetching the items for book number ${bibNumber}:`, error);
                setIsLoading(false);
            });
    };

    const handleCheckout = async (itemBarcode) => {
        try {
            const response = await api.post(`/transactions/checkout?userId=${user.id}&itemBarcode=${itemBarcode}`);
            console.log('Checkout response:', response); // Log response to see what's happening
            notification.success({
                message: 'Checkout Successful',
                description: `Item with barcode ${itemBarcode} has been successfully checked out.`,
            });
            fetchItems(); // Re-fetch items to update the list
        } catch (error) {
            console.error('Checkout failed:', error); // Log error to console
            notification.error({
                message: 'Checkout Failed',
                description: (error.response && error.response.data && error.response.data.message) || 'Failed to checkout item. Please try again.',
            });
        }
    };
    

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
                title={`Items for Bib Number: ${bibNumber}`}
                bordered={false}
                style={{
                    border: '1px solid #e8e8e8',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                }}
            >
                <Row gutter={2} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Col span={5}><strong>Barcode</strong></Col>
                    <Col span={8}><strong>Title</strong></Col>
                    <Col span={5}><strong>Call Number/Location</strong></Col>
                    <Col span={3}><strong>Status</strong></Col>
                    <Col span={3}><strong>Action</strong></Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={(item, index) => (
                        <Row
                            gutter={16}
                            style={{
                                padding: '10px 0',
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                            }}
                        >
                            <Col span={5}>{item.itemBarcode}</Col>
                            <Col span={8}>{item.book.title}</Col>
                            <Col span={5}>{item.callNumber}</Col>
                            <Col span={3}>{item.status}</Col>
                            <Col span={3}>
                            {item.status === 'Available' ? (
                                    user ? (
                                        <Button type="primary" onClick={() => handleCheckout(item.itemBarcode)}>
                                            Checkout
                                        </Button>
                                    ) : (
                                        <span>Sign in to checkout</span>
                                    )
                                ) : (
                                    <span>No Action</span>
                                )}
                            </Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
}

export default ItemList;