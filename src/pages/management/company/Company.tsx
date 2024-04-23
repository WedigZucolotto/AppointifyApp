import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import {
  ConfirmationModal,
  TableItem,
  Visible,
  CompanyModal
} from '../../../components'
import { CompaniesData, useCompanies, useTryCatch } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { ModalData, ModalTypes, header } from '../util'

type Pages = 'users' | 'services' | 'events'

export const Company = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [companies, setCompanies] = useState<CompaniesData[]>([])

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllCompanies, deleteCompany } = useCompanies()

  const navigate = useNavigate()

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = () => getAndSet(getAllCompanies(), setCompanies)

  const handleNavigate = (id: string, page: Pages) =>
    navigate(`/management/companies/${id}/${page}`)

  const handleDelete = async () => {
    await fetchWithMessage(deleteCompany(modal.id), 'Deletado com sucesso!')
    fetchCompanies()
    changeModal('closed')
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  return (
    <ManagementLayout>
      <h2>Empresas</h2>
      <button style={{ margin: '20px 0' }} onClick={() => changeModal('edit')}>
        Nova empresa
      </button>
      {[header.companies, ...companies].map((company, index) => (
        <TableItem
          handleEdit={() => changeModal('edit', company.id)}
          handleDelete={() => changeModal('delete', company.id)}
          isLastItem={index === companies.length}
          showBtns={index !== 0}
        >
          <span style={{ width: '150px' }}>{company.name}</span>
          <span style={{ width: '100px' }}>{company.planName}</span>
          <span style={{ width: '80px' }}>{company.open}</span>
          <span style={{ width: '80px' }}>{company.close}</span>
          <Visible when={index !== 0}>
            <button onClick={() => handleNavigate(company.id, 'users')}>
              Usuários
            </button>
            <button onClick={() => handleNavigate(company.id, 'services')}>
              Serviços
            </button>
            <button onClick={() => handleNavigate(company.id, 'events')}>
              Eventos
            </button>
          </Visible>
        </TableItem>
      ))}
      <CompanyModal
        open={modal.type === 'edit'}
        fetchCompanies={fetchCompanies}
        changeModal={changeModal}
        id={modal.id}
      />
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </ManagementLayout>
  )
}
