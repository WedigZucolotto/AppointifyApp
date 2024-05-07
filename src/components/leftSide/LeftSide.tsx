import { Add } from '@mui/icons-material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Button } from '..'
import * as S from './style'
import dayjs, { Dayjs } from 'dayjs'
import { useCalendarContext } from '../../hooks'

export const LeftSide = () => {
  const { date, setDate} = useCalendarContext()

  const handleMonthChange = (value: Dayjs) => {
    const newDate = new Date(date)
    newDate.setMonth(value.month())
    setDate(newDate)
  }

  const handleChange = (value: any) => setDate(value.$d)

  return (
    <S.LeftSide>
      <Button type="newEvent" onClick={() => console.log('evento')}>
        <Add fontSize="large" />
        <span>Novo evento</span>
      </Button>
      <DateCalendar
        onMonthChange={handleMonthChange}
        onChange={handleChange}
        value={dayjs(date)}
        showDaysOutsideCurrentMonth
      />
    </S.LeftSide>
  )
}
