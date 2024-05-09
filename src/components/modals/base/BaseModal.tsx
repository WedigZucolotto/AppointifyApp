import Draggable from 'react-draggable'
import { Visible } from '../..'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Close } from '@mui/icons-material'
import * as S from './style'

interface BaseModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const BaseModal = ({ children, open, onClose }: BaseModalProps) => {
  return (
    <Visible when={open}>
      <ClickAwayListener onClickAway={onClose}>
        <div>
          <Draggable handle=".draggable">
            <S.BaseModal>
              <div className="draggable"></div>
              <button onClick={onClose} className="closeBtn">
                <Close />
              </button>
              <div className="container">{children}</div>
            </S.BaseModal>
          </Draggable>
        </div>
      </ClickAwayListener>
    </Visible>
  )
}
