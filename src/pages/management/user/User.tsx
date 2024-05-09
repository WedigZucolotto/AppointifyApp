import { ChangeEvent, useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header } from '../util'
import { UsersData, UsersFilter, useTryCatch, useUsers } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { ConfirmationModal, TableItem, UserModal } from '../../../components'

export const User = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [users, setUsers] = useState<UsersData[]>([])

  const { id = '' } = useParams()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllUsers, deleteUser } = useUsers()

  useEffect(() => {
    fetchUsers({ companyId: id })
  }, [])

  const fetchUsers = (filter: UsersFilter) =>
    getAndSet(getAllUsers(filter), setUsers)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target
    fetchUsers({ [name]: value, companyId: id })
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const handleDelete = async () => {
    await fetchWithMessage(deleteUser(modal.id), 'Deletado com sucesso!')
    fetchUsers({ companyId: id })
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
          placeholder="Nome"
          onChange={handleChange}
        />
        <select name="type" onChange={handleChange}>
          {userTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <button
          style={{ margin: '20px 0' }}
          onClick={() => changeModal('edit')}
        >
          Novo Usuário
        </button>
      </div>
      {usersTable.map((user, index) => (
        <TableItem
          handleEdit={() => changeModal('edit', user.id)}
          handleDelete={() => changeModal('delete', user.id)}
          showBorder={index === users.length}
          showDeleteBtn={index !== 0}
          showEditBtn={index !== 0}
        >
          <span style={{ width: '100px' }}>{user.name}</span>
          <span style={{ width: '200px' }}>{user.completeName}</span>
          <span style={{ width: '100px' }}>{user.type}</span>
          <span style={{ width: '200px' }}>{user.companyName}</span>
        </TableItem>
      ))}
      <UserModal
        open={modal.type === 'edit'}
        fetchUsers={fetchUsers}
        changeModal={changeModal}
        id={modal.id}
        companyId={id}
      />
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </ManagementLayout>
  )
}
