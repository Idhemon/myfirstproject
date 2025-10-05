import {Link} from 'react-router-dom'

const Policy = () => {
    return (
        <section id="policy">
            <h2>Politique de confidentialité</h2>
            
            <h3>Conditions Générales de Vente (CGV)</h3>
            <article> Nos conditions générales de vente sont disponibles <Link to="/cgv">ici</Link>. Elles détaillent les modalités de paiement, le droit de rétractation, et les garanties légales applicables.
            </article>
            
            <h3>Protection des données personnelles</h3>
            <article>Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à protéger vos données personnelles.
            </article>
            
            <h3>Propriété intellectuelle</h3>
            <article>Tous les contenus présents sur ce site (textes, images, graphismes, logos, icônes, etc.) sont la propriété de [Nom de votre entreprise] et sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable, est interdite.
            </article>
            
            <h3>Responsabilité</h3>
            <article>La G3 s'efforce de fournir des informations précises et à jour sur ce site. Cependant, nous ne pouvons garantir l'exactitude ou l'exhaustivité des informations fournies. En aucun cas, la G3 ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
            </article>
            
            <h3>Litiges</h3>
            <article>En cas de litige, les tribunaux français seront seuls compétents.
            </article>





        
        </section>
        )
    
}

export default Policy