import * as S from './style'
import error from '../../img/error.svg'
import { Button } from '../../components'
// import { Footer } from '../../components/footer/Footer'

export const NoPage = () => {
  return (
    <S.NoPage>
      <div className="main-container">
        <img src={error} alt="" />
        <span className="regua"></span>
        <div className="container">
          <div className='third-container'>
            <h1>Esta página não foi encontrada</h1>
            <div className="centeredTxt">
              <p>
                Esta página não existe ou foi removida! <br /> Sugerimos que
                você tente novamente
                <span className="break-line">ou vá para a página inicial.</span>
              </p>
            </div>
              <Button type="noPage" onClick={() => {}}>
                VOLTAR À PÁGINA INICIAL
              </Button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </S.NoPage>
  )
}
