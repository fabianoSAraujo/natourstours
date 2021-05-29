/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Iw1IaA1814IPnOzblsSS2vBuNqQNxagK9RaPr8HO9tUT0k99JuJIQ4rMwkqN0L9GET87IbJ0lvAyIRgx83owd2V00cAg51wpd'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout  session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
