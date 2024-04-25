import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, notification } from 'antd';
import api from '../api';

const AddBook = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await api.post('/books', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      notification.success({
        message: 'Success',
        description: 'Book added successfully!'
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add book: ' + error.message
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="publicationYear" label="Publication Year" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBook;