import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MenuToggle } from './MenuToggle'
import * as S from './style'

const sidebar = {
  open: {
    clipPath: 'circle(150vh at 0 0)',
    boxShadow:
      '0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2)'
  },
  closed: {
    clipPath: 'circle(40px at 23.5px 20px)',
    boxShadow:
      '0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2)'
  }
}

export const Hamburguer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    handleScroll(isOpen ? 'hidden' : '')
    return () => handleScroll()
  }, [isOpen])

  const handleScroll = (value = '') => {
    document.body.style.overflow = value
  }

  return (
    <S.Hamburguer>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="background"
        variants={sidebar}
      >
        <MenuToggle toggle={() => setIsOpen((open) => !open)} />
      </motion.nav>
    </S.Hamburguer>
  )
}
