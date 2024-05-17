import { useState } from 'react'
import * as S from './style'
import { EventDetailModal } from '../modals'
import { Visible } from '..'

interface EventProps {
  name: string
  id: string
  time?: string
}

export const Event = ({ name, id, time = '' }: EventProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <S.Event onClick={() => setOpenModal(true)}>
        <span>{name}</span>
        <Visible when={!!time}>
          <span>{time}</span>
        </Visible>
      </S.Event>
      <EventDetailModal
        id={id}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
