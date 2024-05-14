import { useEffect, useState } from 'react'
import { BaseModal } from '../..'
import { EventData, useEvents, useTryCatch } from '../../../hooks'

interface EventDetailProps {
  id: string
  open: boolean
  onClose: () => void
}

export const EventDetailModal = ({ id, open, onClose }: EventDetailProps) => {
  const [event, setEvent] = useState<EventData>()

  const { getAndSet } = useTryCatch()
  const { getEventById } = useEvents()

  useEffect(() => {
    if (open) {
      getAndSet(getEventById(id), setEvent)
    }
  }, [open])

  return (
    <BaseModal open={open} onClose={onClose}>
      <h2>{event?.title}</h2>
      <span>Descrição</span>
      <p>{event?.description}</p>
      <div>
        <span>Data: </span>
        <p>{event?.date}</p>
      </div>
      <div>
        <span>Serviço</span>
        <p>{event?.serviceName}</p>
      </div>
    </BaseModal>
  )
}
