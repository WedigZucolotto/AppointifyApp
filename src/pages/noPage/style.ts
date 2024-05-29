import styled from 'styled-components'

export const NoPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .main-container {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .container {
    margin-top: 70px;
    margin-left: 50px;
  }

  .container > div {
    margin-right: 50px;
  }

  .regua {
    display: block;
    padding: 0;
    margin: 10px 0;
    margin-left: 30px;
    width: 4px;
    height: 371px;
    background-color: #ddd;
  }

  .centeredTxt {
    margin-top: 50px;
    margin-bottom: 70px;
    color: #4b4b4b;
    font-size: 20px;
  }

  p {
    margin-top: 5px;
  }

  button {
    margin-bottom: 100px;
  }

  img {
    width: 500px;
  }

  @media (max-width: 700px) {
    .main-container {
      flex-direction: column;
    }

    .container {
      margin-top: 20px;
      margin-left: 0;
    }

    .container > div {
      margin-right: 0;
      margin-bottom: 20px;
    }

    .third-container {
      padding-left: 13px;
    }

    .regua {
      display: none;
    }

    .centeredTxt {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 15px;
    }

    .break-line {
      display: block;
    }

    h1 {
      font-size: 18px;
    }

    button {
      font-size: 16px;
      width: 300px;
      height: 70px;
      margin-left: 0px;
      margin-bottom: 50px;
    }

    img {
      width: 300px;
    }
  }
`
