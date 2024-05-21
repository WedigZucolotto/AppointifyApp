import * as S from './style'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { InputError } from '../error/InputError'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

interface TimeInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  onChange?: (value: string) => void
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
    const formatedDate = date?.format('HH:mm') ?? ''

    try {
      onChange?.call(null, formatedDate)
    } finally {
      field.onChange(formatedDate)
    }
  }

  const getValue = (time: string) => {
    const times = time?.split(':').map(Number) ?? []
    const hour = times[0] ?? 0
    const minute = times[1] ?? 0

    return dayjs().hour(hour).minute(minute)
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
        value={getValue(field.value)}
      />
      <InputError message={fieldState.error?.message} />
    </S.TimeInput>
  )
}
