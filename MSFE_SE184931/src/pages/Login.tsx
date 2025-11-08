import { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Space } from 'antd'
import { UserOutlined, LockOutlined, CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { login as accountLogin } from '../services/account.service'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const TOKEN_KEY = 'token'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY))

  async function onFinish(values: { username: string; password: string }) {
    const { username, password } = values
    setLoading(true)
    try {
      const receivedToken = await accountLogin(username, password)
      message.success('Login successful')
      setToken(receivedToken)
      navigate('/blind-box')
    } catch (err: any) {
      message.error("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    message.info('Logged out')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4">
            <span className="text-3xl">🎁</span>
          </div>
          <Title level={2} className="!mb-2 !text-gray-800">Blind Box Management</Title>
          <Text className="text-gray-500">Welcome back! Please login to continue</Text>
        </div>

        <Card 
          className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border-0"
          style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          {token ? (
            <Space direction="vertical" className="w-full" size="large">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircleOutlined className="text-green-600 text-xl" />
                <Text className="text-green-700 font-medium">Successfully authenticated!</Text>
              </div>
              
              <div>
                <Text className="text-gray-600 text-sm block mb-2">Access Token:</Text>
                <Card 
                  size="small" 
                  className="break-all bg-gray-50 border-gray-200"
                  style={{ maxHeight: '120px', overflowY: 'auto' }}
                >
                  <Text copyable className="text-xs font-mono">{token}</Text>
                </Card>
              </div>

              <Button 
                danger 
                onClick={handleLogout}
                icon={<LogoutOutlined />}
                size="large"
                block
                className="!h-12 !rounded-lg"
              >
                Logout
              </Button>
            </Space>
          ) : (
            <>
              <Title level={3} className="!text-center !mb-6 !text-gray-800">Sign In</Title>
              
              <Form layout="vertical" onFinish={onFinish} className="w-full" size="large">
                <Form.Item 
                  name="username" 
                  label={<span className="text-gray-700 font-medium">Username</span>}
                  rules={[{ required: true, message: 'Please input your username' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="!rounded-lg !h-12"
                  />
                </Form.Item>

                <Form.Item 
                  name="password" 
                  label={<span className="text-gray-700 font-medium">Password</span>}
                  rules={[{ required: true, message: 'Please input your password' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="!rounded-lg !h-12"
                  />
                </Form.Item>

                <Form.Item className="!mb-0 !mt-6">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading} 
                    block
                    className="!h-12 !rounded-lg !text-base !font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Card>

        <div className="text-center mt-6">
          <Text className="text-gray-500 text-sm">© 2025 Blind Box Management System</Text>
        </div>
      </div>
    </div>
  )
}
