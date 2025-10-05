import {useState} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {proceedPayment, updateOrderStatus} from '../api/order'
import {addUserProgram} from '../api/userprogram'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../redux/userSlice'
import { selectCart, updateCart } from '../redux/cartSlice'
import {useNavigate} from 'react-router-dom'


const checkoutForm = ({orderId}) => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const [error, setError] = useState(null)
    
    //useStripe and useElements are used to access Stripe features and form elements.
    const stripe = useStripe()
    const elements = useElements()
    
    const userId = user && user.infos ? user.infos.id: null
    
    
    const paymentForm = async (e) => {
        e.preventDefault()
        //if stripe or elements aren't loaded
        if(!stripe || !elements) {
            setError("Problème avec le terminal de paiement, veuillez réessayer ultérieurement")
            return
        }
        
        if(!userId) {
            setError("Utilisateur non trouvé!")
            return
        }
        //Retrieving user and order datas (email user and order number)
        const datas = {
            email : user.infos.email,
            order : orderId
        }
        
        try {
            
            //Checking of the payment with the back-end
            const paymentCheck = await proceedPayment(datas)
        
            if(paymentCheck.status === 500) {
                setError("Le paiement n'a pas pu être réalisé")
                return
            }
        
        
            //Secure key for payment attempt to Stripe
            const secret = paymentCheck.client_secret

            //Using stripe.confirmCardPayment to confirm payment with client_secret
            const payment = await stripe.confirmCardPayment(secret, {
                payment_method : {
                    card : elements.getElement(CardElement),
                    billing_details : {
                        email : user.infos.email
                    }
                }
            })
            
            //If payment is successful, update order status in backend and navigate to a success page
            if(payment.error) {
                setError(payment.error.message)
            }
            else {
                if(payment.paymentIntent.status === "succeeded") {
                    const data = {
                        order : orderId,
                        status : "payé"
                    }
                    const res = await updateOrderStatus(data)
                    if(res.status === 200) {
                    
                        const updatedCart = cart.cart.map(program => ({
                            ...program, 
                            owned: true
                            
                        }))
                        
                        window.localStorage.setItem("GGG-cart", JSON.stringify(updatedCart))
                    
                        dispatch(updateCart(updatedCart))
                        
                        //Add each program in the cart linked to the user in the database
                        for(const program of updatedCart) {
                            await addUserProgram({userId, programId: program.id})
                        }
                        navigate('/success')
                    }
                }
            }    
                
        }
        catch(err) { 
            console.error('Erreur lors du traitement du paiement:', err)
            setError("Une erreur est survenue lors du traiement du paiement")
        }
        
    }
    
    return <section id="checkout">
        <form onSubmit={paymentForm}>
            <CardElement className="stripe-element"/>
            <button type="submit" disabled={!stripe}>Payer</button>
            {error && <p>{error}</p>}
        </form>
        
    </section>
}

export default checkoutForm