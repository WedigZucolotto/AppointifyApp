import { styled } from 'styled-components'

export const Content = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Title = styled.h2`
  margin-bottom: 20px;
  color: var(--blue);

  @media (max-width: 700px) {
    display: flex;
    margin-right: 50px;
    width: 192px;
  }
`
