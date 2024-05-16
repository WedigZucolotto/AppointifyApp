import { useEffect, useState } from 'react'
import { BaseModal } from '../..'
import { EventData, useEvents, useTryCatch } from '../../../hooks'
import * as S from './style'

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
    return () => setEvent({} as EventData)
  }, [open])

  return (
    <BaseModal open={open} onClose={onClose}>
      <S.Container>
        <h2>{event?.title}</h2>
        <S.Item>{event?.description}</S.Item>
        <S.Box>
          <S.Item>{event?.date}</S.Item>
          <S.Item>{event?.serviceName}</S.Item>
        </S.Box>
      </S.Container>
    </BaseModal>
  )
}
