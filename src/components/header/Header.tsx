import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Visible, Menu, Button } from '..'
import * as S from './style'
import {
  ArrowBackIos,
  ArrowForwardIos,
  Person,
  Apartment,
  Home,
  CalendarMonth
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { CalendarType, LoginResponse, useCalendarContext } from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

interface HeaderProps {
  isCalendar?: boolean
}

export const Header = ({ isCalendar = true }: HeaderProps) => {
  const navigate = useNavigate()

  const user = useAuthUser<LoginResponse>()

  const { setDate, setType, date, type, getCalendarTitle } =
    useCalendarContext()

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

  const userOptions = [
    {
      name: 'Editar',
      onClick: () => navigate(`/calendar/${user?.id}/user`)
    },
    { name: 'Sair', onClick: () => console.log() }
  ]

  const companyOptions = [
    {
      name: 'Editar',
      onClick: () => navigate(`/calendar/${user?.id}/company`)
    },
    {
      name: 'Serviços',
      onClick: () => navigate(`/calendar/${user?.id}/services`)
    }
  ]

  const onCalendarClick = () => {
    setType('week')
    navigate(`/calendar/${user?.id}/week`)
  }

  return (
    <S.Header>
      <S.HomeBtns>
        <Button type="icon" onClick={() => navigate('/login')}>
          <Home />
        </Button>
        <Visible when={!isCalendar}>
          <Button type="icon" onClick={onCalendarClick}>
            <CalendarMonth />
          </Button>
        </Visible>
      </S.HomeBtns>
      <S.Title>{isCalendar ? 'Calendário' : 'Menu'}</S.Title>
      <Visible when={isCalendar}>
        <Button onClick={handleToday}>Hoje</Button>
        <Select
          onChange={handleSelectChange}
          value={type}
          size="small"
          sx={{ fontSize: '0.93rem', color: 'rgb(60, 64, 67)' }}
        >
          <MenuItem value="month">Mês</MenuItem>
          <MenuItem value="week">Semana</MenuItem>
          <MenuItem value="day">Dia</MenuItem>
        </Select>
        <S.Arrows>
          <Button type="icon" onClick={() => handleClickArrow(false)}>
            <ArrowBackIos fontSize="small" />
          </Button>
          <Button type="icon" onClick={() => handleClickArrow(true)}>
            <ArrowForwardIos fontSize="small" />
          </Button>
        </S.Arrows>
        <S.Day>{getCalendarTitle()}</S.Day>
      </Visible>
      <S.Menus>
        <span>{user?.completeName}</span>
        <Visible when={true}>
          <Menu options={companyOptions}>
            <Apartment />
          </Menu>
        </Visible>
        <Menu options={userOptions}>
          <Person />
        </Menu>
      </S.Menus>
    </S.Header>
  )
}
