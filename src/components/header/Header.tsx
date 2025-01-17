import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Visible, Menu, Button, Hamburguer } from '..'
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
import {
  CalendarType,
  LoginResponse,
  useCalendarContext,
  useWindowWidth
} from '../../hooks'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useEffect } from 'react'

interface HeaderProps {
  isCalendar?: boolean
}

export const Header = ({ isCalendar = true }: HeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDesktop } = useWindowWidth()

  useEffect(() => {
    if (!isDesktop && isCalendar) {
      setType('day')
    }
  }, [isDesktop])

  useEffect(() => {
    const routes = location.pathname.split('/')
    const lastRoute = routes[routes.length - 1]
    
    setType(lastRoute as CalendarType)
  }, [location])

  const user = useAuthUser<LoginResponse>()
  const signOut = useSignOut()

  const { setDate, date, type, getCalendarTitle, changeTab, setType } =
    useCalendarContext()

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target
    changeTab(value as CalendarType, user?.id ?? '')
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

  const logout = () => {
    signOut()
    navigate('/')
  }

  const userOptions = [
    {
      name: 'Editar',
      onClick: () => navigate(`/calendar/${user?.id}/user`)
    },
    { name: 'Sair', onClick: logout }
  ]

  const companyOptions = [
    {
      name: 'Editar',
      onClick: () => navigate(`/calendar/${user?.companyId}/company`)
    },
    {
      name: 'Serviços',
      onClick: () => navigate(`/calendar/${user?.companyId}/services`)
    }
  ]

  return (
    <S.Header>
      <Visible when={!isDesktop}>
        <Hamburguer />
      </Visible>
      <Visible when={isDesktop}>
        <div>
          <Button type="icon" onClick={() => navigate('/login')}>
            <Home />
          </Button>
          <Visible when={!isCalendar}>
            <Button
              type="icon"
              onClick={() => changeTab('week', user?.id ?? '')}
            >
              <CalendarMonth />
            </Button>
          </Visible>
        </div>
        <S.Title>{isCalendar ? 'Calendário' : 'Menu'}</S.Title>
      </Visible>
      <Visible when={isCalendar}>
        <Visible when={isDesktop}>
          <Button onClick={handleToday}>Hoje</Button>
          <Select onChange={handleSelectChange} value={type} size="small">
            <MenuItem value="month">Mês</MenuItem>
            <MenuItem value="week">Semana</MenuItem>
            <MenuItem value="day">Dia</MenuItem>
          </Select>
        </Visible>
        <S.Arrows>
          <Button type="icon" onClick={() => handleClickArrow(false)}>
            <ArrowBackIos fontSize="small" />
          </Button>
          <S.Day>{getCalendarTitle()}</S.Day>
          <Button type="icon" onClick={() => handleClickArrow(true)}>
            <ArrowForwardIos fontSize="small" />
          </Button>
        </S.Arrows>
      </Visible>
      <Visible when={isDesktop}>
        <S.Menus>
          <span>{user?.completeName}</span>
          <Visible when={!!user?.isOwner}>
            <Menu options={companyOptions}>
              <Apartment />
            </Menu>
          </Visible>
          <Menu options={userOptions}>
            <Person />
          </Menu>
        </S.Menus>
      </Visible>
    </S.Header>
  )
}
