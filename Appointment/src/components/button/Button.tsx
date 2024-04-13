import * as S from './style'

interface ButtonProps {
  text: string
}

export const Button = ({ text }: ButtonProps) => {
  return (
    <S.ButtonContainer>
      <S.Button>{text}</S.Button>
    </S.ButtonContainer>
  )
}
