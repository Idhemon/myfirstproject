import {useSelector, useDispatch} from 'react-redux'
import {selectPrograms} from '../redux/programSlice'
import ArticleProgram from '../components/Article-program'
import {useEffect} from 'react'
import {selectCart, updateCart} from '../redux/cartSlice'

const Program = () => {
    //Retrieving programs from Redux store
    const programmes = useSelector(selectPrograms)
    const cart = useSelector(selectCart)
    const dispatch = useDispatch()
    useEffect(() => {
        const savedCart = JSON.parse(window.localStorage.getItem("GGG-cart"))
        if(savedCart && Array.isArray(savedCart)) {
            dispatch(updateCart(savedCart))
        } else {
            dispatch(updateCart([]))
        }
    },[dispatch])
    
    return (
        <section id="program">
            <h2>Découvres nos programmes sportifs</h2>
            {/*If the program list is not empty, loop over it*/}
            {programmes.programs && programmes.programs.length > 0 && (
                <ul>
                    {programmes.programs.map((program) => (
                        <ArticleProgram key={program.id} program={program}/>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default Program