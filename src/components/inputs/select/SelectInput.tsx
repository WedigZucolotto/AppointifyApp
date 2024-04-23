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
}

export function SelectInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  onChange
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
    <S.SelectInput>
      <label>{label}</label>
      <select
        {...field}
        className={fieldState.error ? 'error' : ''}
        value={field.value ?? ''}
        onChange={changeEventHandler}
      >
        <option value="" selected disabled>
          Selecione
        </option>
        {options.map((o) => (
          <option value={o.value}>{o.name}</option>
        ))}
      </select>
      <InputError message={fieldState.error?.message} />
    </S.SelectInput>
  )
}
