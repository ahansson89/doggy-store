import React from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import PaymentForm from "./components/PaymentForm";
import { StripeProvider, Elements } from "react-stripe-elements";
import dotenv from "dotenv";
dotenv.config();

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          breed: "Poodle",
          price: 1000,
          shipping: 200
        },
        {
          breed: "Pit Bull",
          price: 1500,
          shipping: 200
        },
        {
          breed: "Beagle",
          price: 500,
          shipping: 200
        },
        {
          breed: "German Shepherd",
          price: 2000,
          shipping: 200
        },
        {
          breed: "Boxer",
          price: 5000,
          shipping: 500
        },
        {
          breed: "Border Collie",
          price: 3000,
          shipping: 200
        },
        {
          breed: "Samoyed",
          price: 700,
          shipping: 200
        },
        {
          breed: "Great Dane",
          price: 900,
          shipping: 200
        },
        {
          breed: "Yourshire Terrier",
          price: 1000,
          shipping: 200
        }
      ],
      cart: null,
      stripe: null
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  componentDidMount() {
    console.log(process.env);
    // Load Stripe JavaScript after first render
    const stripeJs = document.createElement("script");
    stripeJs.src = "https://js.stripe.com/v3/";
    stripeJs.async = true;
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
      });
    };
    document.body && document.body.appendChild(stripeJs);
  }

  addToCart(product) {
    this.setState({ cart: product });
  }

  handleResult() {
    console.log(this);
  }

  render() {
    const { products, cart, stripe } = this.state;
    return (
      <React.Fragment>
        <Reset />
        <Header title="Doggy Store" />
        <Container>
          {!cart ? (
            <ProductGrid products={products} addToCart={this.addToCart} />
          ) : (
            <React.Fragment>
              <Cart cart={cart} />
              <StripeProvider stripe={stripe}>
                <Elements>
                  <PaymentForm handleResult={this.handleResult} cart={cart} />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
