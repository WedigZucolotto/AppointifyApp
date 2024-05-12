import { useState } from 'react'
import { Menu as MuiMenu, MenuItem } from '@mui/material'
import { Button } from '..'

interface MenuProps {
  children: React.ReactNode
  options: MenuOption[]
}

interface MenuOption {
  name: string
  onClick: () => void
}

export const Menu = ({ children, options }: MenuProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleClick = (event: React.MouseEvent) => {
    setOpenMenu(true)
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Button onClick={handleClick} type="icon">
        {children}
      </Button>
      <MuiMenu
        id="menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        {options.map((o) => (
          <MenuItem onClick={o.onClick}>{o.name}</MenuItem>
        ))}
      </MuiMenu>
    </>
  )
}
