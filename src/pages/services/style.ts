import styled from 'styled-components'

interface ContentProps {
  $isLoading: boolean
}

export const Services = styled.div`
  padding: 50px 100px;
`

export const Title = styled.h2`
  margin-bottom: 20px;
`

export const Content = styled.div<ContentProps>`
  height: calc(100vh - 224px);
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isLoading ? 'center' : 'start')};
  align-items: ${(props) => (props.$isLoading ? 'center' : 'start')};
`
