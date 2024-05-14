import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { InputError } from '../error/InputError'

interface DateInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  minDate: string
  unavailableDates: string[]
  maxDate?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: number
}

export function DateInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  minDate,
  maxDate,
  unavailableDates,
  onChange,
  disabled,
  size = 240
}: DateInputProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (date: Dayjs | null) => {
    if (date) {
      const dateString = date.format('DD/MM/YYYY')
      field.onChange(dateString)
      onChange?.(dateString)
    }
  }

  return (
    <S.DateInput size={size}>
      <label>{label}</label>
      <DatePicker
        {...field}
        className={fieldState.error ? 'error' : ''}
        disabled={disabled}
        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
        format={field.value}
        onChange={changeEventHandler}
        slotProps={{ textField: { placeholder: 'Selecione' } }}
        minDate={dayjs(minDate)}
        maxDate={dayjs(maxDate) ?? null}
        shouldDisableDate={(date) =>
          unavailableDates.some((d) => date.isSame(d))
        }
      />
      <InputError message={fieldState.error?.message} />
    </S.DateInput>
  )
}
