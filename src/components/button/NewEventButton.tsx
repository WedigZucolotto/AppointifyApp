import { AnimatePresence, motion } from 'framer-motion'
import * as S from './style'
import { Add } from '@mui/icons-material'
import { NewEventModal } from '../modals'
import { useState } from 'react'

interface NewEventButtonProps {
  open: boolean
  onClose: () => void
  day: string
}

export const NewEventButton = ({ open, onClose, day }: NewEventButtonProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOnClose = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <S.NewEventButton onClick={() => setOpenModal(true)}>
              <Add />
            </S.NewEventButton>
          </motion.div>
        )}
      </AnimatePresence>
      <NewEventModal
        open={openModal}
        onClose={handleOnClose}
        defaultDay={day}
      />
    </>
  )
}
