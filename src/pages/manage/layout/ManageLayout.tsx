import { useNavigate } from 'react-router-dom'
import * as S from './style'

interface ManageLayoutProps {
  children: React.ReactNode
}

export const ManageLayout = ({ children }: ManageLayoutProps) => {
  const navigate = useNavigate()

  return (
    <>
      <S.Header>
        <h1>Appointify Administrador</h1>
        <nav>
          <button onClick={() => navigate('/manage/companies')}>
            Empresas
          </button>
          <button onClick={() => navigate('/manage/events')}>Eventos</button>
          <button onClick={() => navigate('/manage/plans')}>Planos</button>
          <button onClick={() => navigate('/manage/services')}>Serviços</button>
          <button onClick={() => navigate('/manage/users')}>Usuários</button>
        </nav>
      </S.Header>
      <S.Content>{children}</S.Content>
    </>
  )
}
