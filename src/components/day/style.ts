import styled from "styled-components";

export const Day = styled.div`
  border-top: 1px solid rgb(218, 220, 224);
  border-right: 1px solid rgb(218, 220, 224);
  height: 50px;
  padding: 5px 20px 5px 5px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  > span {
    color: rgb(60, 64, 67);
    font-size: 0.8rem;
    padding: 0 20px 0 10px;
  }
`