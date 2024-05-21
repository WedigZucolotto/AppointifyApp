import styled from 'styled-components'

export const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .left-side {
    display: flex;
    align-items: center;
    height: 100%;
    width: 60%;
    background: linear-gradient(to bottom, #0575e6, #02298a, #021b79);
    position: relative;
  }

  .left-side > div {
    position: absolute;
    color: #ffffff;
    font-size: 18px;
    left: 25%;
    top: 40%;
  }

  div > h1 {
    color: #ffffff;
    font-size: 40px;
    margin-bottom: 10px;
  }

  .left-side > img {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .right-side {
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .right-side > h2 {
    display: none;
  }

  .title {
    text-align: center;
    margin-bottom: 40px;
  }

  .welcome {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 10px;
  }

  .txtinput {
    margin-bottom: 18px;
  }

  @media (max-width: 800px) {
    .left-side {
      display: none;
    }

    .right-side > h2 {
      display: inline;
      position: absolute;
      top: 20px;
      left: 20px;
      color: var(--blue);
    }
  }
`
