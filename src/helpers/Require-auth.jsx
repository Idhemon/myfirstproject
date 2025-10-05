import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//Import actions to automatically reconnect the user
import {selectUser, connectUser} from '../redux/userSlice'
import {selectPrograms, setPrograms} from '../redux/programSlice'
import {Navigate, useParams} from 'react-router-dom'
import {verifToken} from '../api/user'
import {displayPrograms} from '../api/program'


//HOC (Higher Order Component) for data and security control
const RequireAuth = (props) => {
    //Retrieving route parameters
    const params = useParams()
    //Retrieving user state in the store
    const user = useSelector(selectUser)
    //Retrieving program state in the store
    const allPrograms = useSelector(selectPrograms)
    //Preparing the dispatch functionality for automatic reconnection
    const dispatch = useDispatch()
    //Retrieving the display component that was passed as props from the router
    const Child = props.child
    //Redirection
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)
    
    useEffect ( () => {
        //If the programs are not loaded into redux, they are retrieved and stored in redux
        if(allPrograms.programs.length === 0) {
            displayPrograms()
            .then((res) => {
                if(res.status === 200) {
                    dispatch(setPrograms(res.result))
                }
            })
            .catch(err => console.log(err))
        }
        
        //Connection test via redux info
        //If user is not connected
        if(user.logged===false) {
            //Retrieving token in the localStorage
            const token = window.localStorage.getItem("ggg-token")
            console.log("Token récupéré du localStorage:", token)
            //If storage is null (not found) and the auth props is true (protected route)
            if(token === null && props.auth) {
                //Access denied
                setRedirect(true)
               
            }
            else {
                //If storage is not null
                if(token !== null) {
                    //Check token in the back
                    verifToken()
                    .then((res) => {
                        //If response is not positive
                        if(res.status !== 200) {
                            //If route is protected
                            if(props.auth) {
                                //Access denied
                                setRedirect(true)
                            }
                        }
                        else {
                            //Success in retrieving user information to reconnect
                            //Storing the ajax request response
                            let theOneUser = res.user
                            
                            //Add token to the object
                            theOneUser.token = token
                            //Calling the user login action in the redux store
                            dispatch(connectUser(theOneUser))
                            //Checking if the requested route and its role are admin
                            if(theOneUser.role !== "admin" && props.admin) {
                                //Access denied
                                setRedirectAdmin(true)
                            }
                            
                        }
                    })
                    .catch (err => console.log(err))
                }
            }
        }
        else {
            //user connected in the redux store
            //if user is not admin and admin route protected
            if(user.infos.role !== "admin") {
                if(props.admin){
                    //Access denied
                    setRedirectAdmin(true)
                }
            }
        }
    }, [props])
    
    if(redirect) {
        return <Navigate to="/login" replace/>
    }
    
    if(redirectAdmin) {
        return <Navigate to="/" replace/>
    }
    //Return the Child component with all the props received by RequireAuth (spread operator), as well as a params object containing the route parameters
    return <Child {...props} params={params}/>
}

export default RequireAuth