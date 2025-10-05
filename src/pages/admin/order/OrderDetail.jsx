import {useState, useEffect} from 'react'
import {onlyOneOrder} from '../../../api/order'
import {Link, useParams} from 'react-router-dom'
import moment from 'moment'

const OrderDetail = () => {
    const {id} = useParams()
    const [order, setOrder] = useState(null)
    const [orderDetail, setOrderDetail] = useState([])
    const [user, setUser] = useState(null)
    

    const getOneOrder = async () => {
        try {
            const oneOrder = await onlyOneOrder(id)
            if(oneOrder.status === 200){
                setOrder(oneOrder.order)
                setOrderDetail(oneOrder.orderDetail)
                setUser(oneOrder.user)
            }
        }
        catch(err) {
            console.error("Une erreur est survenue dans la recherche de la commande", err)
        }
    }

    
    useEffect(() => {
        getOneOrder()
    }, [id])
    
    return <section id="order-detail">
        <h2>Détail de la commande n°{id}</h2>
        {user !== null && <article>
            <h3>Informations du client</h3>
            <p>{user.lastname} {user.firstname}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.number} {user.street}</p>
            <p>{user.zip_code} {user.city}</p>
        </article>}
        <article>
            <h3>Détails de la commande</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nom du programme</th>
                        <th>Description</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.length > 0 && orderDetail.map((o)=> {
                    return <tr key={o.id}>
                        <td>{o.name}</td>
                        <td>{o.description}</td>
                        <td>{o.unit_price}€</td>
                    </tr>    
                    })}
                </tbody>
                {order !== null && (
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Date de la commande</td>
                        <td>{moment(order.created_at).format('DD-MM-YYYY')}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Prix total de la commande</td>
                        <td>{order.total_price}€</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Status de la commande</td>
                        <td>{order.status}</td>
                    </tr>    
                </tfoot>
                )}
            </table>
            
        </article>
        
        <button>
            <Link to='/admin'>Retour</Link>
        </button>
    </section>
}

export default OrderDetail