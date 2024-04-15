import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'

interface DateInputProps {
  text: string
  minDate: string
  maxDate: string
  unavailableDates: string[]
}

export const DateInput = ({
  text,
  minDate,
  maxDate,
  unavailableDates
}: DateInputProps) => {
  return (
    <S.DateInput>
      <label>{text}</label>
      <DatePicker
        sx={S.DatePickerSx}
        slotProps={{ textField: { placeholder: 'Selecione' } }}
        minDate={dayjs(minDate)}
        maxDate={dayjs(maxDate)}
        shouldDisableDate={(date) =>
          unavailableDates.some(d => date.isSame(d))
        }
      />
    </S.DateInput>
  )
}
