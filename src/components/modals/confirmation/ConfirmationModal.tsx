import { ManagementModal } from '..'

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
    <ManagementModal open={open}>
      <span>Você tem certeza?</span>
      <div className="btns">
        <button onClick={handleYes}>Sim</button>
        <button onClick={handleNot}>Não</button>
      </div>
    </ManagementModal>
  )
}
