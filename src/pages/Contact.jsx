import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {saveOneRequest} from "../api/contact"

const Contact = () => {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [object, setObject] = useState("")
    const [messages, setMessages] = useState("")
    const [error, setError] = useState(null)
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
    const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ'-]+$/
    
    
    const submitForm = (e) => {
        e.preventDefault()
        setError(null)
        
        //fields validation
        if(!firstname || !lastname || !email || !object || !messages) {
            setError("Tous les champs doivent être remplis.")
            return
        }
        
        //email validation
        if (!emailRegex.test(email)) {
            setError("Veuillez entrer un email valide.")
            return
        }
        
        //name validation
        if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
            setError("Votre nom ne doit contenir que des lettres.")
            return
        }
        
        const datas = {
            firstname,
            lastname,
            email,
            object,
            messages
        }
        
        saveOneRequest(datas)
        .then((res) => {
            if(res.status === 200) {
                navigate("/")
            }
            else {
                setError(res.msg)
            }
        })
        .catch(err => console.log(err))
    }
    
    return <section id="contact">
            <h2>Nous contacter</h2>
            {error !== null && <p>{error}</p>}
            <form
            onSubmit={submitForm}
            >
                <input type="text"
                    placeholder="Votre prénom"
                    onChange={(e) => {
                        setFirstname(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    placeholder="Votre nom"
                    onChange={(e) => {
                        setLastname(e.currentTarget.value)
                    }}
                />
                
                <input type="email"
                    placeholder="Votre email"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    placeholder="Objet"
                    onChange={(e) => {
                        setObject(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    placeholder="Votre message"
                    onChange={(e) => {
                        setMessages(e.currentTarget.value)
                    }}
                />
                
                
                <input type="submit" name="Envoyer" />
                
            </form>
    
    </section>
}

export default Contact