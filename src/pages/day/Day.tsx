import { Event } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'

export const Day = () => {
  const { day } = useCalendarContext()

  return (
    <CalendarLayout>
      <S.DayHeader>
        <S.DayHeaderDay>
          <span>{day?.week}</span>
          <span>{day?.day}</span>
        </S.DayHeaderDay>
      </S.DayHeader>
      {Object.keys(day?.events ?? []).map((hour, index) => (
        <S.DayHour key={index}>
          <span>{hour}</span>
          {day?.events[hour].map((event) => (
            <Event name={event.title} />
          ))}
        </S.DayHour>
      ))}
    </CalendarLayout>
  )
}
