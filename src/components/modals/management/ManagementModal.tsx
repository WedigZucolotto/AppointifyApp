import { Visible } from '../..'
import * as S from './style'

interface ManagementModalProps {
  open: boolean
  children: React.ReactNode
}

export const ManagementModal = ({ children, open }: ManagementModalProps) => {
  return (
    <Visible when={open}>
      <S.ManagementModal>{children}</S.ManagementModal>
    </Visible>
  )
}
