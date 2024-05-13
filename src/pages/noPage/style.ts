import styled from 'styled-components'

export const NoPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  .container {
    display: flex;
    align-items: center;
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
`
