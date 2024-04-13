import { Add } from '@mui/icons-material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Button } from '..'
import * as S from './style'
import dayjs, { Dayjs } from 'dayjs'
import { useGlobalContext } from '../../hooks'

export const LeftSide = () => {
  const { date } = useGlobalContext()

  const handleMonthChange = (value: Dayjs) => {
    const newDate = new Date(date.current)
    newDate.setMonth(value.month())
    date.set(newDate)
  }

  const handleChange = (value: any) => date.set(value.$d)

  return (
    <S.LeftSide>
      <Button type="newEvent" onClick={() => console.log('evento')}>
        <Add fontSize="large" />
        <span>Novo evento</span>
      </Button>
      <DateCalendar
        onMonthChange={handleMonthChange}
        onChange={handleChange}
        value={dayjs(date.current)}
        showDaysOutsideCurrentMonth
      />
    </S.LeftSide>
  )
}
