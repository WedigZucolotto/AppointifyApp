import * as S from './style'
import check from '../../img/check.png'
import { useLocalStorage } from '../../hooks'

export const Success = () => {
  const { getStorage } = useLocalStorage({ key: 'scheduled' })
  
  return (
    <S.Success>
      <h2>AppointTrack</h2>
      <div className="main">
        <div className="container">
          <div className="left-side">
            <img src={check} alt="" />
            <p className="with-success">Agendado com sucesso!</p>
            <div className="processing">
              <p>Seu agendamento está sendo</p>
              <p>processado. Você receberá um e-mail de</p>
              <p>confirmação em breve.</p>
            </div>
          </div>
          <hr />
          <div className="right-side">
            <p>Obrigado por usar o AppointTrack.</p>
            <div>
              <p>
                Para mais informações visite a página de <a href="#">suporte</a>
              </p>
            </div>
          </div>
        </div>
        <div className="note">
          <p>
            Nota: Não solicitamos seus dados bancários e de cartão de crédito
            verbalmente ou por telefone. Por favor, não <br /> divulgue seus
            dados para fraudadores e impostores que alegam falsamente fazer
            parte do AppointTrack.
          </p>
        </div>
      </div>
    </S.Success>
  )
}
