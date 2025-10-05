import {useState, useEffect} from 'react'
import {config} from '../config'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faCartArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useSelector, useDispatch} from 'react-redux'
import {updateCart, selectCart} from '../redux/cartSlice'
import { selectUser } from '../redux/userSlice'
import {getUserProgram} from '../api/userprogram'
import Popup from './Popup'

const ArticleProgram = ({program}) => {
    //Retrieving cart
    const cart = useSelector(selectCart)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [popup, setPopup] = useState(false)
    const [isOwned, setIsOwned] = useState(false)
    
    //useEffect calls an asynchronous function ownedProgram that checks if the user already owns the program. Depending on the response, the isOwned state is updated
    useEffect(() => {
       const ownedProgram = async() => {
           try {
               const check = await getUserProgram({userId: user.infos.id, programId: program.id})
               
               if(typeof check ==='object' && check.isOwned){
                    
                    if(check.isOwned.owned === "true"){
                        setIsOwned(true)
                    }
               }
               else if(check === true){
                   setIsOwned(true)
               }
               else {
                console.error("La structure de la réponse n'est pas celle attendue:", check);
            }
           }
           catch(err){
               console.error("Erreur lors de la vérification de possession du programme :", err)
           }
       }
       
       ownedProgram()
    }, [user.infos.id, program.id])
    //Add to the cart shopping
    const onClickCart = async(ancientCart, newProgram) => {
        
        const cartArray = Array.isArray(ancientCart) ? ancientCart: []
        
        //Checking if the program is already owned
        if (isOwned) {
           
            setError("Vous possédez déjà ce programme!")
            navigate(`/detail/${newProgram.id}`)
            return
        }
        
        //Checking if the program is already in the cart    
        const alreadyInCart = cartArray.some(p => p.id === newProgram.id)
        if(alreadyInCart){
            setError("Ce programme est déjà dans votre panier!")
            return
        }
            
        
        
        const upgradeCart = [...cartArray, { ...newProgram, owned: false }]
        //LocalStorage updated
        window.localStorage.setItem("GGG-cart", JSON.stringify(upgradeCart))
        //Redux store updated
        dispatch(updateCart(upgradeCart))
        console.log('Panier mis à jour dans le store Redux:', upgradeCart)
        
        setPopup(true)
        
    }
    
   
    return (
        <li>
            {popup && (
                <Popup
                    msg={`Vous avez ajouté: ${program.name} à votre panier !`}
                    onClickClose={()=> {
                        setPopup(false)
                    }}
                />
            )}
            {error && <p>{error}</p>}
            <article>
                    <h2>{program.name}</h2>
                    <img src={config.pict_url + program.picture} alt={program.alt} />
                    <p>{program.description}</p>
            </article>
            {isOwned ? (
                <button
                onClick = {() => navigate(`/detail/${program.id}`)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Détails
                </button>
            
            ):(
                <button
                    onClick = {() => onClickCart(cart.cart || [], program)}
                >
                    <FontAwesomeIcon icon={faCartArrowDown} /> Ajouter au panier - {program.price} €
                </button>
            )}
        </li>
    )
}

export default ArticleProgram