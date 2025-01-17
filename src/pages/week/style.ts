import styled from 'styled-components'

interface HeaderProps {
  $isToday: boolean
}

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);

  &:first-child {
    width: calc((100% / 7) + 60px);
  }
`

export const Header = styled.div<HeaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 0;

  button {
    background-color: ${(props) =>
      props.$isToday ? 'rgb(26,115,232)' : 'transparent'};
    border: none;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    color: ${(props) => (props.$isToday ? 'white' : 'rgb(60, 64, 67)')};

    &:hover {
      background-color: ${(props) =>
        props.$isToday ? 'rgb(26,115,232)' : 'rgb(218, 220, 224)'};
    }
  }

  span {
    font-weight: ${(props) => (props.$isToday ? 600 : 500)};
    font-size: 0.8rem;
    color: ${(props) =>
      props.$isToday ? 'rgb(26,115,232)' : 'rgb(60, 64, 67)'};
  }
`
