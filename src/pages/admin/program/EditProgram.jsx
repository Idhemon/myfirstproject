import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {selectUser} from "../../../redux/userSlice"
import {setPrograms} from "../../../redux/programSlice"
import {useNavigate, useParams} from "react-router-dom"
import {onlyOneProgram, updateOneProgram, displayPrograms} from "../../../api/program"
import {onlyOneExercise, updateOneExercise, displayExercises} from "../../../api/exercise"

import axios from 'axios'
import {config} from '../../../config'

const EditProgram = (props) => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    // States for program information
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [alt, setAlt] = useState("")
    const [selectFile, setSelectFile] = useState(null)
    const [ancientPict, setAncientPict] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    // States for exercise information
    const [nameEx, setNameEx] = useState("")
    const [descriptionEx, setDescriptionEx] = useState("")
    const [sets, setSets] = useState("")
    const [repetitions, setRepetitions] = useState("")
    const [duration, setDuration] = useState("")
    const [altEx, setAltEx] = useState("")
    const [exerciseId, setExerciseId] = useState(null)
    const [exercises, setExercises] = useState([])
    
    useEffect(() => {
        const token = window.localStorage.getItem("ggg-token")

        if (!token) {
            setError("Token non trouvé. Veuillez vous reconnecter.")
            return
        }
        onlyOneProgram(id, token)
        .then((res)=> {
            if(res && res.programs && res.programs.length > 0) {
                setName(res.programs[0].name || "")
                setDescription(res.programs[0].description || "")
                setPrice(res.programs[0].price || "")
                setAlt(res.programs[0].alt || "")
                setAncientPict(res.programs[0].picture || null)
            } 
            else {
                setError("Erreur au niveau de la récupération du programme : données manquantes.")
            }
        })
        .catch(err => {
            setError("Erreur au niveau de la récupération du programme")
        })
    },[id])    
    
    
    useEffect(()=> {
        const token = window.localStorage.getItem("ggg-token")

        if (!token) {
            setError("Token non trouvé. Veuillez vous reconnecter.")
            return
        }
        
        //Retrieving the exercises linked to the program
        displayExercises(id)
        .then((res)=> {
            if(res.status === 200){
                setExercises(res.result)
            }
        })
        .catch(err => {
            console.error(err)
            setError("Erreur au niveau de la récupération des exercices")
        })
    },[id])    
    
    useEffect(() => {
        if(exerciseId){
            onlyOneExercise(exerciseId)
            .then((res)=> {
                if(res && res.exercises && res.exercises.length > 0){
                    
                    setNameEx(res.exercises[0].nameEx || "")
                    setDescriptionEx(res.exercises[0].descriptionEx || "")
                    setSets(res.exercises[0].sets || "")
                    setRepetitions(res.exercises[0].repetitions || "")
                    setDuration(res.exercises[0].duration || "")
                    setAltEx(res.exercises[0].altEx || "")
                    setAncientPict(res.exercises[0].pictureEx || "")
                } 
                else {
                    console.error("La réponse de l'API ne contient pas les données attendues")
                    setError("Erreur au niveau de la récupération de l'exercice : données manquantes")
                }
            })
            .catch(err => {
                console.error("Erreur lors de la récupération de l'exercice :", err)
                setError("Erreur au niveau de la récupération de l'exercice")
            })
        }
    },[exerciseId])
    
    const updateProgram = async (datas) => {
        try {
            const update = await updateOneProgram(datas, id)
            if (update.status === 200) {
                const programsList = await displayPrograms()
                if(programsList.status === 200){
                    dispatch(setPrograms(programsList.result))
                    setSuccess("Programme mis à jour !")
                    setTimeout(() => {
                        navigate('/admin')
                    },2000)
                }
            }
        }
        catch(err) {
            console.error("Erreur d'édition du programme :", err)
            setError("Erreur de la mise à jour du programme !")
        }
    }
    
    const updateExercise = async (datas) => {
        try {
            const update = await updateOneExercise(datas, exerciseId)
            if (update.status === 200) {
                setSuccess("Exercice mis à jour !")
                setTimeout(() => {
                    navigate('/admin')
                },2000)
            }
            
        }
        catch(err) {
            console.error("Erreur d'édition de l'exercice :", err)
            setError("Erreur de la mise à jour de l'exercice !")
        }
    }
    
    const saveProgram = () => {
        const datas = {
            name,
            description,
            price,
            picture : selectFile ? selectFile.name : ancientPict,
            alt
        }
        
        if(selectFile) {
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
                    
                    datas.picture = res.data.url
                    
                    updateProgram(datas)
                }
            })
            .catch(err => {
                console.error("Problème de l'upload de l'image du programme :", err)
                setError("Une erreur est survenue lors de l'upload de l'image du programme.")
            })
        }
        else {
            updateProgram(datas)
        }
        
    }
    
    
    const saveExercise = () => {
        if(selectFile === null) {
            const datas = {
                nameEx,
                descriptionEx,
                sets,
                repetitions,
                duration,
                pictureEx : selectFile ? selectFile.name : ancientPict,
                altEx
            }
            updateExercise(datas)
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
                    updateExercise(datas)
                }
            })
            .catch(err => {
            console.error(err)
            setError("Une erreur est survenue lors de l'upload de l'image de l'exercice")
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
            saveProgram()
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
            saveExercise()
        }
    }
    
    return (
        <section id="editprogram">
            <h2>Modifier un programme</h2>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={onSubmitProgram}>
                <input
                    type="text"
                    placeholder="Nom du programme"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setSelectFile(e.target.files[0])}
                />
                <textarea
                    placeholder="Description du programme"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prix du programme"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Texte alternatif de l'image"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                />
                <button type="submit">Valider les modifications du programme</button>
            </form>

            {ancientPict && <img src={`${config.pict_url}${ancientPict}`} alt="Image actuelle" />}

            <h3>Modifier un exercice</h3>
            <form onSubmit={onSubmitExercise}>
                <select onChange={(e) => {
                const selectedExerciceId = e.target.value
                setExerciseId(selectedExerciceId)}}>
                    <option value="">Sélectionnez un exercice</option>
                    {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.nameEx}
                        </option>
                    ))}
                </select>

                {exerciseId && (
                    <>
                        <input
                            type="text"
                            placeholder="Nom de l'exercice"
                            value={nameEx}
                            onChange={(e) => setNameEx(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e) => setSelectFile(e.target.files[0])}
                        />
                        <textarea
                            placeholder="Description de l'exercice"
                            value={descriptionEx}
                            onChange={(e) => setDescriptionEx(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Nombre de séries"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Nombre de répétitions"
                            value={repetitions}
                            onChange={(e) => setRepetitions(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Durée du temps de repos"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Texte alternatif de l'image"
                            value={altEx}
                            onChange={(e) => setAltEx(e.target.value)}
                        />
                        <button type="submit">Valider les modifications de l'exercice</button>
                    </>
                )}
            </form>
        </section>
    )
    
}

export default EditProgram