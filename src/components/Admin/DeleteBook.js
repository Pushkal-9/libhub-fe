import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, notification, Form, InputNumber } from 'antd';

const DeleteBook = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { bibNumber } = values;
    try {
      await axios.delete(`http://localhost:8080/books/${bibNumber}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      notification.success({
        message: 'Success',
        description: 'Book deleted successfully!'
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete book: ' + error.message
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="bibNumber"
        label="Bibliographic Number"
        rules={[{ required: true, type: 'number', min: 1, message: 'Please input a valid bibliographic number!' }]}
      >
        <InputNumber placeholder="Enter Bib Number" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Delete Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteBook;
