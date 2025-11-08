import { useEffect, useState } from 'react'
import { Card, Typography, Table, message, Button, Modal, Form, Input, Space, Popconfirm, Select, InputNumber, Empty, Spin, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, GiftOutlined, TagsOutlined, DollarOutlined } from '@ant-design/icons'
import type { BlindBox, BlindBoxRequest } from '../types/blindBox'
import type { BlindBoxCategory } from '../types/blindBoxCategory'
import type { Brand } from '../types/brand'
import { getAllBlindBoxes, createBlindBox, updateBlindBox, deleteBlindBox } from '../services/blindBox.service'
import { getAllBlindBoxCategories } from '../services/blindBoxCategory.service'
import { getAllBrands } from '../services/brand.service'

const { Title, Text } = Typography

interface BlindBoxModalProps {
  open: boolean
  onCancel: () => void
  onSubmit: (data: BlindBoxRequest) => Promise<void>
  initialValues?: BlindBox
  title: string
  brands: Brand[]
  categories: BlindBoxCategory[]
}

function BlindBoxModal({ open, onCancel, onSubmit, initialValues, title, brands, categories }: BlindBoxModalProps) {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      if (initialValues) {
        // map initialValues to request shape
        form.setFieldsValue({
          name: initialValues.name,
          categoryId: initialValues.category?.id,
          brandId: initialValues.brandId,
          rarity: initialValues.rarity,
          price: initialValues.price,
          stock: initialValues.stock,
        })
      } else {
        form.resetFields()
      }
    }
  }, [open, initialValues, form])

  async function handleSubmit() {
    try {
      setSubmitting(true)
      const values = await form.validateFields()
      await onSubmit(values as BlindBoxRequest)
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
      width={600}
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item name="name" label={<span className="font-medium text-gray-700">Name</span>} rules={[{ required: true, message: 'Please enter name' }]}>
          <Input 
            prefix={<GiftOutlined className="text-gray-400" />}
            placeholder="Enter blind box name"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="categoryId" label={<span className="font-medium text-gray-700">Category</span>} rules={[{ required: true, message: 'Please select category' }]}>
          <Select 
            showSearch 
            options={categories.map(c => ({ label: c.name, value: c.id }))}
            placeholder="Select category"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="brandId" label={<span className="font-medium text-gray-700">Brand</span>} rules={[{ required: true, message: 'Please select brand' }]}>
          <Select 
            showSearch 
            options={brands.map(b => ({ label: b.name, value: b.id }))}
            placeholder="Select brand"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item name="rarity" label={<span className="font-medium text-gray-700">Rarity</span>} rules={[{ required: true, message: 'Please enter rarity' }]}>
          <Input 
            prefix={<TagsOutlined className="text-gray-400" />}
            placeholder="e.g., Common, Rare, Epic"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="price" label={<span className="font-medium text-gray-700">Price</span>} rules={[{ required: true, message: 'Please enter price' }]}>
            <InputNumber 
              prefix={<DollarOutlined className="text-gray-400" />}
              style={{ width: '100%' }} 
              min={0} 
              placeholder="0.00"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item name="stock" label={<span className="font-medium text-gray-700">Stock</span>} rules={[{ required: true, message: 'Please enter stock' }]}>
            <InputNumber 
              style={{ width: '100%' }} 
              min={0}
              placeholder="0"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default function BlindBoxPage() {
  const [items, setItems] = useState<BlindBox[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editing, setEditing] = useState<BlindBox | undefined>()

  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<BlindBoxCategory[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [bb, bs, cs] = await Promise.all([getAllBlindBoxes(), getAllBrands(), getAllBlindBoxCategories()])
      setItems(bb)
      setBrands(bs)
      setCategories(cs)
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data: BlindBoxRequest) {
    try {
      await createBlindBox(data)
      message.success('Blind box created')
      loadData()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to create blind box')
      throw err
    }
  }

  async function handleUpdate(data: BlindBoxRequest) {
    if (!editing?.id) return
    try {
      await updateBlindBox(editing.id, data)
      message.success('Blind box updated')
      loadData()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to update blind box')
      throw err
    }
  }

  async function handleDelete(item: BlindBox) {
    try {
      await deleteBlindBox(item.id)
      message.success('Blind box deleted')
      loadData()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to delete blind box')
    }
  }

  function showEdit(item: BlindBox) {
    setEditing(item)
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
    { 
      title: 'Category', 
      key: 'category', 
      render: (_: any, record: BlindBox) => record.category?.name || '-' 
    },
    { 
      title: 'Brand', 
      key: 'brand', 
      render: (_: any, record: BlindBox) => (brands.find((b: any) => b.id === record.brandId)?.name ?? '-') 
    },
    { 
      title: 'Rarity', 
      dataIndex: 'rarity', 
      key: 'rarity',
      render: (rarity: string) => (
        <Tag color={
          rarity.toLowerCase() === 'common' ? 'default' :
          rarity.toLowerCase() === 'rare' ? 'blue' :
          rarity.toLowerCase() === 'epic' ? 'purple' :
          rarity.toLowerCase() === 'legendary' ? 'gold' : 'default'
        }>
          {rarity}
        </Tag>
      )
    },
    { 
      title: 'Price', 
      dataIndex: 'price', 
      key: 'price',
      render: (price: number) => (
        <span className="font-semibold text-green-600">${price.toFixed(2)}</span>
      )
    },
    { 
      title: 'Stock', 
      dataIndex: 'stock', 
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'success' : stock > 0 ? 'warning' : 'error'}>
          {stock} in stock
        </Tag>
      )
    },
    {
      title: 'Actions', 
      key: 'actions', 
      width: 180,
      align: 'center' as const,
      render: (_: any, record: BlindBox) => (
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
            title={<span className="font-medium">Delete blind box</span>}
            description="Are you sure?" 
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
          <Title level={2} className="!mb-1 !text-gray-800">Blind Boxes</Title>
          <Text className="text-gray-500">Manage your blind box inventory</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => { setEditing(undefined); setModalVisible(true) }}
          size="large"
          className="!rounded-lg !h-10 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
        >
          Add Blind Box
        </Button>
      </div>

      <Table 
        dataSource={items} 
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
              description={<span className="text-gray-500">No blind boxes yet. Click "Add Blind Box" to create one!</span>}
            />
          ),
        }}
        className="rounded-lg overflow-hidden"
        pagination={{ 
          defaultPageSize: 10, 
          showSizeChanger: true, 
          showTotal: (total: number) => (
            <span className="text-gray-600 font-medium">Total {total} {total === 1 ? 'item' : 'items'}</span>
          ),
          className: "!mb-0"
        }}
        rowClassName="hover:bg-blue-50 transition-colors"
      />

      <BlindBoxModal open={modalVisible} onCancel={closeModal} onSubmit={editing ? handleUpdate : handleCreate} initialValues={editing} title={editing ? 'Edit Blind Box' : 'Add New Blind Box'} brands={brands} categories={categories} />
    </Card>
  )
}
