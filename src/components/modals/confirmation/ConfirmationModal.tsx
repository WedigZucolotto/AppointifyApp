interface ConfirmationModalProps {
  handleYes: () => void
  handleNot: () => void
}

export const ConfirmationModal = ({
  handleYes,
  handleNot
}: ConfirmationModalProps) => {
  return (
    <>
      <span>Você tem certeza?</span>
      <div className="btns">
        <button onClick={handleYes}>Sim</button>
        <button onClick={handleNot}>Não</button>
      </div>
    </>
  )
}
