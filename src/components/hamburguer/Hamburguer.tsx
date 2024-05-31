import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MenuToggle } from './MenuToggle'
import * as S from './style'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { Visible } from '..'
import { LoginResponse } from '../../hooks'
import { useNavigate } from 'react-router-dom'

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

  const user = useAuthUser<LoginResponse>()
  const signOut = useSignOut()
  const navigate = useNavigate()

  const logout = () => {
    signOut()
    navigate('/')
  }

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
        <S.Menu>
          <Visible when={!!user?.isOwner}>
            <a onClick={() => navigate(`/calendar/${user?.companyId}/company`)}>
              Editar empresa
            </a>
            <a
              onClick={() => navigate(`/calendar/${user?.companyId}/services`)}
            >
              Serviços
            </a>
          </Visible>
          <a onClick={() => navigate(`/calendar/${user?.id}/user`)}>
            Editar usuário
          </a>
          <a onClick={() => navigate(`/calendar/${user?.id}/day`)}>
            Calendário
          </a>
          <a onClick={logout}>Sair</a>
        </S.Menu>
        <div className='description'>
          <p>AppointTrack</p>
          <p>Copyright by 2024 Wedig & Zucolotto, Inc</p>
        </div>
      </motion.nav>
    </S.Hamburguer>
  )
}
