import * as S from './style'
import line from '../../img/lines-vector.svg'
import { Button, TextInput } from '../../components'
import { useForm } from 'react-hook-form'

export const Login = () => {

  const { control } = useForm()

  return (
    <S.Login>
      <section className="left-side">
        <div>
          <h1>Appointify</h1>
          <p>O melhor serviço de agendamento</p>
        </div>

        <img src={line} alt="" />
      </section>

      <section className="right-side">
          <div className='title'>
            <p className="welcome">Bem vindo!</p>
            <p>Faça login para começar</p>
          </div>
          <div className='txtinput'>
            <TextInput
              type="userName"
              name="userName"
              placeholder="Nome de Usuário"
              control={control}
            />
          </div>
            <div className='txtinput'>
              <TextInput
                type="password"
                name="password"
                placeholder="Senha"
                control={control}
              />
            </div>
          <Button onClick={() => console.log()} type='login'>Entrar</Button>
      </section>
    </S.Login>
  )
}
