import { Visible } from '..'
import * as S from './style'

interface TableItemProps {
  children: React.ReactNode
  showBtns: boolean
  isLastItem: boolean
  handleEdit: () => void
  handleDelete: () => void
}

export const TableItem = ({
  children,
  showBtns,
  isLastItem,
  handleDelete,
  handleEdit
}: TableItemProps) => {
  return (
    <S.TableItem mustHaveBorder={showBtns} isLastItem={isLastItem}>
      {children}
      <Visible when={showBtns}>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Deletar</button>
      </Visible>
    </S.TableItem>
  )
}
