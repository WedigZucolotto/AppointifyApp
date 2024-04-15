import * as S from './style'

interface TextProps {
  label: string
  placeholder: string
}

export const TextInput = ({ label, placeholder }: TextProps) => {
  return (
    <S.TextInput>
        <label>{label}</label>
        <input type="text" placeholder={placeholder} />
    </S.TextInput>
  )
}
