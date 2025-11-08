import { useEffect, useState } from 'react'
import { Card, Typography, Table, message, Button, Modal, Form, Input, Space, Popconfirm, Empty, Spin } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined, TagOutlined } from '@ant-design/icons'
import type { Brand, BrandRequest } from '../types/brand'
import { getAllBrands, createBrand, updateBrand, deleteBrand } from '../services/brand.service'

const { Title, Text } = Typography

interface BrandModalProps {
  open: boolean
  onCancel: () => void
  onSubmit: (data: BrandRequest) => Promise<void>
  initialValues?: Brand
  title: string
}

function BrandModal({ open, onCancel, onSubmit, initialValues, title }: BrandModalProps) {
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
        <Form.Item
          name="name"
          label={<span className="font-medium text-gray-700">Brand Name</span>}
          rules={[{ required: true, message: 'Please enter brand name' }]}
        >
          <Input 
            prefix={<TagOutlined className="text-gray-400" />}
            placeholder="Enter brand name"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="countryOfOrigin"
          label={<span className="font-medium text-gray-700">Country of Origin</span>}
          rules={[{ required: true, message: 'Please enter country of origin' }]}
        >
          <Input 
            prefix={<GlobalOutlined className="text-gray-400" />}
            placeholder="Enter country of origin"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default function Brand() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | undefined>()

  useEffect(() => {
    loadBrands()
  }, [])

  async function loadBrands() {
    try {
      const data = await getAllBrands()
      setBrands(data)
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateBrand(data: BrandRequest) {
    try {
      await createBrand(data)
      message.success('Brand created successfully')
      loadBrands()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to create brand')
      throw err
    }
  }

  async function handleUpdateBrand(data: BrandRequest) {
    if (!editingBrand?.id) return
    try {
      await updateBrand(String(editingBrand.id), data)
      message.success('Brand updated successfully')
      loadBrands()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to update brand')
      throw err
    }
  }

  async function handleDeleteBrand(brand: Brand) {
    try {
      await deleteBrand(String(brand.id))
      message.success('Brand deleted successfully')
      loadBrands()
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (serverMessage) message.error(serverMessage)
      else message.error('Failed to delete brand')
    }
  }

  function showEditModal(brand: Brand) {
    setEditingBrand(brand)
    setModalVisible(true)
  }

  function handleCloseModal() {
    setModalVisible(false)
    setEditingBrand(undefined)
  }

      const columns = [
    {
      title: '#',
      key: 'index',
      width: 70,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: 'Country of Origin',
      dataIndex: 'countryOfOrigin',
      key: 'countryOfOrigin',
      render: (text: string) => (
        <Space>
          <GlobalOutlined className="text-blue-500" />
          <span className="text-gray-700">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      align: 'center' as const,
      render: (_: any, record: Brand) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="!text-blue-600 hover:!text-blue-700"
          >
            Edit
          </Button>
          <Popconfirm
            title={<span className="font-medium">Delete brand</span>}
            description="Are you sure you want to delete this brand?"
            onConfirm={() => handleDeleteBrand(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} className="hover:!text-red-600">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card 
      className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border-0"
      bodyStyle={{ padding: '24px' }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="!mb-1 !text-gray-800">Brand Management</Title>
          <Text className="text-gray-500">Manage your brand collection</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingBrand(undefined)
            setModalVisible(true)
          }}
          size="large"
          className="!rounded-lg !h-10 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
        >
          Add Brand
        </Button>
      </div>

      <Table
        dataSource={brands}
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
              description={<span className="text-gray-500">No brands yet. Click "Add Brand" to create one!</span>}
            />
          ),
        }}
        className="rounded-lg overflow-hidden"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => (
            <span className="text-gray-600 font-medium">Total {total} {total === 1 ? 'brand' : 'brands'}</span>
          ),
          className: "!mb-0",
        }}
        rowClassName="hover:bg-blue-50 transition-colors"
      />

      <BrandModal
        open={modalVisible}
        onCancel={handleCloseModal}
        onSubmit={editingBrand ? handleUpdateBrand : handleCreateBrand}
        initialValues={editingBrand}
        title={editingBrand ? 'Edit Brand' : 'Add New Brand'}
      />
    </Card>
  )
}
