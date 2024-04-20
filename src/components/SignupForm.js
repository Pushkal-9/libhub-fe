import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './forms.css';


const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: [],
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                username: formData.username,
                email: formData.email,
                role: [formData.role],  // Adjust according to your role requirements
                password: formData.password
            });
            notification.success({
                message: 'Signup Successful',
                description: 'You have successfully signed up!',
            });
        } catch (error) {
            notification.error({
                message: 'Signup Failed',
                description: error.response.data.message || 'An error occurred during signup.',
            });
        }
    };

    return (
        <div className="form-container signup-form-container">
            <h2 className="signup-title">Sign Up</h2>
            <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className="signup-input" name="username" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input name="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" className="signup-input" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your role!' }]}
                >
                    <Input name="role" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password name="password" prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className="signup-input" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}  // This tells Form.Item to rerender if password changes
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password name="confirmPassword" prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Confirm Password" className="signup-input" onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="signup-form-button signup-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupForm;
