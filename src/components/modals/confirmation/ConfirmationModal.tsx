import { BaseModal } from '..'
import { Button } from '../../button/Button'
import * as S from './style'

interface ConfirmationModalProps {
  open: boolean
  handleYes: () => void
  handleNot: () => void
}

export const ConfirmationModal = ({
  open,
  handleYes,
  handleNot
}: ConfirmationModalProps) => {
  return (
    <BaseModal open={open} onClose={handleNot}>
      <S.Confirmation>
        <span>Tem certeza que deseja deletar?</span>
        <p>Você não poderá desfazer esta ação.</p>
        <div className="btns">
          <Button onClick={handleNot} type='cancel'>Cancelar</Button>
          <Button onClick={handleYes} type='confirmation'>Confirmar</Button>
        </div>
      </S.Confirmation>
    </BaseModal>
  )
}
