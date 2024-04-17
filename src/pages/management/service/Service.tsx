import { useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import { ModalData, ModalTypes, header, timeOptions } from '../util'
import {
  ConfirmationModal,
  ManagementModal,
  TableItem
} from '../../../components'
import { ServicesData, useServices, useTryCatch } from '../../../hooks'
import { useParams } from 'react-router-dom'

export const Service = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [services, setServices] = useState<ServicesData[]>([])

  const { id } = useParams()

  const { getAndSet } = useTryCatch()
  const { getAllServices } = useServices()

  useEffect(() => {
    getAndSet(getAllServices(id ?? ''), setServices)
  }, [])

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  return (
    <ManagementLayout>
      <h2>Serviços</h2>
      <button style={{ margin: '20px 0' }} onClick={() => changeModal('new')}>
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
      <ManagementModal open={modal.type === 'edit'}>
        <label>Nome</label>
        <input type="text" placeholder="Nome" />
        <label>Intervalo</label>
        <select>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </ManagementModal>
      <ManagementModal open={modal.type === 'delete'}>
        <ConfirmationModal
          handleYes={() => changeModal('closed')}
          handleNot={() => changeModal('closed')}
        />
      </ManagementModal>
    </ManagementLayout>
  )
}
