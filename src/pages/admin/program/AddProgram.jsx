import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../../../redux/userSlice'
import {setPrograms} from '../../../redux/programSlice'
import {useNavigate} from 'react-router-dom'
import {saveOneProgram, displayPrograms} from '../../../api/program'
import {saveOneExercise, displayExercises} from '../../../api/exercise'
import axios from 'axios'
import {config} from '../../../config'


const addProgram = (props) => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // States for program information
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [alt, setAlt] = useState("")
    const [selectFile, setSelectFile] = useState(null)
    const [error, setError] = useState(null)
    
    // States for exercise information
    const [nameEx, setNameEx] = useState("")
    const [descriptionEx, setDescriptionEx] = useState("")
    const [sets, setSets] = useState("")
    const [repetitions, setRepetitions] = useState("")
    const [duration, setDuration] = useState("")
    const [altEx, setAltEx] = useState("")
    const [programId, setProgramId] = useState(null)
    const [programs, setPrograms] = useState([])
    
    
    
    useEffect(() => {
        const token = window.localStorage.getItem("ggg-token")

        if (!token) {
            setError("Token non trouvé. Veuillez vous reconnecter.")
            return
        }
        
        const programList = async () => {
            try {
               const programsList = await displayPrograms(token)
               if(programsList.status === 200){
                   setPrograms(programsList.result.filter(program => program.hasOwnProperty('price')))
               }
            }
            catch(err){
                console.error(err)
                setError("Une erreur est survenue lors de la récupération des programmes")
            }
        }
        programList()
    }, [])
    
    
    
    //Function to add a program
    const saveProgram = async (datas) => {
        try {
            const token = window.localStorage.getItem("ggg-token")

            if (!token) {
                setError("Token non trouvé. Veuillez vous reconnecter.")
                return
            }
            
            const add = await saveOneProgram(datas, token)
            //If program is added
            if(add.status === 200) {
                const programsList = await displayPrograms(token)
                if(programsList.status === 200) {
                    dispatch(setPrograms(programsList.result))
                    setProgramId(add.programId)
                    
                }
                else {
                    setError(programsList.msg)
                }
            } 
            else {
                setError(add.msg)
            }
        }
        catch(err) {
            console.error(err)
            setError("Une erreur est survenue lors de l'enregistrement du programme.")
        }
    }
    
    const saveInfosProgram = () => {
        if(selectFile === null) {
            const datas = {
                name,
                description,
                price,
                picture : "no-pict.jpg",
                alt : "no-pict"
            }
            saveProgram(datas)
        }
        else {
            //formData object that allows the image to be transported in the ajax request
            const formData = new FormData()
            formData.append("image", selectFile)
            //Ajax request to add image
            axios({
                method:"post",
                url: `${config.api_url}/api/program/pict`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((res) => {
                //If picture saved
                if(res.status === 200){
                    const datas = {
                        name,
                        description,
                        price,
                        picture: res.data.url,
                        alt
                    }
                    saveProgram(datas)
                }
            })
            .catch(err => {
                console.error(err)
                setError("Une erreur est survenue lors de l'enregistrement de l'image du programme.")
            })
        }
    }
    
    const saveExercise = async(datas) => {
        try {
            const addEx = await saveOneExercise(datas, programId)
            if(addEx.status === 200){
                console.log('Exercice bien ajouté!')
            }
            else {
                setError(addEx.msg)
            }
        }
        catch(err){
            console.log(err)
            setError("Une erreur est survenue lors de l'enregistrement de l'exercice.")
        }
        
    }
    
    
    const saveInfosExercise = () => {
        if(selectFile === null) {
            const datas = {
                nameEx,
                descriptionEx,
                sets,
                repetitions,
                duration,
                pictureEx : "no-pict.jpg",
                altEx : "no-pict"
            }
            
            saveExercise(datas, programId)
        }
        else {
            //formData object that allows the image to be transported in the ajax request
            const formData = new FormData()
            formData.append("image", selectFile)
            //Ajax request to add image
            axios({
                method:"post",
                url: `${config.api_url}/api/program/pict`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((res) => {
                //If picture saved
                if(res.status === 200){
                    const datas = {
                        nameEx,
                        descriptionEx,
                        sets,
                        repetitions,
                        duration,
                        pictureEx : res.data.url,
                        altEx
                    }
                    
                    saveExercise(datas, programId)
                }
            })
            .catch(err => {
            console.error(err)
            setError("Une erreur est survenue lors de l'enregistrement de l'image de l'exercice.")
            })
            
        }
    }
    
    
    const onSubmitProgram = (e) => {
        e.preventDefault()
        setError(null)
        if(name === "" || description === "" || price === "" ) {
            setError("Il manque des informations pour le nouveau programme !")
        }
        else if(isNaN(price)) {
            setError("Le prix n'est pas un chiffre, veuillez modifier !")
        }
        else {
            saveInfosProgram()
        }
    }
    
    const onSubmitExercise = (e) => {
        e.preventDefault()
        setError(null)
        if(nameEx === "" || descriptionEx === "" || sets === "" || repetitions === "" || duration === "" ) {
            setError("Il manque des informations pour le nouveau exercice !")
        }
        else if(isNaN(sets) || isNaN(repetitions)) {
            setError("Les champs sets et repetitions doivent être des chiffres, veuillez modifier !")
        }
        else {
            saveInfosExercise()
        }
    }
    
    return <section id="programadd">
        <h2>Ajouter un programme</h2>
        {error !==null && <p>{error}</p>}
        <form onSubmit={onSubmitProgram}>
            <input
                type="text"
                placeholder="Nom du programme"
                value={name}
                onChange={(e)=> setName(e.currentTarget.value)}
            />
            <input
                type="file"
                onChange={(e)=> setSelectFile(e.currentTarget.files[0])}
            />
            <textarea
                placeholder="Description du programme"
                value={description}
                onChange={(e)=> setDescription(e.currentTarget.value)}
            />
            <input
                type="number"
                placeholder="Prix du programme"
                value={price}
                onChange={(e)=> setPrice(e.currentTarget.value)}
            />
            <input
                type="text"
                placeholder="Texte alternatif de l'image"
                value={alt}
                onChange={(e)=> setAlt(e.currentTarget.value)}
            />
            <button type="submit">Enregistrer le nouveau programme</button>
        </form>
        
        
            <article>
                <h2>Ajouter un exercice</h2>
                <form onSubmit={onSubmitExercise}>
                    <select onChange={(e)=> {
                        const selectedProgramId = e.target.value
                        setProgramId(selectedProgramId)
                    }}>
                        <option value="">Sélectionnez un programme</option>
                        {programs.map((program)=> (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>    
                        ))}
                    </select>    
                    
                    {programId && (
                    <>
                        <input
                            type="text"
                            placeholder="Nom de l'exercice"
                            value={nameEx}
                            onChange={(e)=> setNameEx(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e)=> setSelectFile(e.target.files[0])}
                        />
                        <textarea
                            placeholder="Description de l'exercice"
                            value={descriptionEx}
                            onChange={(e)=> setDescriptionEx(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Nombre de séries"
                            value={sets}
                            onChange={(e)=> setSets(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Nombre de répétitions"
                            value={repetitions}
                            onChange={(e)=> setRepetitions(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Durée du temps de repos"
                            value={duration}
                            onChange={(e)=> setDuration(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Texte alternatif de l'image"
                            value={altEx}
                            onChange={(e)=> setAltEx(e.target.value)}
                        />
                        <button type="submit">Enregistrer le nouvel exercice</button>
                    </>
                    )}
                </form>
            </article>
        
    </section>
    
}

export default addProgram