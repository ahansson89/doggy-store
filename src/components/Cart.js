import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: black;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const H2 = styled.h2`
  font-size: 1.6em;
  margin-bottom: 20px;
`;

const Line = styled.div`
  font-size: 1.2em;
  clear: left;
`;

const LineHeading = styled.div`
  font-weight: bold;
  float: left;
  text-align: left;
`;

const LineDescription = styled.div`
  float: right;
  text-align: right;
`;

function Cart(props) {
  const { cart } = props;
  const { breed, shipping, price } = cart;
  const total = shipping + price;
  return (
    <Container>
      <H2>Cart</H2>
      <Line>
        <LineHeading>Breed:</LineHeading>
        <LineDescription>{breed}</LineDescription>
      </Line>
      <Line>
        <LineHeading>Price:</LineHeading>
        <LineDescription>
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </LineDescription>
      </Line>
      <Line>
        <LineHeading>Shipping:</LineHeading>
        <LineDescription>
          {shipping.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </LineDescription>
      </Line>
      <Line>
        <LineHeading>Total:</LineHeading>
        <LineDescription>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </LineDescription>
      </Line>
    </Container>
  );
}

export default Cart;
