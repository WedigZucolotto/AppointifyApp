import { Visible, Day as DayBox } from '../../components'
import { useCalendarContext, useWindowWidth } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'

export const Day = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)

  const { day, date, setDate } = useCalendarContext()
  const { isDesktop } = useWindowWidth()

  const handleCalendarChange = (value: any) => {
    setDate(value.$d)
    setOpenCalendar(false)
  }

  const CalendarMotion = motion(DateCalendar)

  return (
    <CalendarLayout type="day">
      <Visible when={!day}>
        <CircularProgress />
      </Visible>
      <S.DayHeader>
        <S.DayHeaderDay>
          <span>{day?.week}</span>
          <span>{day?.day}</span>
          <Visible when={!!day && !isDesktop}>
            <a onClick={() => setOpenCalendar((open) => !open)}>
              {openCalendar ? 'Ocultar' : 'Mostrar calendário'}
            </a>
          </Visible>
        </S.DayHeaderDay>
        <Visible when={!isDesktop}>
          <AnimatePresence>
            {openCalendar && (
              <CalendarMotion
                key="calendar"
                onChange={handleCalendarChange}
                value={dayjs(date)}
                showDaysOutsideCurrentMonth
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{ opacity: 1, height: 'max-content' }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    opacity: { duration: 0.2 },
                    height: { delay: 0.2, duration: 0.2 }
                  }
                }}
                transition={{
                  height: { duration: 0.2 },
                  opacity: { delay: 0.2, duration: 0.2 }
                }}
              />
            )}
          </AnimatePresence>
        </Visible>
      </S.DayHeader>
      {Object.keys(day?.events ?? []).map((hour, dayIndex) => (
        <DayBox
          key={dayIndex}
          day={day?.day ?? ''}
          events={day?.events[hour] ?? []}
          hour={hour}
        />
      ))}
    </CalendarLayout>
  )
}
