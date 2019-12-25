import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: palevioletred;
  width: 100%;
  text-align: center;
  color: white;
  margin-bottom: 30px;
`;

const H1 = styled.h1`
  font-size: 2em;
  padding: 20px;
`;

function Header(props) {
  const { title } = props;
  return (
    <Container>
      <H1>{title}</H1>
    </Container>
  );
}

export default Header;
