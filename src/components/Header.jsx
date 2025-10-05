import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {selectUser, logoutUser} from "../redux/userSlice"
import {selectCart} from "../redux/cartSlice"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHouse, faCrown, faDumbbell, faCartArrowDown, faPersonRunning, faRightFromBracket, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import greek from '../assets/images/logo1-greek-god-gym.jpg'

const Header = () => {
    //Initialized Redux hooks useDispatch and useNavigate to access global state and dispatch actions
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //Retrieve global user and cart state using useSelector
    const user = useSelector(selectUser)
    const cart = useSelector(selectCart)
    //Change the burger menu condition
    const [isOpen, setIsOpen] = useState(false)
    //Using menu burger
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    
    //Manage user disconnection
    const logout = async (e) => {
        e.preventDefault()
        //Removing user token from localStorage
        window.localStorage.removeItem("ggg-token")
        //Dispatch the logoutUser action to update the global state
        dispatch(logoutUser())
        //Redirection to login
        navigate("/login")
    }
    
    
    return (
    <header id="header">
        <div className ="left-part">
            <img src={greek} alt="logo officiel de Greek God Gym" />
            <h1>GREEK GODS GYM</h1>
        </div>
        <nav>
            <ul>
                <li><Link to="/"><FontAwesomeIcon icon={faHouse} /></Link></li>
            
                {user.isLogged === true ? (
                    <>
                        {user.infos.role === "admin" && <li><Link to="/admin"><FontAwesomeIcon icon={faCrown} /> Administration</Link></li>}
                        <li className="hide"><Link to="/programs"><FontAwesomeIcon icon={faDumbbell} /> Programme</Link></li>
                        <li className="hide"><Link to="/cart"><FontAwesomeIcon icon={faCartArrowDown} />Panier</Link></li>
                        <li><Link to="/profile"><FontAwesomeIcon icon={faPersonRunning} /> {user.infos.firstname} {user.infos.lastname}</Link></li>
                        <li><a href="#" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login"><FontAwesomeIcon icon={faRightToBracket} /> Se connecter</Link></li>
                        <li><Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> S'enregistrer</Link></li>
                    </>
                )}
            </ul>
            
        </nav>

        {/* Menu Burger */}
        <div className="menu-burger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {isOpen && (
            <div className="menu-burger-content">
                <ul>
                    {user.isLogged === true && (
                    <>
                    <li><Link to="/programs"><FontAwesomeIcon icon={faDumbbell} /> Programme</Link></li>
                    <li><Link to="/cart"><FontAwesomeIcon icon={faCartArrowDown} />Panier</Link></li>
                    </>
                    )}
                </ul>
            </div>
        )}
    
    </header>)
}

export default Header