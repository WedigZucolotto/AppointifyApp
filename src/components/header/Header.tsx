import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Button } from '..'
import * as S from './style'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { CalendarType, useCalendarContext } from '../../hooks'

export const Header = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { setDate, setType, date, type } = useCalendarContext()

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target
    navigate(`/calendar/${id}/${value}`)
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
      <S.Title>Agenda - Nome da Empresa</S.Title>
      <Button onClick={handleToday}>Hoje</Button>
      <Select onChange={handleSelectChange} value={type}>
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
