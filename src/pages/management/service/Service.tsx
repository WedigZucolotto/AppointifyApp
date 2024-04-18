import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header } from '../util'
import { ConfirmationModal, ServiceModal, TableItem } from '../../../components'
import { ServicesData, useServices, useTryCatch } from '../../../hooks'
import { useParams } from 'react-router-dom'

export const Service = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [services, setServices] = useState<ServicesData[]>([])

  const { id } = useParams()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllServices, deleteService } = useServices()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = () => getAndSet(getAllServices(id ?? ''), setServices)

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const handleDelete = async () => {
    await fetchWithMessage(deleteService(modal.id), 'Deletado com sucesso!')
    fetchServices()
    changeModal('closed')
  }

  return (
    <ManagementLayout>
      <h2>Serviços</h2>
      <button style={{ margin: '20px 0' }} onClick={() => changeModal('edit')}>
        Novo serviço
      </button>
      {[header.services, ...services].map((service, index) => (
        <TableItem
          handleEdit={() => changeModal('edit', service.id)}
          handleDelete={() => changeModal('delete', service.id)}
          isLastItem={index === services.length}
          showBtns={index !== 0}
        >
          <span style={{ width: '150px' }}>{service.name}</span>
          <span style={{ width: '100px' }}>{service.interval}</span>
        </TableItem>
      ))}
      <ServiceModal
        open={modal.type === 'edit'}
        fetchServices={fetchServices}
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
