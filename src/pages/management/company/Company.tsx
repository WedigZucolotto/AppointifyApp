import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import {
  ConfirmationModal,
  ManagementModal,
  TableItem,
  Visible
} from '../../../components'
import {
  CompaniesData,
  Option,
  useCompanies,
  usePlans,
  useTryCatch
} from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { ModalData, ModalTypes, header, timeOptions } from '../util'

type Pages = 'users' | 'services' | 'events'

export const Company = () => {
  const [plans, setPlans] = useState<Option[]>([])
  const [companies, setCompanies] = useState<CompaniesData[]>([])
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })

  const { getAndSet, sendAndGet } = useTryCatch()
  const { getAllCompanies, deleteCompany } = useCompanies()
  const { getPlanOptions } = usePlans()

  const navigate = useNavigate()

  useEffect(() => {
    getAndSet(getPlanOptions(), setPlans)
    getAndSet(getAllCompanies(), setCompanies)
  }, [])

  const handleNavigate = (id: string, page: Pages) =>
    navigate(`/management/companies/${id}/${page}`)

  const handleDelete = () => {
    sendAndGet(deleteCompany(modal.id), getAllCompanies(), setCompanies)
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
      <ManagementModal open={modal.type === 'edit'}>
        <label>Nome</label>
        <input type="text" placeholder="Nome" />
        <label>Abre</label>
        <select>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label>Fecha</label>
        <select>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label>Plano</label>
        <select>
          {plans.map((p) => (
            <option value={p.value}>{p.name}</option>
          ))}
        </select>
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </ManagementModal>
      <ManagementModal open={modal.type === 'delete'}>
        <ConfirmationModal
          handleYes={handleDelete}
          handleNot={() => changeModal('closed')}
        />
      </ManagementModal>
    </ManagementLayout>
  )
}
