import * as S from './style'

interface EventProps {
  name: string
}

export const Event = ({ name }: EventProps) => {
  return <S.Event>{name}</S.Event>
}
