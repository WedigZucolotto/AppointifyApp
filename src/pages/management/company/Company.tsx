import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ManagementModal, TableItem, Visible } from '../../../components'
import {
  CompaniesData,
  Option,
  useCompanies,
  usePlans,
  useTryCatch
} from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { header, timeOptions } from './util'

type ModalTypes = 'edit' | 'delete' | 'closed'
type PageTypes = 'users' | 'services' | 'events'

export const Company = () => {
  const [plans, setPlans] = useState<Option[]>([])
  const [companies, setCompanies] = useState<CompaniesData[]>([])
  const [openModal, setOpenModal] = useState<ModalTypes>('closed')

  const { fetchAndSet } = useTryCatch()
  const { createCompany, getAllCompanies } = useCompanies()
  const { getPlanOptions } = usePlans()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAndSet(getPlanOptions(), setPlans)
    fetchAndSet(getAllCompanies(), setCompanies)
  }, [])

  const handleNavigate = (id: string, page: PageTypes) =>
    navigate(`/management/companies/${id}/${page}`)

  return (
    <ManagementLayout>
      <h2>Empresas</h2>
      <button style={{ margin: '20px 0' }} onClick={() => setOpenModal('edit')}>
        Nova empresa
      </button>
      {[header, ...companies].map((company, index) => (
        <TableItem
          handleEdit={() => setOpenModal('edit')}
          handleDelete={() => setOpenModal('delete')}
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
      <ManagementModal open={openModal === 'edit'}>
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
          <button onClick={() => setOpenModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </ManagementModal>
      <ManagementModal open={openModal === 'delete'}>
        <span>Você tem certeza?</span>
        <div className="btns">
          <button onClick={() => setOpenModal('closed')}>Sim</button>
          <button onClick={() => setOpenModal('closed')}>Não</button>
        </div>
      </ManagementModal>
    </ManagementLayout>
  )
}
