import Draggable from 'react-draggable'
import { Button } from '../..'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Close } from '@mui/icons-material'
import * as S from './style'
import { motion, AnimatePresence } from 'framer-motion'

interface BaseModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const BaseModal = ({ children, open, onClose }: BaseModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <ClickAwayListener onClickAway={onClose}>
          <S.BaseModal>
            <Draggable handle=".draggable">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="box"
              >
                <div className="draggable">
                  <Button onClick={onClose} type="icon">
                    <Close />
                  </Button>
                </div>
                <div className="container">{children}</div>
              </motion.div>
            </Draggable>
          </S.BaseModal>
        </ClickAwayListener>
      )}
    </AnimatePresence>
  )
}
