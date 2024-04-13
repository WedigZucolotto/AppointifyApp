import { useNavigate } from 'react-router-dom'
import { Event } from '../../components'
import { useGlobalContext } from '../../hooks'
import * as S from './style'
import { Layout } from '..'

export const Month = () => {
  const { date, weekNames } = useGlobalContext()
  const navigate = useNavigate()

  const test = [0, 1, 2, 3, 4]

  return (
    <Layout>
      <S.Month>
        {date.getMonthDays().map((day, index) => (
          <S.MonthDay>
            <S.MonthDayHeader>
              <span>{weekNames[index]}</span>
              <span>{day}</span>
            </S.MonthDayHeader>
            <S.MonthDayContent>
              {test.slice(0, 3).map((test) => (
                <Event />
              ))}
              {test.length > 3 && (
                <button onClick={() => navigate('/week')}>
                  + Mais {test.length - 3}
                </button>
              )}
            </S.MonthDayContent>
          </S.MonthDay>
        ))}
      </S.Month>
    </Layout>
  )
}
