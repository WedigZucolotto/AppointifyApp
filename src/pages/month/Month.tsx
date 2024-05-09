import { useNavigate, useParams } from 'react-router-dom'
import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import * as S from './style'
import { CalendarLayout } from '..'

export const Month = () => {
  const { month } = useCalendarContext()

  const navigate = useNavigate()
  const { id } = useParams()

  const rows = (month?.length ?? 0) / 7

  return (
    <CalendarLayout>
      <S.Month>
        {month?.map((calendar, index) => (
          <S.MonthDay rows={rows}>
            <S.MonthDayHeader>
              <span>{calendar.day}</span>
              <Visible when={index < 7}>
                <span>{calendar.week}</span>
              </Visible>
            </S.MonthDayHeader>
            <S.MonthDayContent>
              {calendar.events.map((event) => (
                <Event name={event.title} />
              ))}
              <Visible when={!!calendar.more}>
                <button onClick={() => navigate(`/calendar/${id}/week`)}>
                  + Mais {calendar.more}
                </button>
              </Visible>
            </S.MonthDayContent>
          </S.MonthDay>
        ))}
      </S.Month>
    </CalendarLayout>
  )
}
