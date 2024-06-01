import styled from 'styled-components'

export const Success = styled.div`
  h2 {
    padding: 20px;
    color: var(--blue);
  }

  .main {
    display: flex;
    flex-direction: column;
    border: 1px solid #c0c0c0;
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
    color: #ececec;
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
    margin-top: 100px;
    gap: 80px;
    margin-left: 70px;
  }

  .right-side > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info {
    margin: auto;
  }

  .info-name{
    font-weight: 600;
  }

  .note {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: center;
    margin-bottom: 50px;
  }

  .note > p {
    color: #656565;
    font-weight: 500;
  }

  .processing {
    display: none;
  }

  .right-side > div > p {
    display: none;
  }

  @media (max-width: 700px) {
    .main {
      display: flex;
      flex-direction: column;
      margin-top: 70px;
      width: 321px;
      height: 480px;
    }

    .left-side {
      display: flex;
      align-items: center;
      margin-left: 60px;
      margin-top: -20px;
    }

    .right-side {
      margin-top: 30px;
    }

    .right-side > p {
      width: 350px;
      color: #656565;
    }

    .container {
      display: flex;
      flex-direction: column;
    }

    .with-success {
      font-size: 20px;
      width: 250px;
    }

    .info{
      margin-top: -30px;
      font-size: 14px;
    }

    .note {
      margin-left: 1px;
      margin-top: 15px;
      margin-bottom: 10px;
      font-size: 10px;
      text-align: center;
    }

    hr {
      display: none;
    }

    .processing {
      display: none;
    }

    .right-side > div > p {
      display: none;
    }
  }
`
