import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {saveOneUser} from "../../api/user"

const Register = () => {
    
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [street, setStreet] = useState("")
    const [zip_code, setZip_code] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)
    
    const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ'-]+$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const zipCodeRegex = /^\d{5}$/
    const phoneRegex = /^0\d{9}$/
    
    const submitForm = (e) => {
        e.preventDefault()
        setError(null)
        
        //fields validation
        if(!firstname || !lastname || !email || !password || !number || !street || !zip_code || !city || !phone) {
            setError("Tous les champs doivent être remplis.")
            return
        }
        
        //name validation
        if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
            setError("Votre nom ne doit contenir que des lettres.")
            return
        }
        
        //email validation
        if (!emailRegex.test(email)) {
            setError("Veuillez entrer un email valide.")
            return
        }
        
        //password validation
        if (!passwordRegex.test(password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial")
            return
        }
        
        //zip code validation
        if (!zipCodeRegex.test(zip_code)) {
            setError("Le code postal doit être composé de 5 chiffres")
            return
        }
        
        //zip code validation
        if (!phoneRegex.test(phone)) {
            setError("Le numéro de téléphone doit commencer par 0 et contenir 10 chiffres")
            return
        }
        
        const datas = {
            firstname,
            lastname,
            email,
            password,
            number,
            street,
            zip_code,
            city,
            phone
        }
        saveOneUser(datas)
        .then((res) => {
            if (res.status === 200) {
                navigate("/login")
            }
            else {
                setError(res.msg)
            }
        })
        .catch(err => console.log(err))
    }
    
    return <section id="register">
            <h2>S'enregistrer</h2>
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
                
                <input type="password"
                    placeholder="Votre mot de passe"
                    onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                />
                <div className="row">
                <input type="text"
                    placeholder="Votre numéro de rue/avenue"
                    onChange={(e) => {
                        setNumber(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    placeholder="Votre rue/avenue/chemin/boulevard"
                    onChange={(e) => {
                        setStreet(e.currentTarget.value)
                    }}
                />
                </div>
                <div className="row">
                <input type="text"
                    placeholder="Votre code postal"
                    onChange={(e) => {
                        setZip_code(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    placeholder="Votre ville"
                    onChange={(e) => {
                        setCity(e.currentTarget.value)
                    }}
                />
                </div>
                <input type="text"
                    placeholder="Votre numéro de téléphone"
                    onChange={(e) => {
                        setPhone(e.currentTarget.value)
                    }}
                />
                
                <input type="submit" name="S'enregistrer" />
                
            </form>
    
    </section>
    
}

export default Register