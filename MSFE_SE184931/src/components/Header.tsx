import { Layout, Menu, Button, message, Typography } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined, AppstoreOutlined, GiftOutlined, TagsOutlined } from '@ant-design/icons'
import { clearAuthToken } from '../services/api.service'

const { Header: AntHeader } = Layout
const { Text } = Typography

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { 
      key: '/brand', 
      label: 'Brands',
      icon: <TagsOutlined />
    },
    { 
      key: '/blind-box', 
      label: 'Blind Boxes',
      icon: <GiftOutlined />
    },
    { 
      key: '/blind-box/category', 
      label: 'Categories',
      icon: <AppstoreOutlined />
    }
  ]

  function handleLogout() {
    clearAuthToken()
    message.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <AntHeader className="bg-white! shadow-md! px-8! w-full! sticky top-0 z-50">
      <div className="flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mr-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <span className="text-xl">🎁</span>
          </div>
          <div className="hidden md:block">
            <Text strong className="text-lg text-gray-800">Blind Box Manager</Text>
          </div>
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ 
            flex: 1, 
            minWidth: 0,
            border: 'none'
          }}
          className="!border-0"
        />

        {/* Logout Button */}
        <div className="ml-4">
          <Button 
            type="primary" 
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="!rounded-lg !h-10 shadow-sm hover:shadow-md transition-all"
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </AntHeader>
  )
}