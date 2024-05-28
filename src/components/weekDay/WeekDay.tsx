import { useState } from 'react'
import { Visible, Event, NewEventButton } from '..'
import { UserEvent } from '../../hooks'
import * as S from './style'

interface WeekDayProps {
  showHour: boolean
  hour: string
  events: UserEvent[]
  day: string
  isPastDate: boolean
}

export const WeekDay = ({
  showHour,
  hour,
  events,
  day,
  isPastDate
}: WeekDayProps) => {
  const [showButton, setShowButton] = useState<boolean>(false)

  return (
    <S.Day
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Visible when={showHour}>
        <S.Hour>{hour}</S.Hour>
      </Visible>
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
