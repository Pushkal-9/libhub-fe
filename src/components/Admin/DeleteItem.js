import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import api from '../api';

const DeleteItem = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { itemBarcode } = values;
    try {
      await api.delete(`/items/${itemBarcode}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      notification.success({
        message: 'Success',
        description: 'Item deleted successfully!'
      });
      form.resetFields(); // Reset form fields after submission to allow another deletion
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete item: ' + error.message
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="itemBarcode"
        label="Item Barcode"
        rules={[{ required: true, message: 'Please input the item barcode to delete!' }]}
      >
        <Input placeholder="Enter Item Barcode" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Delete Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteItem;
