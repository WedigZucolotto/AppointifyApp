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
import { useLocation, useNavigate } from 'react-router-dom'
import { CalendarType, LoginResponse, useCalendarContext } from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

interface HeaderProps {
  showCalendarFields?: boolean
}

export const Header = ({ showCalendarFields = true }: HeaderProps) => {
  const navigate = useNavigate()
  const { state } = useLocation()

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

  const userOptions = [
    {
      name: 'Editar',
      onClick: () =>
        navigate(`/calendar/${user?.id}/user`, {
          state: { tab: 'Editar Cadastro' }
        })
    },
    { name: 'Sair', onClick: () => console.log() }
  ]

  const companyOptions = [
    {
      name: 'Editar',
      onClick: () =>
        navigate(`/calendar/${user?.companyId}/company`, {
          state: { tab: 'Editar Empresa' }
        })
    },
    {
      name: 'Serviços',
      onClick: () =>
        navigate(`/calendar/${user?.id}/services`, {
          state: { tab: 'Seus serviços' }
        })
    }
  ]

  return (
    <S.Header>
      <S.HomeBtns>
        <Button type="icon" onClick={() => navigate('/login')}>
          <Home />
        </Button>
        <Visible when={!showCalendarFields}>
          <Button
            type="icon"
            onClick={() => navigate(`/calendar/${user?.id}/week`)}
          >
            <CalendarMonth />
          </Button>
        </Visible>
      </S.HomeBtns>
      <S.Title>{state?.tab ?? 'Calendário'}</S.Title>
      <Visible when={showCalendarFields}>
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
          <Button type="icon" onClick={() => handleClickArrow(false)}>
            <ArrowForwardIos fontSize="small" />
          </Button>
        </S.Arrows>
        <S.Day>{getTitle()}</S.Day>
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
