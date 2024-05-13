import { Control, FieldValues, Path, useController } from 'react-hook-form'
import * as S from './style'
import { ChangeEvent } from 'react'
import { InputError } from '../error/InputError'
import InputMask from 'react-input-mask'
import { Person, Lock } from '@mui/icons-material'

type TextType = 'schedule' | 'userName' | 'password' | 'passwordEdit'

interface TextProps<TFieldValues extends FieldValues> {
  label?: string
  placeholder: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  onChange?: (value: string) => void
  mask?: string
  type?: TextType
}

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  name,
  control,
  onChange,
  mask,
  type = 'schedule'
}: TextProps<TFieldValues>) {
  const { fieldState, field } = useController({ name, control })

  const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      onChange?.call(null, event.target.value)
    } finally {
      field.onChange(event.target.value)
    }
  }

  const props = {
    type: type,
    placeholder: placeholder,
    name: field.name,
    value: field.value,
    className: fieldState.error ? 'error' : '',
    onChange: changeEventHandler
  }

  switch (type) {
    case 'schedule':
      return (
        <S.ScheduleInput>
          <label>{label}</label>
          <InputMask mask={mask ?? ''} {...props} />
          <InputError message={fieldState.error?.message} />
        </S.ScheduleInput>
      )
    case 'userName':
      return (
        <S.LoginInput>
          <div className={fieldState.error ? 'box error' : 'box'}>
            <Person className="icon" />
            <input {...props} />
          </div>
          <InputError message={fieldState.error?.message} />
        </S.LoginInput>
      )
    case 'password':
      return (
        <S.LoginInput>
          <div className={fieldState.error ? 'box error' : 'box'}>
            <Lock className="icon" />
            <input {...props} type="password" />
          </div>
          <InputError message={fieldState.error?.message} />
        </S.LoginInput>
      )
    case 'passwordEdit':
      return (
        <S.ScheduleInput>
          <label>{label}</label>
          <input {...props} type="password" />
          <InputError message={fieldState.error?.message} />
        </S.ScheduleInput>
      )
  }
}
