import styled from 'styled-components'

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);

  &:first-child {
    width: calc((100% / 7) + 60px);
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid rgb(218, 220, 224);

  > span {
    color: rgb(60, 64, 67);
    font-weight: 500;
    font-size: 0.8rem;
  }

  > span:last-child {
    font-size: 1.5rem;
  }
`

export const Day = styled.div`
  border-right: 1px solid rgb(218, 220, 224);
  border-bottom: 1px solid rgb(218, 220, 224);
  height: 50px;
  padding: 5px 20px 5px 5px;
  display: flex;
  align-items: center;
`

export const Hour = styled.span`
  color: rgb(60, 64, 67);
  font-size: 0.8rem;
  padding: 0 20px 0 10px;
`
