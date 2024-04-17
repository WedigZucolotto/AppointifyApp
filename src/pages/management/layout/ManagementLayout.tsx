import { useNavigate } from 'react-router-dom'
import * as S from './style'

interface ManagementLayoutProps {
  children: React.ReactNode
}

export const ManagementLayout = ({ children }: ManagementLayoutProps) => {
  const navigate = useNavigate()

  return (
    <>
      <S.Header>
        <h1>Appointify Administrador</h1>
        <nav>
          <button onClick={() => navigate('/management/companies')}>
            Empresas
          </button>
          <button onClick={() => navigate('/management/events')}>Eventos</button>
          <button onClick={() => navigate('/management/plans')}>Planos</button>
          <button onClick={() => navigate('/management/services')}>Serviços</button>
          <button onClick={() => navigate('/management/users')}>Usuários</button>
        </nav>
      </S.Header>
      <S.Content>{children}</S.Content>
    </>
  )
}