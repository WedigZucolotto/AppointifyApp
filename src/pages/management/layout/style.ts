import styled from 'styled-components'

export const Header = styled.header`
  padding: 25px 50px;

  nav {
    margin-top: 25px;
    display: flex;
    gap: 10px;
  }
`

export const Content = styled.main`
  padding: 0 50px;
  width: max-content;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .filters {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notFound {
    font-size: 14px;
    padding-left: 10px;
  }
`
