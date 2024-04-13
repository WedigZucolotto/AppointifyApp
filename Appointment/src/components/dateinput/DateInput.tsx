import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import * as S from './style'

interface DateInputProps {
    text: string
}

export const DateInput = ({text}: DateInputProps) => {
  return (
    <S.DateInput>
      <div className='container'>
          <label>{text}</label>
          <DatePicker
            sx={S.DatePickerSx}
            slotProps={{ textField: { placeholder: 'Selecione a data' } }}
            minDate={dayjs('2024-04-12T00:00:00-03:00')}
            maxDate={dayjs('2024-05-12T00:00:00-03:00')}
            shouldDisableDate={(date) =>
              date.isSame(dayjs('2024-05-05T00:00:00-03:00'))
            }
          />
      </div>
    </S.DateInput>
  )
}
