import * as S from './style'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { InputError } from '../error/InputError'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

interface TimeInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  onChange?: (value: Dayjs | null) => void
  disabled?: boolean
}

export function TimeInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  onChange,
  disabled
}: TimeInputProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (date: Dayjs | null) => {
    try {
      onChange?.call(null, date)
    } finally {
      field.onChange(date)
    }
  }

  return (
    <S.TimeInput>
      <label>{label}</label>
      <TimePicker
        className={fieldState.error ? 'error' : ''}
        {...field}
        ampm={false}
        disabled={disabled}
        onChange={changeEventHandler}
        value={field.value ?? dayjs().startOf('day')}
      />
      <InputError message={fieldState.error?.message} />
    </S.TimeInput>
  )
}
