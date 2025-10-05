import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {config} from '../config'
import {displayOnlyPrograms} from '../api/program'
import { useSelector, useDispatch } from 'react-redux'
import { setPrograms, selectPrograms } from '../redux/programSlice'

const Home = (props) => {
    const dispatch = useDispatch()
    //state to store programs
    const programs = useSelector(selectPrograms)
    
    useEffect (() => {
        
        displayOnlyPrograms()
        .then((res) => {
            if(res.status === 200) {
                dispatch(setPrograms(res.result))
            }
        })
        .catch(err => console.log(err))
    //empty array [] as second argument means that the effect will only run once, after the initial mounting of the component    
    }, [dispatch])
    
    
    return <section id="home">
        <h1>Bienvenue sur Greek Gods Gym</h1>
        <p>Deviens la meilleure version de toi-même</p>
        {/*if there are programs*/}
        {programs.programs.length > 0 && <ul>
        
            {/*loop to have each program to display*/}
            {programs.programs.map((program) => {
                return <li key={program.id}>
                    <div className="content-program">
                        <article>
                            <h2>{program.name}</h2>
                            <p>{program.description}</p>
                            <button><Link to={`/cart`}>{program.price}€</Link></button>
                        </article>
                        <img src={config.pict_url + program.picture} alt={program.alt} />
                    </div>
                </li>    
            })}
        </ul>}
    </section>
}

export default Home