import * as S from './style'
import ilustration from '../../img/Ilustration.svg'

export const NoPage = () => {
  return (
    <S.NoPage>
      <h2 className='logo'>Appointify</h2>

      <div className='container'>
          <div>
              <h1>Oops....</h1>
              <h2 className='page-not-found'>Página não encontrada</h2>
              <div className='centeredTxt'>
                  <p>Esta página não existe ou foi removida!</p>
                  <p>Sugerimos que você tente novamente.</p>
              </div>
          </div>
          <img src={ilustration} alt="" />
      </div>
    </S.NoPage>
  )
}
