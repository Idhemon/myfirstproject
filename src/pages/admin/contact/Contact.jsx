import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {displayContacts, updateOneRequest, deleteOneRequest} from '../../../api/contact'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRepeat, faXmark} from '@fortawesome/free-solid-svg-icons'


const ContactAdmin = () => {
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const getContacts = async () => {
            try {
                const contactList = await displayContacts()
                if(contactList.status === 200){
                    setContacts(contactList.result)
                }
            }
            catch(err){
                console.error("Erreur dans la récupération des messages :", err)
                setError("Erreur dans la récupération des messages")
            }
        }
        getContacts()
    },[])
    
    const updateStatus = async (id, newStatus) => {
        try {
            
            //Status is a boolean in the database, 0 by default. 0 becomes 1 or 1 becomes 0
            const updatedStatus = newStatus === 1 ? 0 : 1
            
            const updateRequest = await updateOneRequest({status : updatedStatus}, id)
            
            if(updateRequest.status === 200) {
                setContacts(contacts.map(contact => 
                    contact.id === id ? {...contact, status: updatedStatus} : contact
                ))
            }
        }
        catch(err){
                console.error("Erreur de la mise à jour du status du message :", err)
                setError("Erreur de la mise à jour du status du message")
        }
    }
    
    const deleteRequest = async (id) => {
        try {
            const deletedRequest = await deleteOneRequest(id)
            if(deletedRequest.status === 200) {
                setContacts(contacts.filter(contact => contact.id !== id))
            }
        }
        catch(err){
                console.error("Erreur dans la suppression du message :", err)
                setError("Erreur dans la suppression du message")
        }
    }
    
    return <section id="contact-admin">
        {error && <p>{error}</p>}
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Objet</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact)=>(
                <tr key={contact.id}>
                    <td>{contact.lastname} {contact.firstname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.object}</td>
                    <td>{contact.messages}</td>
                    <td>{moment(contact.receipt_date).format("DD-MM-YYYY")}</td>
                    <td>{contact.status === 1 ? "Traité" : "Non traité"}</td>
                    <td>
                        <button onClick={()=>updateStatus(contact.id, contact.status)}>
                            {contact.status === 1 ? "Non traité" : "Traité"}
                            <FontAwesomeIcon icon={faRepeat} />
                        </button>
                        <button onClick={()=>deleteRequest(contact.id)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <button>
            <Link to='/admin'>Retour</Link>
        </button>
    </section>
    
}

export default ContactAdmin