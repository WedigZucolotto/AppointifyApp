import * as S from './style'
import error from '../../img/error.svg'
import { Button } from '../../components'

export const NoPage = () => {
  return (
    <S.NoPage>
      <img src={error} alt="" />
      <span className="regua"></span>
      <div className="container">
        <div>
          <h1>Esta página não foi encontrada</h1>
          <div className="centeredTxt">
            <p>Esta página não existe ou foi removida!</p>
            <p>Sugerimos que você tente novamente ou vá para a página</p>
            <p>inicial.</p>
          </div>
          <Button type="noPage" onClick={() => {}}>
            VOLTAR À PÁGINA INICIAL
          </Button>
        </div>
      </div>
    </S.NoPage>
  )
}
