import { createContext, useContext, useEffect, useState } from 'react'
import { UserDayWeek, UserMonth, useTryCatch, useUsers } from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export type CalendarType = 'day' | 'week' | 'month'

interface CalendarContextProps {
  date: Date
  setDate: (date: Date) => void
  day?: UserDayWeek
  week?: UserDayWeek[]
  month?: UserMonth[]
  type: CalendarType
  setType: (type: CalendarType) => void
  refreshCalendar: () => void
  getCalendarTitle: () => string
  changeTab: (type: CalendarType, userId: string, day?: string) => void
}

interface CalendarContextProviderProps {
  children: React.ReactNode
}

const CalendarContext = createContext({} as CalendarContextProps)

export const CalendarContextProvider = ({
  children
}: CalendarContextProviderProps) => {
  const { userId = '' } = useParams()
  const navigate = useNavigate()

  const path = window.location.pathname
  const pathParts = path.split('/')
  const calendarType = pathParts[pathParts.length - 1]

  const [date, setDate] = useState<Date>(new Date())
  const [type, setType] = useState<CalendarType>(calendarType as CalendarType)

  const [day, setDay] = useState<UserDayWeek>()
  const [week, setWeek] = useState<UserDayWeek[]>()
  const [month, setMonth] = useState<UserMonth[]>()

  const { getUserDay, getUserWeek, getUserMonth } = useUsers()
  const { getAndSet } = useTryCatch()

  useEffect(() => {
    fetchCalendar()
  }, [date, type])

  const fetchCalendar = () => {
    const formatedDate = date.toLocaleDateString('pt-BR').replace(/\//g, '/')

    if (type === 'day') {
      getAndSet(getUserDay(userId, formatedDate), setDay)
      return
    }
    if (type === 'week') {
      getAndSet(getUserWeek(userId, formatedDate), setWeek)
      return
    }
    if (type === 'month') {
      getAndSet(getUserMonth(userId, formatedDate), setMonth)
      return
    }
  }

  const refreshCalendar = () => fetchCalendar()

  const getCalendarTitle = () => {
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

  const changeTab = (type: CalendarType, userId: string, day?: string) => {
    if (day) {
      const newDate = new Date(date)
      newDate.setDate(parseInt(day))
      setDate(newDate)
    }
    setType(type)
    navigate(`/calendar/${userId}/${type}`)
  }

  return (
    <CalendarContext.Provider
      value={{
        date,
        setDate,
        day,
        week,
        month,
        type,
        setType,
        refreshCalendar,
        getCalendarTitle,
        changeTab
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => useContext(CalendarContext)
