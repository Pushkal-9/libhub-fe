import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { List, Spin, Card, Row, Col } from 'antd';

function ItemList() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { bibNumber } = useParams(); // Use useParams hook to access bibNumber from the URL

    useEffect(() => {
        axios.get(`http://localhost:8080/items/by-book/${bibNumber}`)
            .then(response => {
                setItems(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(`There was an error fetching the items for book number ${bibNumber}:`, error);
                setIsLoading(false);
            });
    }, [bibNumber]);

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
                    <Col span={6}><strong>Barcode</strong></Col>
                    <Col span={10}><strong>Title</strong></Col>
                    <Col span={4}><strong>Call Number/Location</strong></Col>
                    <Col span={4}><strong>Status</strong></Col>
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
                            <Col span={6}>{item.itemBarcode}</Col>
                            <Col span={10}>{item.book.title}</Col>
                            <Col span={4}>{item.callNumber}</Col>
                            <Col span={4}>{item.status}</Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
}

export default ItemList;