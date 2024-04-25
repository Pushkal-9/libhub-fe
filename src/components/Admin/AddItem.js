import React from 'react';
import { Form, Input, Button, notification, InputNumber } from 'antd';
import api from '../api';

const AddItem = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await api.post('/items', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      notification.success({
        message: 'Success',
        description: 'Item added successfully!'
      });
      form.resetFields(); // Reset form fields after submission
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add item: ' + error.message
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="itemBarcode"
        label="Item Barcode"
        rules={[{ required: true, message: 'Please input the item barcode!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['book', 'bibNumber']}
        label="Bibliographic Number"
        rules={[{ required: true, type: 'number', min: 1, message: 'Please input a valid bibliographic number!' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={['book', 'title']}
        label="Title"
        rules={[{ required: true, message: 'Please input the title of the book!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['book', 'author']}
        label="Author"
        rules={[{ required: true, message: 'Please input the author!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['book', 'publisher']}
        label="Publisher"
        rules={[{ required: true, message: 'Please input the publisher!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['book', 'publicationYear']}
        label="Publication Year"
        rules={[{ required: true, type: 'number', min: 0, message: 'Please input a valid publication year!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="callNumber"
        label="Call Number"
        rules={[{ required: true, message: 'Please input the call number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please input the status of the item!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddItem;
