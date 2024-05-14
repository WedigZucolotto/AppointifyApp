import { useParams } from 'react-router-dom'
import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import * as S from './style'
import { CalendarLayout } from '..'
import CircularProgress from '@mui/material/CircularProgress'

export const Month = () => {
  const { month, changeTab } = useCalendarContext()
  const { userId = '' } = useParams()

  const newDate = new Date()
  const today = newDate.getDate().toString()

  const rows = (month?.length ?? 0) / 7

  return (
    <CalendarLayout type="month">
      <Visible when={!month}>
        <CircularProgress />
      </Visible>
      {month?.map((calendar, dayIndex) => (
        <S.MonthDay key={dayIndex} rows={rows}>
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
        </S.MonthDay>
      ))}
    </CalendarLayout>
  )
}
