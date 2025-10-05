import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
    
    
    
    return (
    <footer id="footer">
        <section>
            <h2>Réseaux sociaux</h2>
            <div className="social">    
                <p><Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></Link></p>
                <p><Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></Link></p>
                <p><Link to="https://www.x.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></Link></p>
            </div>    
        </section>
        <section>
            <h2><Link to="/contact">Nous contacter</Link></h2>
        </section>
        <section>
            <h3><Link to="/cgv">Conditions Générales de Vente</Link></h3>
            <h3><Link to="/policy">Politique de Confidentialité</Link></h3>
        </section>
    
    
    </footer>
        )
}

export default Footer