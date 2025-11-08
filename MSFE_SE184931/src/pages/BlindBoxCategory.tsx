import { useEffect, useState } from 'react'
import { Card, Typography, Table, message, Button, Modal, Form, Input, Space, Popconfirm, Empty, Spin } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import type { BlindBoxCategory, BlindBoxCategoryRequest } from '../types/blindBoxCategory'
import { getAllBlindBoxCategories, createBlindBoxCategory, updateBlindBoxCategory, deleteBlindBoxCategory } from '../services/blindBoxCategory.service'

const { Title, Text } = Typography

interface CategoryModalProps {
  open: boolean
  onCancel: () => void
  onSubmit: (data: BlindBoxCategoryRequest) => Promise<void>
  initialValues?: BlindBoxCategory
  title: string
}

function CategoryModal({ open, onCancel, onSubmit, initialValues, title }: CategoryModalProps) {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues)
      } else {
        form.resetFields()
      }
    }
  }, [open, initialValues, form])

  async function handleSubmit() {
    try {
      setSubmitting(true)
      const values = await form.validateFields()
      await onSubmit(values)
      form.resetFields()
      onCancel()
    } catch (err: any) {
      if (err.errorFields) return
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      title={<span className="text-lg font-semibold">{title}</span>}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={submitting}
      destroyOnHidden
      okText={initialValues ? "Update" : "Create"}
      cancelText="Cancel"
      className="rounded-xl"
      width={520}
    >
      <Form form={form} layout="vertical" initialValues={initialValues} className="pt-4">
        <Form.Item name="name" label={<span className="font-medium text-gray-700">Name</span>} rules={[{ required: true }]}>
          <Input 
            prefix={<AppstoreOutlined className="text-gray-400" />}
            placeholder="Enter category name"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="description" label={<span className="font-medium text-gray-700">Description</span>}>
          <Input.TextArea 
            rows={3}
            placeholder="Enter description (optional)"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="rarityLevel" label={<span className="font-medium text-gray-700">Rarity Level</span>} rules={[{ required: true }]}>
          <Input 
            placeholder="e.g., Common, Rare, Epic"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="priceRange" label={<span className="font-medium text-gray-700">Price Range</span>} rules={[{ required: true }]}>
          <Input 
            prefix={<FileTextOutlined className="text-gray-400" />}
            placeholder="e.g., $10-$50"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default function BlindBoxCategoryPage() {
  const [categories, setCategories] = useState<BlindBoxCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editing, setEditing] = useState<BlindBoxCategory | undefined>()

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await getAllBlindBoxCategories()
      setCategories(data)
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data: BlindBoxCategoryRequest) {
    try {
      await createBlindBoxCategory(data)
      message.success('Category created')
      loadCategories()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to create category')
      throw err
    }
  }

  async function handleUpdate(data: BlindBoxCategoryRequest) {
    if (!editing?.id) return
    try {
      await updateBlindBoxCategory(editing.id, data)
      message.success('Category updated')
      loadCategories()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to update category')
      throw err
    }
  }

  async function handleDelete(category: BlindBoxCategory) {
    try {
      await deleteBlindBoxCategory(category.id)
      message.success('Category deleted')
      loadCategories()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to delete category')
    }
  }

  function showEdit(cat: BlindBoxCategory) {
    setEditing(cat)
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
    setEditing(undefined)
  }

  const columns = [
    { 
      title: '#', 
      key: 'index', 
      width: 70,
      align: 'center' as const,
      render: (_: any, __: any, i: number) => (
        <span className="font-medium text-gray-600">{i + 1}</span>
      )
    },
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string) => <span className="font-medium text-gray-800">{text}</span>
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Rarity Level', dataIndex: 'rarityLevel', key: 'rarityLevel' },
    { title: 'Price Range', dataIndex: 'priceRange', key: 'priceRange' },
    {
      title: 'Actions', 
      key: 'actions', 
      width: 180,
      align: 'center' as const,
      render: (_: any, record: BlindBoxCategory) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showEdit(record)}
            className="!text-blue-600 hover:!text-blue-700"
          >
            Edit
          </Button>
          <Popconfirm 
            title={<span className="font-medium">Delete category</span>}
            description="Delete this category?" 
            onConfirm={() => handleDelete(record)} 
            okText="Yes" 
            cancelText="No"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              className="hover:!text-red-600"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border-0" bodyStyle={{ padding: '24px' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="!mb-1 !text-gray-800">Blind Box Categories</Title>
          <Text className="text-gray-500">Organize your blind boxes by category</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => { setEditing(undefined); setModalVisible(true) }}
          size="large"
          className="!rounded-lg !h-10 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
        >
          Add Category
        </Button>
      </div>

      <Table 
        dataSource={categories} 
        columns={columns} 
        rowKey="id" 
        loading={{
          spinning: loading,
          indicator: <Spin size="large" />,
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span className="text-gray-500">No categories yet. Click "Add Category" to create one!</span>}
            />
          ),
        }}
        className="rounded-lg overflow-hidden"
        pagination={{ 
          defaultPageSize: 10, 
          showSizeChanger: true, 
          showTotal: (total: number) => (
            <span className="text-gray-600 font-medium">Total {total} {total === 1 ? 'category' : 'categories'}</span>
          ),
          className: "!mb-0"
        }}
        rowClassName="hover:bg-blue-50 transition-colors"
      />

      <CategoryModal open={modalVisible} onCancel={closeModal} onSubmit={editing ? handleUpdate : handleCreate} initialValues={editing} title={editing ? 'Edit Category' : 'Add New Category'} />
    </Card>
  )
}
