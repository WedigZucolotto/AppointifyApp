import * as S from './style'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { InputError } from '../error/InputError'
import { TimePicker } from '@mui/x-date-pickers'

interface TimeInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  //onChange?: (value: string) => void
  disabled?: boolean
}

export function TimeInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  //onChange,
  disabled
}: TimeInputProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  //   const changeEventHandler = (date: Dayjs | null) => {
  //     if (date) {
  //       const dateString = date.format('DD/MM/YYYY')
  //       field.onChange(dateString)
  //       onChange?.(dateString)
  //     }
  //   }

  return (
    <S.TimeInput>
      <label>{label}</label>
      <TimePicker
        className={fieldState.error ? 'error' : ''}
        {...field}
        ampm={false}
        disabled={disabled}
      />
      <InputError message={fieldState.error?.message} />
    </S.TimeInput>
  )
}
