import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Button } from '..'
import * as S from './style'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { CalendarType, LoginResponse, useCalendarContext } from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const Header = () => {
  const navigate = useNavigate()
  const user = useAuthUser<LoginResponse>()

  const { setDate, setType, date, type } = useCalendarContext()

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target
    navigate(`/calendar/${user?.id}/${value}`)
    setType(value as CalendarType)
  }

  const handleToday = () => setDate(new Date())

  const handleClickArrow = (isNext: boolean) => {
    const newDate = new Date(date)

    if (type === 'day') {
      const result = isNext ? newDate.getDate() + 1 : newDate.getDate() - 1
      newDate.setDate(result)
      setDate(newDate)
    }
    if (type === 'week') {
      const result = isNext ? newDate.getDate() + 7 : newDate.getDate() - 7
      newDate.setDate(result)
      setDate(newDate)
    }
    if (type === 'month') {
      const result = isNext ? newDate.getMonth() + 1 : newDate.getMonth() - 1
      newDate.setMonth(result)
      setDate(newDate)
    }
  }

  const getTitle = () => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]

    const month = months[date.getMonth()]
    const year = date.getFullYear()

    if (type === 'day') {
      const day = date.getDate()
      return `${day} de ${month} de ${year}`
    }
    return `${month} de ${year}`
  }

  return (
    <S.Header>
      <S.Title>Agenda - {user?.completeName}</S.Title>
      <Button onClick={handleToday}>Hoje</Button>
      <Select
        onChange={handleSelectChange}
        value={type}
        size="small"
        sx={{ fontSize: '0.93rem', color: 'rgb(60, 64, 67)'}}
      >
        <MenuItem value="month">Mês</MenuItem>
        <MenuItem value="week">Semana</MenuItem>
        <MenuItem value="day">Dia</MenuItem>
      </Select>
      <div className="arrows">
        <S.ArrowsButton onClick={() => handleClickArrow(false)}>
          <ArrowBackIos />
        </S.ArrowsButton>
        <S.ArrowsButton onClick={() => handleClickArrow(true)}>
          <ArrowForwardIos />
        </S.ArrowsButton>
      </div>
      <S.Day>{getTitle()}</S.Day>
    </S.Header>
  )
}
