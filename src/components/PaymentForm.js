import React from "react";
import styled from "styled-components";
import { CardElement, injectStripe } from "react-stripe-elements";

const Container = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 1.6em;
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const Success = styled.div`
  color: green;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background-color: palevioletred;
  padding: 10px 30px 10px 30px;
  font-size: 20px;
`;

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      chargeId: null,
      submitting: false
    };
  }

  handleChange = ({ error }) => {
    this.setState({ errorMessage: null });
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  async submit(cart) {
    this.setState({ submitting: true });
    try {
      const { token } = await this.props.stripe.createToken({ type: "card" });
      if (token) {
        const response = await fetch(
          process.env.REACT_APP_API_ENDPOINT + "/charge",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token.id, cart })
          }
        );
        const jsonResponse = await response.json();
        this.setState({ chargeId: jsonResponse.id, submitting: false });
      } else {
        this.setState({
          errorMessage:
            "No token was recieved. You must fill out the credit card form to process a purchase.",
          submitting: false
        });
      }
    } catch (e) {
      this.setState({ errorMessage: e.message, submitting: false });
    }
  }

  render() {
    const { cart } = this.props;
    const { errorMessage, chargeId, submitting } = this.state;
    return (
      <Container>
        {!chargeId ? (
          <React.Fragment>
            <H2>Credit Card</H2>
            <CardElement
              onChange={this.handleChange}
              style={{
                base: {
                  fontSize: "20px",
                  color: "black",
                  "::placeholder": {
                    color: "#aab7c4"
                  }
                },
                invalid: {
                  color: "red"
                }
              }}
            />
            {errorMessage && <Error>{this.state.errorMessage}</Error>}
            <Button disabled={submitting} onClick={() => this.submit(cart)}>
              Pay
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <H2>Success</H2>
            <Success>{"Charge Id: " + chargeId}</Success>
          </React.Fragment>
        )}
      </Container>
    );
  }
}

export default injectStripe(PaymentForm);
