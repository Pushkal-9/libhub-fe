import React from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './forms.css';

const NormalLoginForm = () => {
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', values);
      console.log('Login successful:', response.data);
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });

      // You may want to do something with the response data here,
      // like storing user details in local storage or context for further use.
    } catch (error) {
      console.error('Login failed:', error);
      notification.error({
        message: 'Login Failed',
        description: error.response.data.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <div className="form-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="form-forgot-password" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a className="form-register-now" href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;