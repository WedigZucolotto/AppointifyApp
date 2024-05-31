import { UserEvent } from '../../hooks'
import { Event, NewEventButton } from '..'
import * as S from './style'
import { useState } from 'react'

interface DayProps {
  hour: string
  events: UserEvent[]
  day: string
  isPastDate: boolean
}

export const Day = ({ hour, events, day, isPastDate }: DayProps) => {
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
        open={showButton && !isPastDate}
        onClose={() => setShowButton(false)}
        day={day}
      />
    </S.Day>
  )
}
