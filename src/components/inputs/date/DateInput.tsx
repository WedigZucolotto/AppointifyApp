import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import * as S from './style'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { InputError } from '../error/InputError'

interface DateInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  minDate: string
  maxDate: string
  unavailableDates: string[]
  onChange?: (value: string) => void
  disabled?: boolean
}

export function DateInput<TFieldValues extends FieldValues = FieldValues> ({
  name,
  control,
  label,
  minDate,
  maxDate,
  unavailableDates,
  onChange,
  disabled
}: DateInputProps<TFieldValues>) {
  const { fieldState, field } = useController({name, control})

  const changeEventHandler = (date: dayjs.Dayjs | null) => {
    if (date) {
      const dateString = date.format('DD/MM/YYYY')
      field.onChange(dateString)
      onChange?.(dateString)
    }
  }

  return (
    <S.DateInput>
      <label>{label}</label>
      <DatePicker
        {...field}
        className={fieldState.error ? 'error' : ''}
        disabled={disabled}
        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
        format={field.value}
        onChange={changeEventHandler}
        sx={S.DatePickerSx}
        slotProps={{ textField: { placeholder: 'Selecione' } }}
        minDate={dayjs(minDate)}
        maxDate={dayjs(maxDate)}
        shouldDisableDate={(date) =>
          unavailableDates.some(d => date.isSame(d))
        }
      />
      <InputError message={fieldState.error?.message} />
    </S.DateInput>
  )
}
