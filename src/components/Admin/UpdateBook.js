import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber, notification } from 'antd';

const UpdateBook = () => {
const [bibNumber, setBibNumber] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.put(`http://localhost:8080/books/${bibNumber}`, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      notification.success({
        message: 'Success',
        description: 'Book updated successfully!'
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update book: ' + error.message
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
          Update Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateBook;