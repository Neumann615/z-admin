import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { loginAction, logoutAction } from '../../hooks/useAuth'
import { useT } from '../../hooks/useT'
import { useReLoginStore } from '../../store/reLogin'

const useStyles = createStyles(({ token }) => ({
  tip: {
    color: token.colorTextSecondary,
    fontSize: token.fontSize,
    marginBottom: 16,
  },
}))

export function ReLoginModal() {
  const { styles } = useStyles()
  const t = useT()
  const { visible, hide } = useReLoginStore()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      await loginAction({
        username: values.userName.trim(),
        password: values.password,
      })
      hide()
      location.reload()
    }
    catch {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    hide()
    logoutAction()
  }

  return (
    <Modal
      open={visible}
      title={t('reLogin.title')}
      okText={t('reLogin.okText')}
      cancelText={t('reLogin.cancelText')}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      closable={false}
      mask={{ closable: false }}
    >
      <div className={styles.tip}>{t('reLogin.tip')}</div>
      <Form form={form} autoComplete="off">
        <Form.Item
          name="userName"
          rules={[{ required: true, message: t('reLogin.usernameRequired') }]}
        >
          <Input
            placeholder={t('reLogin.username')}
            prefix={<UserOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('reLogin.passwordRequired') },
            { min: 3, message: t('reLogin.passwordMin') },
          ]}
        >
          <Input.Password
            placeholder={t('reLogin.password')}
            prefix={<LockOutlined />}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
