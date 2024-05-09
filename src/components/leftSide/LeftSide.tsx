import { Add } from '@mui/icons-material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Button, NewEvent } from '..'
import * as S from './style'
import dayjs, { Dayjs } from 'dayjs'
import { useCalendarContext } from '../../hooks'
import { useState } from 'react'

export const LeftSide = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { date, setDate } = useCalendarContext()

  const handleMonthChange = (value: Dayjs) => {
    const newDate = new Date(date)
    newDate.setMonth(value.month())
    setDate(newDate)
  }

  const handleChange = (value: any) => setDate(value.$d)

  return (
    <S.LeftSide>
      <Button type="newEvent" onClick={() => setOpenModal(true)}>
        <Add fontSize="large" />
        <span>Novo evento</span>
      </Button>
      <DateCalendar
        onMonthChange={handleMonthChange}
        onChange={handleChange}
        value={dayjs(date)}
        showDaysOutsideCurrentMonth
      />
      <NewEvent open={openModal} onClose={() => setOpenModal(false)} />
    </S.LeftSide>
  )
}
