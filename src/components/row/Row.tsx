import { Button } from '../button/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import * as S from './style'
interface RowProps {
  name: string
  interval: string
  handleEdit: () => void
  handleDelete: () => void
}

export const Row = ({ name, interval, handleDelete, handleEdit }: RowProps) => {
  return (
    <S.Row>
      <S.NameInterval>
        <span>{name}</span>
        <span>/</span>
        <span>{interval}</span>
      </S.NameInterval>
      <div className="icons">
        <Button type="icon" onClick={handleEdit}>
          <EditIcon />
        </Button>
        <Button type="icon" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </S.Row>
  )
}
