import {useEffect, useState} from 'react'
import {config} from '../config'
import {onlyOneProgram} from '../api/program'
import {Link, useParams} from 'react-router-dom'

const Detail = (props) => {
    
    //Retrieving id Program with useParams
    const {id} = useParams()
    const [program, setProgram] = useState(null)
    const [exercises, setExercises] = useState([])
    //State for the timer 
    const [time, setTime] = useState(0)
    //State to control the timer
    const [isChronoRunning, setIsChronoRunning] = useState(false)
    
    useEffect(() => {
        let interval
        if(isChronoRunning) {
            interval = setInterval(() => {
                //update time every second
                setTime(currentTime => currentTime + 1)
            },1000)
        }
        //clear timer
        return () => clearInterval(interval)
        
    },[isChronoRunning])
    
    
    useEffect(() => {
        const token = window.localStorage.getItem("ggg-token")
        if(token){
            onlyOneProgram(id, token)
            .then((res) => {
            if (res.status === 200) {
                const programExercises = res.programs.filter(exercise => exercise.programs_id)
                setExercises(programExercises)
                
                if(res.programs.length > 0) {
                    setProgram(res.programs[0])
                }
            }
        
        })
        .catch(err=>console.log(err))
        } else {
            console.error("Token non trouvé dans le localStorage")
        }
    }, [id])
    
    if(!program) {
        return <p>Chargement en cours...</p>
    }
    
    const formatTimer = (seconds) => {
        //to get seconds transform in minutes (lower integer)
        const min = Math.floor(seconds / 60)
        //to get the remaining seconds
        const sec = seconds % 60
        //Time is formatted in MM:SS (if seconds are < 10, 0 is added before the number)
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec} `
    }
    
    return (
        <section id="detail">
            <div className="chrono">
                <p>Chronomètre : {formatTimer(time)}</p>
                <button onClick = {() => setIsChronoRunning(!isChronoRunning)}>
                    {isChronoRunning ? 'Pause' : 'Marche'}
                </button>
                <button onClick = {() => setTime(0)}>
                    Effacer
                </button>
            </div>
            <h2>{program.name}</h2>
            <p>Prêt pour ta séance de sport ? Clique sur le timer dès que tu es prêt</p>
            {exercises.map((exercise) => {
                return <article key={exercise.id}>
                    <h3>{exercise.nameEx}</h3>
                    <p>{exercise.descriptionEx}</p>
                    <img src={config.pict_url + exercise.pictureEx} alt={exercise.altEx} />
                    <p>Nombre de séries : {exercise.sets}</p>
                    <p>Nombre de répétitions : {exercise.repetitions}</p>
                    <p>Temps de répos entre chaque série : {exercise.duration}</p>
                
                </article>
            })}
            
            <p>Bravo, tu es arrivé(e) au bout de ta séance</p>
            <Link to="/"> Fin de ma séance</Link>
        </section>
        )
}

export default Detail