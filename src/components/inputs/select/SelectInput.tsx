import { Control, FieldValues, Path, useController } from 'react-hook-form'
import * as S from './style'
import { ChangeEvent } from 'react'
import { InputError } from '../error/InputError'

interface Option {
  name: string
  value: string
}

interface SelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  options: Option[]
  onChange?: (value: string) => void
  disabled?: boolean
  size?: number
}

export function SelectInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  onChange,
  disabled,
  size = 240
}: SelectProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    try {
      onChange?.call(null, event.target.value)
    } finally {
      field.onChange(event.target.value)
    }
  }

  return (
    <S.SelectInput size={size}>
      <label>{label}</label>
      <select
        {...field}
        className={fieldState.error ? 'error' : ''}
        value={field.value ?? ''}
        onChange={changeEventHandler}
        disabled={disabled}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options.map((o, index) => (
          <option key={index} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
      <InputError message={fieldState.error?.message} />
    </S.SelectInput>
  )
}
