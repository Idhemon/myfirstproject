import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {cleanCart} from '../redux/cartSlice'

const Success = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        window.localStorage.removeItem("GGG-cart")
        dispatch(cleanCart())
    }, [])
    
    return <section id="success">
        <h2>Merci pour votre achat et bienvenue chez les Gods</h2>
        <p>Votre commande a été effectuée avec succès</p>
        <Link to="/">Accueil</Link>
    </section>
}

export default Success