import { ChangeEvent, useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header } from '../util'
import { UsersData, UsersFilter, useTryCatch, useUsers } from '../../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ConfirmationModal,
  TableItem,
  UserModal,
  Visible
} from '../../../components'

export const UserManagement = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [users, setUsers] = useState<UsersData[]>([])

  const { companyId = '' } = useParams()
  const navigate = useNavigate()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllUsers, deleteUser } = useUsers()

  useEffect(() => {
    fetchUsers({ companyId })
  }, [])

  const fetchUsers = (filter: UsersFilter) =>
    getAndSet(getAllUsers(filter), setUsers)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target
    fetchUsers({ [name]: value, companyId })
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const handleDelete = async () => {
    await fetchWithMessage(deleteUser(modal.id), 'Deletado com sucesso!')
    fetchUsers({ companyId })
    changeModal('closed')
  }

  const usersTable = [header.users, ...users]
  const userTypes = ['Tipos', 'Owner', 'Employee']

  return (
    <ManagementLayout>
      <h2>Usuários</h2>
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
        />
        <input
          type="text"
          name="completeName"
          placeholder="Nome Completo"
          onChange={handleChange}
        />
        <select name="type" onChange={handleChange}>
          {userTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <button onClick={() => changeModal('edit')}>Novo Usuário</button>
      </div>
      <div className="table">
        {usersTable.map((user, index) => (
          <TableItem
            handleEdit={() => changeModal('edit', user.id)}
            handleDelete={() => changeModal('delete', user.id)}
            showDeleteBtn={index !== 0}
            showEditBtn={index !== 0}
          >
            <span style={{ width: '100px' }}>{user.name}</span>
            <span style={{ width: '200px' }}>{user.completeName}</span>
            <span style={{ width: '100px' }}>{user.type}</span>
            <span style={{ width: '200px' }}>{user.companyName}</span>
            <Visible when={index !== 0}>
              <button onClick={() => navigate(`${user.id}/events`)}>
                Eventos
              </button>
            </Visible>
          </TableItem>
        ))}
      </div>
      <Visible when={users.length === 0}>
        <span className="notFound">Nenhum registro encontrado.</span>
      </Visible>
      <UserModal
        open={modal.type === 'edit'}
        fetchUsers={fetchUsers}
        changeModal={changeModal}
        id={modal.id}
        companyId={companyId}
      />
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </ManagementLayout>
  )
}
