import { Control, FieldValues, Path, useController } from 'react-hook-form'
import * as S from './style'
import { ChangeEvent } from 'react'
import { InputError } from '../error/InputError'
import InputMask from 'react-input-mask'

interface TextProps<TFieldValues extends FieldValues> {
  label: string
  placeholder: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  onChange?: (value: string) => void
  mask?: string
}

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  name,
  control,
  onChange,
  mask
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
      <InputMask
          mask={mask ?? ''}
          placeholder={placeholder}
          name={field.name}
          value={field.value}
          className={fieldState.error ? 'error' : ''}
          type="text"
          onChange={changeEventHandler}
        />
      <InputError message={fieldState.error?.message} />
    </S.TextInput>
  )
}
