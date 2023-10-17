import styled from "styled-components";

export const Button = styled.button`
  background-color: #d32f2f;
  color: white;
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  border: 1px solid #d32f2f;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #b02727;
  }
`;

export const ButtonMovie = styled.div`
  ${Button} {
    margin: ${(props) => props.m};
    padding: ${(props) => props.p};
    /* position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%); */
  }
`;

export const ButtonCinema = styled.button`
  color: #108f3e;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  margin: 0px 16px 16px 0px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(246, 246, 246, 0.5);
  transition: all 0.3s;
  &:hover {
    color: red;
    font-weight: bold;
  }
`;
