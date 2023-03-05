import React, { useEffect, useState } from 'react';
import { useAuth } from 'context/Authentication';
import { useRouter } from 'next/router';
import { Button, Form, Input, message } from 'antd';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: 'url(\'/images/hotel-lobby.jpeg\')',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
export default function Login() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.access_id > 0) {
      router.push('/');
    }
  }, [router, user]);

  const onFinish = async (values: any) => {
    try {
      await login?.(values);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={styles}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '50px', borderRadius: 25 }}
        initialValues={{ username: 'admin', password: 'admin' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={loading}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
