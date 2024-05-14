import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'
import CircularProgress from '@mui/material/CircularProgress'

export const Day = () => {
  const { day } = useCalendarContext()

  return (
    <CalendarLayout type="day">
      <Visible when={!day}>
        <CircularProgress />
      </Visible>
      <S.DayHeader>
        <S.DayHeaderDay>
          <span>{day?.week}</span>
          <span>{day?.day}</span>
        </S.DayHeaderDay>
      </S.DayHeader>
      {Object.keys(day?.events ?? []).map((hour, dayIndex) => (
        <S.DayHour key={dayIndex}>
          <span>{hour}</span>
          {day?.events[hour].map((event, eventIndex) => (
            <Event key={eventIndex} name={event.title} id={event.id} />
          ))}
        </S.DayHour>
      ))}
    </CalendarLayout>
  )
}
