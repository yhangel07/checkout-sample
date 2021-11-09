import env from '../env';

const stripe = require('stripe')(env.key);

const checkoutController = async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.product_name,
              },
              unit_amount: req.body.price,
            },
            quantity: req.body.quantity,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/notification/order/success?session_id={CHECKOUT_SESSION_ID}',
        // success_url: 'http://localhost:4200/product/success',
        cancel_url: 'http://localhost:3000/api/order/cancel'
      });
      return res.status(200).json({ id: session.id });

    } catch(error) {
      console.log(error);
        return res.status(500).send('Operation was not successful', error);
    }
  }

  const checkoutSuccess =  async (req, res) => {
    console.log(req.query);
    try {

      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      // const customer = await stripe.customers.retrieve(session.customer);
      return res.status(200).json(session);

    } catch(error) {
      console.log(error);
        return res.status(500).send('Operation was not successful', error);
    }
  };


export {
  checkoutController,
  checkoutSuccess
};
