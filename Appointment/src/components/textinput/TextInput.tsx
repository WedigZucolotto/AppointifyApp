import * as S from './style'

interface TextProps {
  label: string
  placeholder: string
}

export const TextInput = ({ label, placeholder }: TextProps) => {
  return (
    <S.TextInput>
      <div>
        <label>{label}</label>
        <input type="text" placeholder={placeholder} />
      </div>
    </S.TextInput>
  )
}
