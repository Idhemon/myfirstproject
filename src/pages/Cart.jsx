import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../redux/userSlice'
import {updateCart, cleanCart, selectCart} from '../redux/cartSlice'
import {saveOneOrder} from '../api/order'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
    const cart = useSelector(selectCart)
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    //Register an order and send to the payment
    const saveOrder = async (e) => {
        e.preventDefault()
        setError(null)
        //If user is logged
        if(user.isLogged) {
            //Saving an user cart with retrieving user id
            const datas = {
                users_id : user.infos.id,
                cart : cart.cart
            }
            
            try {
                const res = await saveOneOrder(datas)
                if(res.status === 200 && res.orderId){
                    navigate(`/payment/${res.orderId}`)
                }
                else {
                    setError("Une erreur est survenue. Veuillez réessayer !")
                }
            }
            catch (err) { 
                setError("Une erreur est survenue. Veuillez réessayer !2")
            }
        }
        else {
            navigate('/login')
        }
    }
    
    
    //Delete one product in the cart
    const removeOneProduct = (ancientCart, oneProgram) => {
        //Copy cart to update
        let newCart = JSON.parse(JSON.stringify(ancientCart))
        //Filter the old cart to create a new cart without the program to delete
        let deletedProgram = newCart.filter(p => p.id !== oneProgram.id)
        //Replacing the cart in localStorage and the redux store
        let lsCart = JSON.stringify(deletedProgram)
        window.localStorage.setItem("GGG-cart", lsCart)
        dispatch(updateCart(deletedProgram))
    }
    
    //Delete all products in the cart
    const reset = () => {
        //delete cart and Redux reinitialization
        window.localStorage.removeItem("GGG-cart")
        dispatch(cleanCart())
    }
    
    return <section id="cart">
        <h2>Mon panier</h2>
        {error !==null && <p>{error}</p>}
        {cart.cart.length > 0 ? <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {cart.cart.map((program) => {
                    return <tr key={program.id}>
                        <td>{program.name}</td>
                        <td>{program.price}</td>
                        <td>
                            <button
                                onClick={()=> {
                                    removeOneProduct(cart.cart, program)
                                }}
                            >
                            <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <button
                        onClick={(e) => {
                            reset()
                        }}>
                        Vider le panier
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table> : <p>Votre panier est vide</p>}
        {cart.cart.length > 0 && <button onClick={saveOrder}>Valider</button>}
    </section>
    
}

export default Cart