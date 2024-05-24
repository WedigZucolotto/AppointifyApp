import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 0 15px;
  height: 70px;
  min-width: 1411px;
  border-bottom: 1px solid rgb(218, 220, 224);

  @media (max-width: 700px) {
    min-width: 100%;
    justify-content: end;
    gap: 5px;
  }
`

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(60, 64, 67);
`

export const Day = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(60, 64, 67);
`

export const Menus = styled.div`
  border-radius: 3px;
  margin-left: auto;
  border: 1px solid rgba(0, 0, 0, 0.23);
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
  }
`

export const IconButton = styled.button`
  background-color: transparent;
  border-radius: 100%;
  border: none;
`
