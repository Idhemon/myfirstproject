import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {loginOneUser} from "../../api/user"
import {useDispatch} from "react-redux"
import {connectUser} from "../../redux/userSlice"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    
    const submitForm = (e) => {
        e.preventDefault()
        setError(null)
        const datas = {
            email,
            password
        }
        
        loginOneUser(datas)
        .then((res) => {
            if(res.status === 200) {
                //Storing the authentication token in localStorage
                window.localStorage.setItem("ggg-token", res.token)
                //Creating a copy of the user object returned by the response which is pushed into redux
                let newUser = res.user
                newUser.token = res.token
                //connexion to redux
                dispatch(connectUser(newUser))
                //redirection to home
                navigate("/")
            }
            else {
                setError(res.msg)
            }
        })
        .catch(err => console.log(err))
    }
    
     return <section id="login">
            <h2>Se connecter</h2>
            {error !== null && <p>{error}</p>}
            <form
            onSubmit={submitForm}
            >
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
                
                <input type="submit" name="Se connecter" />
                
            </form>
    
    </section>
    
    
    
}

export default Login