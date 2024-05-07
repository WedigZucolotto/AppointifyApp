import { Event } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'

export const Day = () => {
  const { day } = useCalendarContext()

  console.log(day)

  return (
    <CalendarLayout>
      <S.DayHeader>
        <S.DayHeaderDay>
          <span>{day?.week}</span>
          <span>{day?.day}</span>
        </S.DayHeaderDay>
      </S.DayHeader>
      <S.DayContent>
        {Object.keys(day?.events ?? []).map((event, index) => (
          <S.DayHour key={index}>
            <span>{event}</span>
            {day?.events[event].map((event) => (
              <Event name={event.title} />
            ))}
          </S.DayHour>
        ))}
      </S.DayContent>
    </CalendarLayout>
  )
}
