import styled from 'styled-components'

export const Success = styled.div`
  h2 {
    padding: 20px;
    color: var(--blue);
  }

  .main {
    position: relative;
    border: 1px solid;
    width: 70%;
    height: 630px;
    margin: auto;
    margin-top: 70px;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 70px;
  }

  .left-side > img {
    width: 130px;
  }

  .with-success {
    margin-top: 15px;
    color: #309620;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .processing {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #656565;
    font-weight: 500;
  }

  hr {
    height: 270px;
    background-color: black;
  }

  .container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    margin-left: 70px;
  }

  .right-side > div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .note{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 250px;
    margin-bottom: 50px;
  }

  .note > p {
    color: #656565;
    font-weight: 500;
  }
`
