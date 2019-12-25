# Doggy Store

Doggy Store is a simple web app that let's anyone buy a dog online shipped right to your door! Woof!

Payments are handled through Stripe by initiating a payment via a credit card by securely sending the credit card details to Stripe's API through Stripe Elements, which places a credit card capture form on the app through iframes and provides a JavaScript function to receive the charge token for the credit card and place a charge through Stripe's Charge API. In this case AWS Amplify was used to set up a simple REST API with AWS API Gateway and a Lambda function powering that API to interact securely with the Stripe API.

The Stripe JS is loaded after the first render to prevent any slowdown of the app.

The real reason that the Doggy Store was invented was do to a coding challenge from Stripe during the interview process and I needed a simple way to get placeholder images for a webstore. I naturally used placedog.net because of their simple API.

The app is not production ready and there are multiple things that could be improved to make it production ready.

A demo of the app is available at <https://doggystore.netlify.com>.

## Todo

- Add address field to checkout
- Allow Split Payments with Dog Breeder through Stripe
- Allow Apple Pay and Google Pay from iOS and Android Devices
- Use Stripe's Products API to power the storefront
- Allow user to download their receipts from Stripe's API
- Use AWS Secrets Manager for storing and retrieving the Stripe Secret key in the Lambda function instead of environment variables
- Add login functionality for users
- Add cart microservice/API
- Allow Purchase of Multiple Dogs
- Select gender at checkout
- Sell cats, horses and turtles too!

## Available Scripts

To run the app locally you need to have NodeJS and AWS Amplify installed globally.

In the project directory, you can run:

### `yarn install`

Install app dependencies needed to run the app.

### `PORT=3001 yarn start`

Runs the app in the development mode.<br>
Open <http://localhost:3001> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn --cwd "amplify/backend/function/stripeCharge/src" install`

Installs backend dependencies needed to run the app locally.

### `amplify function invoke stripeCharge`

This runs the Charge API locally on port 3000 on the `/charge` - It accepts a POST request with the following JSON Payload:

```
{
    "token": "tokenId",
    "cart": {
        "breed": "Labrador",
        "price": 1000,
        "shipping": 200
    }
}
```

In a real world scenario, we would not be sending the cart as part of the JSON payload, but rather look up the current active cart from the user. In order to keep this simple we are sending the cart as part of the JSON payload instead of building out user authentication and a cart microservice.
