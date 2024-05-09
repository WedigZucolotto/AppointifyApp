import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 15px 20px;
  border-bottom: 1px solid rgb(218, 220, 224);

  .arrows {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .MuiOutlinedInput-notchedOutline
    .css-1d3z3hw-MuiOutlinedInput-notchedOutlinet {
    width: 350px;
  }
`

export const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(60, 64, 67);
`

export const ArrowsButton = styled.button`
  border: none;
  background-color: transparent;
  color: rgb(60, 64, 67);

  > svg {
    font-size: 0.95rem;
  }
`

export const Day = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: rgb(60, 64, 67);
`
