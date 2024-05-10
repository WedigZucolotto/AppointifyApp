import { ChangeEvent, useEffect, useState } from 'react'
import { ManagementLayout } from '..'
import {
  EventsData,
  EventsFilter,
  useEvents,
  useTryCatch
} from '../../../hooks'
import { useParams } from 'react-router-dom'
import { ModalData, ModalTypes, header } from '../util'
import { ConfirmationModal, TableItem, Visible } from '../../../components'

export const Event = () => {
  const [modal, setModal] = useState<ModalData>({ id: '', type: 'closed' })
  const [events, setEvents] = useState<EventsData[]>([])

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getAllEvents, deleteEvent } = useEvents()

  const { companyId = '', userId = '' } = useParams()

  useEffect(() => {
    fetchEvents({ companyId, userId })
  }, [])

  const fetchEvents = (filter: EventsFilter) =>
    getAndSet(getAllEvents(filter), setEvents)

  const handleDelete = async () => {
    await fetchWithMessage(deleteEvent(modal.id), 'Deletado com sucesso!')
    fetchEvents({ companyId, userId })
    changeModal('closed')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    fetchEvents({ [name]: value, companyId, userId })
  }

  const changeModal = (type: ModalTypes, id = '') => setModal({ id, type })

  const eventTable = [header.events, ...events]

  return (
    <ManagementLayout>
      <h2>Eventos</h2>
      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          onChange={handleChange}
        />
        <input
          type="text"
          name="date"
          placeholder="Data (01/01/2001)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="serviceName"
          placeholder="Serviço"
          onChange={handleChange}
        />
      </div>
      <div className="table">
        {eventTable.map((event, index) => (
          <TableItem
            handleEdit={() => changeModal('edit', event.id)}
            handleDelete={() => changeModal('delete', event.id)}
            showDeleteBtn={index > 0}
            showEditBtn={false}
          >
            <span style={{ width: '150px' }}>{event.title}</span>
            <span
              style={{ width: '250px', fontSize: index > 0 ? '13px' : '16px' }}
            >
              {event.description ?? '[nulo]'}
            </span>
            <span style={{ width: '120px' }}>{event.date}</span>
            <span style={{ width: '120px' }}>{event.serviceName}</span>
          </TableItem>
        ))}
      </div>
      <Visible when={events.length === 0}>
        <span className="notFound">Nenhum registro encontrado.</span>
      </Visible>
      <ConfirmationModal
        open={modal.type === 'delete'}
        handleYes={handleDelete}
        handleNot={() => changeModal('closed')}
      />
    </ManagementLayout>
  )
}
