import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { Spin, Card, Row, Col, List, Button, notification } from 'antd';
import api from './api';

function UserTransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (user && user.id) {
            fetchTransactions(user.id);
        }
    }, [user]);

    const fetchTransactions = (userId) => {
        setIsLoading(true);
        api.get(`/transactions/${userId}`)
            .then(response => {
                setTransactions(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(`There was an error fetching the transactions for user ID ${userId}:`, error);
                setIsLoading(false);
            });
    };

    const handleReturn = (transactionId) => {
        api.post(`/transactions/return/${transactionId}`, {})
            .then(response => {
                notification.success({
                    message: 'Return Successful',
                    description: 'The item has been successfully returned.',
                });
                fetchTransactions(user.id); // Refresh the list of transactions
            })
            .catch(error => {
                notification.error({
                    message: 'Return Failed',
                    description: 'Failed to return the item. Please try again later.',
                });
                console.error('Error returning item:', error);
            });
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
                title="Your Transactions"
                bordered={false}
                style={{
                    border: '1px solid #e8e8e8',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                }}
            >
                <Row gutter={2} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Col span={2}><strong>Id</strong></Col>
                    <Col span={10}><strong>Title</strong></Col>
                    <Col span={6}><strong>Barcode</strong></Col>
                    <Col span={6}><strong>Return Action</strong></Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={transactions}
                    renderItem={(transaction, index) => (
                        <Row
                            gutter={16}
                            style={{
                                padding: '10px 0',
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                            }}
                        >
                            <Col span={2}>{transaction.transactionId}</Col>
                            <Col span={10}>{transaction.title}</Col>
                            <Col span={6}>{transaction.itemBarcode}</Col>
                            <Col span={6}>
                                {transaction.returnDateTime ? (
                                    "No Action Allowed"
                                ) : (
                                    <Button type="primary" onClick={() => handleReturn(transaction.transactionId)}>
                                        Return Item
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
}

export default UserTransactionsList;