import { Visible, WeekDay } from '../../components'
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
            <WeekDay
              key={dayIndex}
              showHour={calendarIndex === 0}
              hour={hour}
              events={week[calendarIndex]?.events[hour]}
              day={calendar.day}
              isPastDate={calendar.isPastDate}
            />
          ))}
        </S.Column>
      ))}
    </CalendarLayout>
  )
}
