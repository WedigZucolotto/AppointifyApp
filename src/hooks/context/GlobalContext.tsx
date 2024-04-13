import { createContext, useContext, useState } from 'react'

interface GlobalContextProps {
  date: DateProps
  weekNames: string[]
  hourNames: string[]
}

interface DateProps {
  current: Date
  set: (date: Date) => void
  setToPreviousMonth: () => void
  setToNextMonth: () => void
  getTitle: () => string
  getMonthDays: () => number[]
  getWeekDays: () => number[]
}

interface GlobalContextProviderProps {
  children: React.ReactNode
}

const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({
  children
}: GlobalContextProviderProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const weekNames = ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.']
  const hourNames = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ]

  const setDateToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const setDateToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const getDateTitle = () => {
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

    const month = months[currentDate.getMonth()]
    const year = currentDate.getFullYear()
    return `${month} de ${year}`
  }

  const getDateMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const week = new Date(year, month, 1).getDay()
    const newDate = new Date()

    return Array.from({ length: 35 }, (_, day) => {
      const remain = week - day
      console.log(remain, week, currentDate)

      if (remain > 0) {
        newDate.setDate(1 - remain)
      }
      if (remain === 0) {
        newDate.setDate(1)
      }
      if (remain < 0) {
        newDate.setDate(1 + remain * -1)
      }
      return newDate.getDate()
    })
  }

  const getDateWeekDays = () => {
    const week = currentDate.getDay()
    const currentDay = currentDate.getDate()
    const newDate = new Date()

    return Array.from({ length: 7 }, (_, day) => {
      const remain = week - day

      if (remain > 0) {
        newDate.setDate(currentDay - remain)
      }
      if (remain === 0) {
        newDate.setDate(currentDay)
      }
      if (remain < 0) {
        newDate.setDate(currentDay + remain * -1)
      }
      return newDate.getDate()
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        date: {
          current: currentDate,
          set: setCurrentDate,
          setToPreviousMonth: setDateToPreviousMonth,
          setToNextMonth: setDateToNextMonth,
          getTitle: getDateTitle,
          getMonthDays: getDateMonthDays,
          getWeekDays: getDateWeekDays
        },
        weekNames,
        hourNames
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
