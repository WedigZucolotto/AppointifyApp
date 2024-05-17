import { useState } from 'react'
import { Visible, Event, NewEventButton } from '..'
import { UserMonth, useCalendarContext } from '../../hooks'
import * as S from './style'

interface MonthDayProps {
  calendar: UserMonth
  userId: string
  dayIndex: number
  rows: number
}

export const MonthDay = ({
  calendar,
  userId,
  dayIndex,
  rows
}: MonthDayProps) => {
  const [showButton, setShowButton] = useState<boolean>(false)
  const { changeTab } = useCalendarContext()

  const newDate = new Date()
  const today = newDate.getDate().toString()

  return (
    <S.MonthDay
      rows={rows}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <S.MonthDayHeader>
        <S.Day
          onClick={() => changeTab('day', userId, calendar.day)}
          $isToday={calendar.day === today}
        >
          {calendar.day}
        </S.Day>
        <Visible when={dayIndex < 7}>
          <span>{calendar.week}</span>
        </Visible>
      </S.MonthDayHeader>
      <S.MonthDayContent>
        {calendar.events.map((event, eventIndex) => (
          <Event
            key={eventIndex}
            name={event.title}
            id={event.id}
            time={event.time}
          />
        ))}
        <Visible when={!!calendar.more}>
          <S.More onClick={() => changeTab('week', userId, calendar.day)}>
            + Mais {calendar.more}
          </S.More>
        </Visible>
      </S.MonthDayContent>
      <NewEventButton
        open={showButton}
        onClose={() => setShowButton(false)}
        day={calendar.day}
      />
    </S.MonthDay>
  )
}
