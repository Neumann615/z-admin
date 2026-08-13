import type { DictData, DictType, PageParam } from '@zealous-admin/layout/index'
import { PlusOutlined } from '@ant-design/icons'
import { useAppMessage } from '@zealous-admin/layout/index'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
} from 'antd'
import { createStyles } from 'antd-style'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  dictDataCreateAPI,
  dictDataDeleteByIdAPI,
  dictDataUpdateByIdAPI,
  dictTypeCreateAPI,
  dictTypeDeleteByIdAPI,
  dictTypeUpdateByIdAPI,
  getDictDataListAPI,
  getDictTypeAllAPI,
  getDictTypeListAPI,
} from '@/apis/dict'

// ============================================================
// 样式
// ============================================================
const useStyles = createStyles(({ token, css }) => ({
  toolbar: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${token.marginMD}px;
    flex-wrap: wrap;
    gap: ${token.marginSM}px;
  `,
  tableWrapper: css`
    .ant-table-thead > tr > th {
      background: ${token.colorFillAlter};
      font-weight: 600;
    }
  `,
}))

// ============================================================
// 表单校验规则
// ============================================================
const TYPE_FORM_RULES = {
  name: [
    { required: true, message: '请输入字典名称' },
    { max: 100, message: '字典名称不能超过 100 个字符' },
  ],
  dictType: [
    { required: true, message: '请输入类型编码' },
    { max: 100, message: '类型编码不能超过 100 个字符' },
    { pattern: /^\w+$/, message: '类型编码只能包含字母、数字和下划线' },
  ],
}

const DATA_FORM_RULES = {
  dictLabel: [
    { required: true, message: '请输入字典标签' },
    { max: 100, message: '字典标签不能超过 100 个字符' },
  ],
  dictValue: [
    { required: true, message: '请输入字典值' },
    { max: 100, message: '字典值不能超过 100 个字符' },
  ],
}

// ============================================================
// 字典类型管理
// ============================================================
function DictTypePane() {
  const { message, modal } = useAppMessage()
  const { styles } = useStyles()
  const [form] = Form.useForm()

  const [listQuery, setListQuery] = useState<PageParam>({ pageNum: 1, pageSize: 10, keyword: '' })
  const [list, setList] = useState<DictType[]>([])
  const [total, setTotal] = useState(0)
  const [listLoading, setListLoading] = useState(true)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState<number>()

  const getList = async () => {
    setListLoading(true)
    try {
      const res = await getDictTypeListAPI(listQuery)
      setList(res.data.list)
      setTotal(res.data.total)
    }
    catch { /* ignore */ }
    finally { setListLoading(false) }
  }

  useEffect(() => {
    getList()
  }, [listQuery])

  const handleAdd = () => {
    setIsEdit(false)
    setEditId(undefined)
    form.resetFields()
    form.setFieldsValue({ status: 1 })
    setDialogOpen(true)
  }

  const handleUpdate = (row: DictType) => {
    setIsEdit(true)
    setEditId(row.id)
    form.setFieldsValue(row)
    setDialogOpen(true)
  }

  const handleDelete = (row: DictType) => {
    modal.confirm({
      title: '提示',
      content: '是否要删除该字典类型?',
      onOk: async () => {
        await dictTypeDeleteByIdAPI(row.id!)
        message.success('删除成功!')
        getList()
      },
    })
  }

  const handleConfirm = async () => {
    const values = await form.validateFields()
    modal.confirm({
      title: '提示',
      content: '是否要确认?',
      onOk: async () => {
        if (isEdit) {
          await dictTypeUpdateByIdAPI(editId!, values)
          message.success('修改成功！')
        }
        else {
          await dictTypeCreateAPI(values)
          message.success('添加成功！')
        }
        setDialogOpen(false)
        getList()
      },
    })
  }

  const handleSearch = () => {
    setListQuery(prev => ({ ...prev, pageNum: 1 }))
  }

  const handleReset = () => {
    setListQuery({ pageNum: 1, pageSize: 10, keyword: '' })
  }

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 80, align: 'center' as const },
    { title: '字典名称', dataIndex: 'name', key: 'name', align: 'center' as const },
    { title: '类型编码', dataIndex: 'dictType', key: 'dictType', align: 'center' as const },
    { title: '备注', dataIndex: 'remark', key: 'remark', align: 'center' as const },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      align: 'center' as const,
      render: (v: string) => v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : 'N/A',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (status: number) => <Switch checked={status === 1} disabled />,
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      align: 'center' as const,
      render: (_: any, row: DictType) => (
        <Space size="small">
          <Button type="link" onClick={() => handleUpdate(row)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(row)}>删除</Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className={styles.toolbar}>
        <Space wrap>
          <Input
            value={listQuery.keyword}
            onChange={e => setListQuery({ ...listQuery, keyword: e.target.value })}
            onPressEnter={handleSearch}
            placeholder="字典名称/类型编码"
            style={{ width: 220 }}
            allowClear
            onClear={() => setListQuery({ ...listQuery, keyword: '', pageNum: 1 })}
          />
          <Button type="primary" onClick={handleSearch}>查询</Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table
          columns={columns}
          dataSource={list}
          loading={listLoading}
          pagination={{
            current: listQuery.pageNum,
            pageSize: listQuery.pageSize,
            total,
            pageSizeOptions: ['5', '10', '15'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
          }}
          onChange={pagi => setListQuery({ ...listQuery, pageNum: pagi.current || 1, pageSize: pagi.pageSize || 10 })}
          rowKey="id"
        />
      </div>

      <Modal
        title={isEdit ? '编辑字典类型' : '添加字典类型'}
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onOk={handleConfirm}
        width={560}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          preserve={false}
        >
          <Form.Item label="字典名称" name="name" rules={TYPE_FORM_RULES.name}>
            <Input allowClear />
          </Form.Item>
          <Form.Item label="类型编码" name="dictType" rules={TYPE_FORM_RULES.dictType}>
            <Input allowClear disabled={isEdit} />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="是否启用" name="status">
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

// ============================================================
// 字典数据管理
// ============================================================
function DictDataPane() {
  const { message, modal } = useAppMessage()
  const { styles } = useStyles()
  const [form] = Form.useForm()

  const [typeList, setTypeList] = useState<DictType[]>([])
  const [selectedType, setSelectedType] = useState<string>()
  const [listQuery, setListQuery] = useState<PageParam>({ pageNum: 1, pageSize: 10 })
  const [list, setList] = useState<DictData[]>([])
  const [total, setTotal] = useState(0)
  const [listLoading, setListLoading] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState<number>()

  useEffect(() => {
    getDictTypeAllAPI().then(res => setTypeList(res.data)).catch(() => {})
  }, [])

  const getList = async () => {
    if (!selectedType) {
      setList([])
      setTotal(0)
      return
    }
    setListLoading(true)
    try {
      const res = await getDictDataListAPI({ ...listQuery, dictType: selectedType })
      setList(res.data.list)
      setTotal(res.data.total)
    }
    catch { /* ignore */ }
    finally { setListLoading(false) }
  }

  useEffect(() => {
    getList()
  }, [listQuery, selectedType])

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    setListQuery(prev => ({ ...prev, pageNum: 1 }))
  }

  const handleAdd = () => {
    if (!selectedType) {
      message.warning('请先选择字典类型')
      return
    }
    setIsEdit(false)
    setEditId(undefined)
    form.resetFields()
    form.setFieldsValue({ dictType: selectedType, dictSort: 0, status: 1 })
    setDialogOpen(true)
  }

  const handleUpdate = (row: DictData) => {
    setIsEdit(true)
    setEditId(row.id)
    form.setFieldsValue(row)
    setDialogOpen(true)
  }

  const handleDelete = (row: DictData) => {
    modal.confirm({
      title: '提示',
      content: '是否要删除该字典数据?',
      onOk: async () => {
        await dictDataDeleteByIdAPI(row.id!)
        message.success('删除成功!')
        getList()
      },
    })
  }

  const handleConfirm = async () => {
    const values = await form.validateFields()
    modal.confirm({
      title: '提示',
      content: '是否要确认?',
      onOk: async () => {
        if (isEdit) {
          await dictDataUpdateByIdAPI(editId!, values)
          message.success('修改成功！')
        }
        else {
          await dictDataCreateAPI(values)
          message.success('添加成功！')
        }
        setDialogOpen(false)
        getList()
      },
    })
  }

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 80, align: 'center' as const },
    { title: '字典标签', dataIndex: 'dictLabel', key: 'dictLabel', align: 'center' as const },
    { title: '字典值', dataIndex: 'dictValue', key: 'dictValue', align: 'center' as const },
    { title: '排序', dataIndex: 'dictSort', key: 'dictSort', width: 80, align: 'center' as const },
    {
      title: '是否启用',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (status: number) => <Switch checked={status === 1} disabled />,
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      align: 'center' as const,
      render: (_: any, row: DictData) => (
        <Space size="small">
          <Button type="link" onClick={() => handleUpdate(row)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(row)}>删除</Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className={styles.toolbar}>
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          placeholder="请选择字典类型"
          style={{ width: 220 }}
          allowClear
        >
          {typeList.map(t => (
            <Select.Option key={t.dictType} value={t.dictType}>{t.name}</Select.Option>
          ))}
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table
          columns={columns}
          dataSource={list}
          loading={listLoading}
          pagination={{
            current: listQuery.pageNum,
            pageSize: listQuery.pageSize,
            total,
            pageSizeOptions: ['5', '10', '15'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
          }}
          onChange={pagi => setListQuery({ ...listQuery, pageNum: pagi.current || 1, pageSize: pagi.pageSize || 10 })}
          rowKey="id"
        />
      </div>

      <Modal
        title={isEdit ? '编辑字典数据' : '添加字典数据'}
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onOk={handleConfirm}
        width={560}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          preserve={false}
        >
          <Form.Item label="字典类型" name="dictType">
            <Input disabled />
          </Form.Item>
          <Form.Item label="字典标签" name="dictLabel" rules={DATA_FORM_RULES.dictLabel}>
            <Input allowClear />
          </Form.Item>
          <Form.Item label="字典值" name="dictValue" rules={DATA_FORM_RULES.dictValue}>
            <Input allowClear />
          </Form.Item>
          <Form.Item label="排序" name="dictSort">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="是否启用" name="status">
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

// ============================================================
// 字典管理主页
// ============================================================
export default function SystemDict() {
  return (
    <div className="app-container">
      <Card>
        <Tabs
          defaultActiveKey="type"
          items={[
            { key: 'type', label: '字典类型', children: <DictTypePane /> },
            { key: 'data', label: '字典数据', children: <DictDataPane /> },
          ]}
        />
      </Card>
    </div>
  )
}
