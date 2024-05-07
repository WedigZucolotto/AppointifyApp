import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'

export const Week = () => {
  const { week } = useCalendarContext()

  return (
    <CalendarLayout>
      <S.Week>
        {week?.map((calendar, calendarIndex) => (
          <S.Column>
            <S.Header key={calendarIndex}>
              <span>{calendar.week}</span>
              <span>{calendar.day}</span>
            </S.Header>
            {Object.keys(calendar.events ?? []).map((hour, eventIndex) => (
              <S.Day key={eventIndex}>
                <Visible when={calendarIndex === 0}>
                  <S.Hour>{hour}</S.Hour>
                </Visible>
                {week[calendarIndex]?.events[hour].map((event) => (
                  <Event name={event.title} />
                ))}
              </S.Day>
            ))}
          </S.Column>
        ))}
      </S.Week>
    </CalendarLayout>
  )
}
