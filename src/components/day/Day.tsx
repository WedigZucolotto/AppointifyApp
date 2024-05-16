import { UserEvent } from '../../hooks'
import { Event, NewEventButton } from '..'
import * as S from './style'
import { useState } from 'react'

interface DayProps {
  hour: string
  events: UserEvent[]
  day: string
}

export const Day = ({ hour, events, day }: DayProps) => {
  const [showButton, setShowButton] = useState<boolean>(false)

  return (
    <S.Day
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <span>{hour}</span>
      {events.map((event, eventIndex) => (
        <Event key={eventIndex} name={event.title} id={event.id} />
      ))}
      <NewEventButton
        open={showButton}
        onClose={() => setShowButton(false)}
        day={day}
      />
    </S.Day>
  )
}
