import { useParams } from 'react-router-dom'
import { MonthDay, Visible } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import CircularProgress from '@mui/material/CircularProgress'

export const Month = () => {
  const { month } = useCalendarContext()
  const { userId = '' } = useParams()

  const rows = (month?.length ?? 0) / 7

  return (
    <CalendarLayout type="month">
      <Visible when={!month}>
        <CircularProgress />
      </Visible>
      {month?.map((calendar, dayIndex) => (
        <MonthDay
          key={dayIndex}
          dayIndex={dayIndex}
          calendar={calendar}
          userId={userId}
          rows={rows}
        />
      ))}
    </CalendarLayout>
  )
}
