import { createContext, useContext, useEffect, useState } from 'react'
import { UserDayWeek, UserMonth, useTryCatch, useUsers } from '../api'
import { useParams } from 'react-router-dom'

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
}

interface CalendarContextProviderProps {
  children: React.ReactNode
}

const CalendarContext = createContext({} as CalendarContextProps)

export const CalendarContextProvider = ({
  children
}: CalendarContextProviderProps) => {
  const { id: userId } = useParams()

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
    if (!userId) return

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
        refreshCalendar
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => useContext(CalendarContext)
