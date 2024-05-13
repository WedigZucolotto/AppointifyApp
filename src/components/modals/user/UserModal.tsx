import { FieldValues, useForm } from 'react-hook-form'
import {
  useTryCatch,
  useUsers,
  CreateUserRequest,
  UsersFilter,
  UpdateUserRequest,
  UserData
} from '../../../hooks'
import { useEffect } from 'react'
import { ModalTypes } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getSchema } from './schemas'

interface UserModalProps {
  open: boolean
  companyId: string
  fetchUsers: (filter: UsersFilter) => void
  changeModal: (type: ModalTypes) => void
  id: string
}

interface FormData {
  name?: string
  password?: string
  completeName?: string
  isOwner?: string
}

export const UserModal = ({
  open,
  companyId,
  fetchUsers,
  changeModal,
  id = ''
}: UserModalProps) => {
  const isEdit = !!id

  const { callApi, fetchWithMessage } = useTryCatch()
  const { createUser, updateUser, getUserById } = useUsers()

  useEffect(() => {
    if (isEdit) {
      fetchUser()
    }
    return () => resetFields()
  }, [open])

  const resetFields = (user?: UserData) =>
    reset({
      name: user?.name ?? '',
      completeName: user?.completeName ?? '',
      password: '',
      isOwner: user?.isOwner ? 'true' : 'false'
    })

  const fetchUser = async () => {
    const { data, success } = await callApi(getUserById(id))

    if (data && success) {
      resetFields(data)
    }
  }

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit))
  })

  const handleNewUser = async (values: FieldValues) => {
    await fetchWithMessage(
      createUser({
        ...values,
        companyId,
        isOwner: values.isOwner === 'true'
      } as CreateUserRequest),
      'Criado com sucesso!'
    )
    fetchUsers({ companyId })
    changeModal('closed')
  }

  const handleUpdateUser = async (values: FieldValues) => {
    await fetchWithMessage(
      updateUser(id, {
        ...values,
        companyId,
        isOwner: values.isOwner === 'true'
      } as UpdateUserRequest),
      'Editado com sucesso!'
    )
    fetchUsers({ companyId })
    changeModal('closed')
  }

  return (
    <ManagementModal open={open}>
      <form onSubmit={handleSubmit(isEdit ? handleUpdateUser : handleNewUser)}>
        <label>Username</label>
        <input type="text" placeholder="Nome" {...register('name')} />
        <label>Senha</label>
        <input type="password" placeholder="Senha" {...register('password')} />
        <label>Nome Completo</label>
        <input type="text" placeholder="Nome" {...register('completeName')} />
        <label>Proprietário?</label>
        <div style={{ display: 'flex', width: '50%' }}>
          <label>Sim</label>
          <input
            type="radio"
            value="true"
            style={{ alignSelf: 'center', marginBottom: 0 }}
            {...register('isOwner')}
          />
          <label>Não</label>
          <input
            type="radio"
            value="false"
            style={{ alignSelf: 'center', marginBottom: 0 }}
            {...register('isOwner')}
          />
        </div>
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </form>
    </ManagementModal>
  )
}
