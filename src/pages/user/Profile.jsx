import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {updateOneUser, verifToken} from "../../api/user"
import {selectUser, connectUser} from "../../redux/userSlice"
import {Navigate} from "react-router-dom"

const Profile = () => {
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZipcode] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState(null)
    

    
    const submitForm = (e) => {
        e.preventDefault()
        const datas = {
            firstname,
            lastname,
            email,
            number,
            street,
            zip_code: zip,
            city,
            phone
        }
        updateOneUser(datas, user.infos.id)
        .then((res) => {
            if (res.status !== 200) {
                setMessage("Modification impossible, veuillez réessayer.")
            }
            else {
                verifToken()
                .then((response) => {
                    const token = window.localStorage.getItem("ggg-token")
                    if(res.user) {
                    let newUser = res.user
                    newUser.token = token
                    dispatch(connectUser(newUser))
                    setMessage("Profil modifié!")
                    }
                    else {
                        console.error("User data is undefined in the API response.")
                    }
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        if(user.infos) {
            setFirstname(user.infos.firstname)
            setLastname(user.infos.lastname)
            setEmail(user.infos.email)
            setNumber(user.infos.number)
            setStreet(user.infos.street)
            setZipcode(user.infos.zip)
            setCity(user.infos.city)
            setPhone(user.infos.phone)
        }
    },[user])
    
    return <section id="profile">
            <h2>Profil</h2>
            {message !== null && <p>{message}</p>}
            <form
            onSubmit={submitForm}
            >
                <input type="text"
                    defaultValue={user.infos.firstname}
                    onChange={(e) => {
                        setFirstname(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.lastname}
                    onChange={(e) => {
                        setLastname(e.currentTarget.value)
                    }}
                />
                
                <input type="email"
                    defaultValue={user.infos.email}
                    onChange={(e) => {
                        setEmail(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.number}
                    onChange={(e) => {
                        setNumber(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.street}
                    onChange={(e) => {
                        setStreet(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.zip}
                    onChange={(e) => {
                        setZipcode(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.city}
                    onChange={(e) => {
                        setCity(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.phone}
                    onChange={(e) => {
                        setPhone(e.currentTarget.value)
                    }}
                />
                
                <input type="submit" name="Modifier" />
                
            </form>
    
    </section>
    
}

export default Profile