import { ChangeEvent, useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import {
  ConfirmationModal,
  TableItem,
  Visible,
  CompanyModal
} from '../../../components'
import {
  CompaniesData,
  useCompanies,
  usePlans,
  useTryCatch,
  Option,
  CompaniesFilter
} from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { ModalData, ModalTypes, header } from '../util'

type Pages = 'users' | 'services' | 'events'

export const Company = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [companies, setCompanies] = useState<CompaniesData[]>([])
  const [plans, setPlans] = useState<Option[]>([])

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllCompanies, deleteCompany } = useCompanies()
  const { getPlanOptions } = usePlans()

  const navigate = useNavigate()

  useEffect(() => {
    fetchCompanies({})
    getAndSet(getPlanOptions(), setPlans)
  }, [])

  const fetchCompanies = (filter: CompaniesFilter) =>
    getAndSet(getAllCompanies(filter), setCompanies)

  const handleNavigate = (id: string, page: Pages) =>
    navigate(`/management/companies/${id}/${page}`)

  const handleDelete = async () => {
    await fetchWithMessage(deleteCompany(modal.id), 'Deletado com sucesso!')
    fetchCompanies({})
    changeModal('closed')
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target
    fetchCompanies({ [name]: value })
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const planOptions = [{ name: 'Planos', value: '' }, ...plans]
  const companyTable = [header.companies, ...companies]

  return (
    <ManagementLayout>
      <h2>Empresas</h2>
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
        />
        <select name="planId" onChange={handleChange}>
          {planOptions.map((plan, index) => (
            <option selected={index === 0} value={plan.value}>
              {plan.name}
            </option>
          ))}
        </select>
        <button
          style={{ margin: '20px 0' }}
          onClick={() => changeModal('edit')}
        >
          Nova empresa
        </button>
      </div>
      {companyTable.map((company, index) => (
        <TableItem
          handleEdit={() => changeModal('edit', company.id)}
          handleDelete={() => changeModal('delete', company.id)}
          showBorder={index === companies.length}
          showDeleteBtn={index > 0}
          showEditBtn={index > 0}
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
        plans={plans}
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
