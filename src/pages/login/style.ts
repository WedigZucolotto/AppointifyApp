import styled from 'styled-components'

export const Login = styled.div`
  display: flex;
  flex-direction: row;

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 60%;
    background: linear-gradient(to bottom, #0575e6, #02298a, #021b79);
  }

  .left-side > div {
    margin-right: 300px;
    margin-bottom: 150px;
    padding: 20px;
  }

  h1 {
    color: #ffffff;
    font-size: 40px;
    margin-bottom: 10px;
  }

  .left-side > div > p {
    color: #ffffff;
    font-size: 18px;
  }

  .left-side > img {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .right-side {
    margin: auto;
  }

  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 40px;
  }

  .welcome {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 10px;
  }

  .txtinput{
    margin-bottom: 18px;
  }
`
