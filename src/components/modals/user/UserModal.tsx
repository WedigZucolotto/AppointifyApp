import { FieldValues, useForm } from 'react-hook-form'
import {
  useTryCatch,
  UserData,
  useUsers,
  CreateUserRequest,
  UsersFilter,
  UpdateUserRequest
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { ModalTypes } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDefaultValues, getSchema } from './schemas'

interface UserModalProps {
  open: boolean
  companyId: string
  fetchUsers: (filter: UsersFilter) => Promise<void>
  changeModal: (type: ModalTypes) => void
  id: string
}

interface FormData {
  name?: string
  password?: string
  completeName?: string
  isOwner?: boolean
}

export const UserModal = ({
  open,
  companyId,
  fetchUsers,
  changeModal,
  id = ''
}: UserModalProps) => {
  const isEdit = !!id

  const [user, setUser] = useState<UserData>()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { createUser, updateUser, getUserById } = useUsers()

  useEffect(() => {
    if (isEdit) {
      fetchUser()
    }
    return () => reset()
  }, [])

  const fetchUser = () => getAndSet(getUserById(id), setUser)

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit)),
    defaultValues: getDefaultValues(user)
  })

  const handleNewUser = async (values: FieldValues) => {
    await fetchWithMessage(
      createUser({ ...values, companyId } as CreateUserRequest),
      'Criado com sucesso!'
    )
    fetchUsers({ companyId })
    changeModal('closed')
  }

  const handleUpdateUser = async (values: FieldValues) => {
    await fetchWithMessage(
      updateUser(id, { ...values, companyId } as UpdateUserRequest),
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
