import { useState } from 'react'
import * as S from './style'
import { EventDetailModal } from '../modals'
import { Visible } from '..'

interface EventProps {
  name: string
  id: string
  time?: string
  onClick?: () => void
}

export const Event = ({ name, id, onClick, time = '' }: EventProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleClick = () => {
    onClick?.call(null) ?? setOpenModal(true)
  }

  return (
    <>
      <S.Event onClick={handleClick}>
        <span className="name">{name}</span>
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
