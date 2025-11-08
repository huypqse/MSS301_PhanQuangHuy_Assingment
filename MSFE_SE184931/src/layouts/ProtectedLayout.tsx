import { Layout } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'

const { Content } = Layout

const TOKEN_KEY = 'token'

export default function ProtectedLayout() {
  const token = localStorage.getItem(TOKEN_KEY)
  
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="bg-gradient-to-br from-gray-50 to-blue-50! p-8!">
        <div className="container mx-auto max-w-7xl">
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}