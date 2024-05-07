import { Event } from '../../components'
import { useCalendarContext } from '../../hooks'
import { CalendarLayout } from '..'
import * as S from './style'

export const Week = () => {
  const { week } = useCalendarContext()

  return (
    <CalendarLayout>
      <S.Header>
        {week?.map((calendar, index) => (
          <S.HeaderDay>
            <span>{calendar.week}</span>
            <span>{calendar.day}</span>
          </S.HeaderDay>
        ))}
      </S.Header>
      <S.Content>
        {week?.map((calendar) => (
          <S.Day>
            <Event name='event'/>
          </S.Day>
        ))}
      </S.Content>
    </CalendarLayout>
  )
}
