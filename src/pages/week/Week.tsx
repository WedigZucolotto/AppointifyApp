import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'
import CircularProgress from '@mui/material/CircularProgress'
import { useParams } from 'react-router-dom'

export const Week = () => {
  const { week, changeTab } = useCalendarContext()
  const { userId = '' } = useParams()

  const newDate = new Date()
  const today = newDate.getDate().toString()

  return (
    <CalendarLayout>
      <Visible when={!week}>
        <CircularProgress />
      </Visible>
      {week?.map((calendar, calendarIndex) => (
        <S.Column key={calendarIndex}>
          <S.Header $isToday={calendar.day === today}>
            <span>{calendar.week}</span>
            <button onClick={() => changeTab('day', userId, calendar.day)}>
              {calendar.day}
            </button>
          </S.Header>
          {Object.keys(calendar.events ?? []).map((hour, dayIndex) => (
            <S.Day key={dayIndex}>
              <Visible when={calendarIndex === 0}>
                <S.Hour>{hour}</S.Hour>
              </Visible>
              {week[calendarIndex]?.events[hour].map((event, eventIndex) => (
                <Event key={eventIndex} name={event.title} id={event.id} />
              ))}
            </S.Day>
          ))}
        </S.Column>
      ))}
    </CalendarLayout>
  )
}
