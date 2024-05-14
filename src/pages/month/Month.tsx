import { useNavigate, useParams } from 'react-router-dom'
import { Event, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import * as S from './style'
import { CalendarLayout } from '..'
import CircularProgress from '@mui/material/CircularProgress'

export const Month = () => {
  const { month, setDate, date } = useCalendarContext()

  const navigate = useNavigate()
  const { userId } = useParams()

  const rows = (month?.length ?? 0) / 7

  const handleMoreClick = (day: string) => {
    const newDate = new Date(date)
    newDate.setDate(parseInt(day))
    setDate(newDate)
    navigate(`/calendar/${userId}/week`)
  }

  return (
    <CalendarLayout type="month">
      <Visible when={!month}>
        <CircularProgress />
      </Visible>
      {month?.map((calendar, dayIndex) => (
        <S.MonthDay key={dayIndex} rows={rows}>
          <S.MonthDayHeader>
            <span>{calendar.day}</span>
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
              <S.More onClick={() => handleMoreClick(calendar.day)}>
                + Mais {calendar.more}
              </S.More>
            </Visible>
          </S.MonthDayContent>
        </S.MonthDay>
      ))}
    </CalendarLayout>
  )
}
