interface VisibleProps {
  when: boolean
  children: React.ReactNode
}

export const Visible = ({ when, children }: VisibleProps) => {
  return when ? <>{children}</> : <></>
}
