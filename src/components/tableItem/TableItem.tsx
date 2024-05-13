import { Visible } from '..'
import * as S from './style'

interface TableItemProps {
  children: React.ReactNode
  showEditBtn: boolean
  showDeleteBtn: boolean
  handleEdit: () => void
  handleDelete: () => void
}

export const TableItem = ({
  children,
  showEditBtn,
  showDeleteBtn,
  handleDelete,
  handleEdit
}: TableItemProps) => {
  return (
    <S.TableItem>
      {children}
      <Visible when={showEditBtn}>
        <button onClick={handleEdit}>Editar</button>
      </Visible>
      <Visible when={showDeleteBtn}>
        <button onClick={handleDelete}>Deletar</button>
      </Visible>
    </S.TableItem>
  )
}
