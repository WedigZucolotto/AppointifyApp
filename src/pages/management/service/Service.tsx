import { ChangeEvent, useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header } from '../util'
import {
  ConfirmationModal,
  ServiceModal,
  TableItem,
  Visible
} from '../../../components'
import {
  ServicesData,
  ServicesFilter,
  useServices,
  useTryCatch
} from '../../../hooks'
import { useParams } from 'react-router-dom'

export const Service = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [services, setServices] = useState<ServicesData[]>([])

  const { companyId = '' } = useParams()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllServices, deleteService } = useServices()

  useEffect(() => {
    fetchServices({ companyId })
  }, [])

  const fetchServices = (filter: ServicesFilter) =>
    getAndSet(getAllServices(filter), setServices)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    fetchServices({ [name]: value, companyId })
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const handleDelete = async () => {
    await fetchWithMessage(deleteService(modal.id), 'Deletado com sucesso!')
    fetchServices({ companyId })
    changeModal('closed')
  }

  const servicesTable = [header.services, ...services]

  return (
    <ManagementLayout>
      <h2>Serviços</h2>
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
        />
        <button onClick={() => changeModal('edit')}>Novo Serviço</button>
      </div>
      <div className="table">
        {servicesTable.map((service, index) => (
          <TableItem
            handleEdit={() => changeModal('edit', service.id)}
            handleDelete={() => changeModal('delete', service.id)}
            showDeleteBtn={index !== 0}
            showEditBtn={index !== 0}
          >
            <span style={{ width: '200px' }}>{service.name}</span>
            <span style={{ width: '100px' }}>{service.interval}</span>
          </TableItem>
        ))}
      </div>
      <Visible when={services.length === 0}>
        <span className="notFound">Nenhum registro encontrado.</span>
      </Visible>
      <ServiceModal
        open={modal.type === 'edit'}
        fetchServices={fetchServices}
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
