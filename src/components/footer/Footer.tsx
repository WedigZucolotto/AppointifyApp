import * as S from './style'
import Logo from '../../img/logo-appoint.svg'

export const Footer = () => {
  return (
    <S.Footer>
      <S.Logo>
        <img src={Logo} alt="" />
        <p className='name'>AppointTrack</p>
        <p className='copy'>Copyright by 2024 Wedig & Zucolotto, Inc</p>
      </S.Logo>
      <S.Terms>
        <p>Política de Privacidade </p>
        <p>Termos & Condições</p>
      </S.Terms>
    </S.Footer>
  )
}
