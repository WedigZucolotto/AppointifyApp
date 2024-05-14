import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'
import CircularProgress from '@mui/material/CircularProgress'

export const Week = () => {
  const { week } = useCalendarContext()

  return (
    <CalendarLayout>
      <Visible when={!week}>
        <CircularProgress />
      </Visible>
      {week?.map((calendar, calendarIndex) => (
        <S.Column key={calendarIndex}>
          <S.Header>
            <span>{calendar.week}</span>
            <span>{calendar.day}</span>
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
