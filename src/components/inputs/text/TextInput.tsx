import { Control, FieldValues, Path, useController } from 'react-hook-form'
import * as S from './style'
import { ChangeEvent } from 'react'
import { InputError } from '../error/InputError'

interface TextProps<TFieldValues extends FieldValues> {
  label: string
  placeholder: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  onChange?: (value: string) => void
}

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  name,
  control,
  onChange
}: TextProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      onChange?.call(null, event.target.value)
    } finally {
      field.onChange(event.target.value)
    }
  }

  return (
    <S.TextInput>
      <label>{label}</label>
      <input
        className={fieldState.error ? 'error' : ''}
        {...field}
        type="text"
        placeholder={placeholder}
        onChange={changeEventHandler}
      />
      <InputError message={fieldState.error?.message} />
    </S.TextInput>
  )
}
