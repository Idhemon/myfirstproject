import {useParams} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from '../components/Checkout-form'

const Payment = () => {
    //Retrieving parameters URL
    const {orderId} = useParams()
    //Loading Stripe.js using the public key stored in the environment variable
    const stripeLoaded = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    return <section id="payment">
        <h2>Paiement</h2>
        <p>Commande : {orderId}</p>
        {/*Elements allows CheckoutForm to know which order the payment is being made for.
        CheckoutForm accesses the Stripe instance and uses Stripe's features for payment processing*/}
        <Elements stripe={stripeLoaded} >
            <CheckoutForm orderId={orderId} />
        </Elements>
    </section>
    
}

export default Payment