import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import {config} from '../../config'
import {selectPrograms, setPrograms} from '../../redux/programSlice'
import {displayPrograms, deleteOneProgram} from '../../api/program'
import {displayOrders} from '../../api/order'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faSquarePlus, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const Admin = (props) => {
    const program = useSelector(selectPrograms)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        displayOrders()
        .then((res) => {
            if(res.status === 200) {
                setOrders(res.result)
            }
        })
        .catch(err => console.log(err))
    }, [])
    
    
    const deleteProgram = async(id) => {
        try {
            const deletedProgram = await deleteOneProgram(id)
            if(deletedProgram.status === 200){
                //Refresh redux store with programs updated
                const newListPrograms = await displayPrograms()
                if(newListPrograms.status === 200) {
                    dispatch(setPrograms(newListPrograms.result))
                    navigate('/admin')
                }
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    
    return <section id="admin">
        <h2>Panneau d'administration</h2>
        <h3>Liste des programmes</h3>
        <table>
            <thead>
                <tr>
                    <th>Image principale du programme</th>
                    <th>Nom du programme</th>
                    <th>Prix</th>
                    <th>Editer/Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {program.programs && program.programs.length > 0 ? program.programs.map((p)=>{
                return <tr key={p.id}>
                    <td><img src={config.pict_url + p.picture}/></td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>
                        <Link to={`/editProgram/${p.id}`}>Editer</Link>
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                deleteProgram(p.id)
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </td>
               
                </tr> 
                }) : <tr>
                    <td colSpan="4">Aucun programme trouvé</td>
                </tr>}
            </tbody>
        
        </table>
        <Link to='/addProgram' className="add"><FontAwesomeIcon icon={faSquarePlus} /> Ajout d'un programme</Link>
        
        
        <h3>Commandes</h3>
        <table>
            <thead>
                <tr>
                    <th>Numéro de commande</th>
                    <th>Prix total</th>
                    <th>Date d'achat</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                 {orders.length > 0 ? (
                        orders.map((o) => (
                            <tr key={o.id}>
                                <td>
                                    <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                                </td>
                                <td>{o.total_price}</td>
                                <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                                <td>{o.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Aucune commande trouvée</td>
                        </tr>
                    )}
            </tbody>
        </table>
        
        
        <h3>Liste des messages</h3>
        <Link to='/contactAdmin' className="contact"><FontAwesomeIcon icon={faEnvelope} />Consulter</Link>
        
    </section>
    
}

export default Admin