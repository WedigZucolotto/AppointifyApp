import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid rgb(218, 220, 224);
  padding-left: 61.86px;
`

export const HeaderDay = styled.div`
  width: calc((100% / 7) - 3px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  > span {
    color: rgb(60, 64, 67);
    font-weight: 500;
    font-size: 0.8rem;
  }

  > span:last-child {
    font-size: 1.5rem;
  }
`

export const Hours = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    padding: 17px 15px 17px 15px;
    color: rgb(60, 64, 67);
    font-size: 0.8rem;
    border-bottom: 1px solid rgb(218, 220, 224);
    display: flex;
    align-items: center;
  }
`

export const Content = styled.div`
  display: flex;
  overflow-y: scroll;
  height: calc(100% - 93px);
`

export const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Day = styled.div`
  border-right: 1px solid rgb(218, 220, 224);
  border-bottom: 1px solid rgb(218, 220, 224);
  width: calc(100% / 7);
  height: 50px;
  padding: 5px 20px 5px 5px;
  display: flex;
  align-items: center;
`
