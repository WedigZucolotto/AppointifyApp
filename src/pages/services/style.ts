import styled from 'styled-components'

interface ContentProps {
  $isLoading: boolean
}

export const Services = styled.div`
  padding: 50px 100px;

  button {
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Title = styled.h2`
  margin-bottom: 20px;

  @media (max-width: 700px) {
    display: flex;
    margin-right: 120px;
    width: 192px;
  }
`

export const Content = styled.div<ContentProps>`
  height: calc(100vh - 224px);
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isLoading ? 'center' : 'start')};
  align-items: ${(props) => (props.$isLoading ? 'center' : 'start')};

  @media (max-width: 700px) {
    display: flex;
    align-items: center;
  }
`

export const Button = styled.div`
  @media (max-width: 700px) {
    margin-right: 145px;
    margin-bottom: 20px;
  }
`
