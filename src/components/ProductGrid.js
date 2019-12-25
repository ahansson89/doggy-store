import React from "react";
import styled from "styled-components";
import Grid from "styled-components-grid";

const Unit = styled(Grid.Unit)`
  margin-bottom: 10px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const Details = styled(Grid.Unit)`
  color: black;
  text-align: center;
`;

function ProductGrid(props) {
  const { products } = props;
  return (
    <Grid>
      {products.map((product, index) => {
        const { breed, price } = product;
        return (
          <Unit
            key={index}
            size={1 / 3}
            onClick={() => props.addToCart(product)}
          >
            <img
              src={"https://placedog.net/150/150?id=" + (index + 10)}
              alt={breed}
            />
            <Details>{breed}</Details>
            <Details>
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            </Details>
          </Unit>
        );
      })}
    </Grid>
  );
}
export default ProductGrid;
