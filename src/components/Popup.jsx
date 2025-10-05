import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import biceps from "../assets/images/Biceps-popup.png"

const Popup = (props) => {
    return (
        <section id="popup">
            <p
                onClick={(e) => {
                props.onClickClose()
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </p>
            <h3>{props.msg}</h3>
            <img src ={biceps} alt = "Dieu Grec montrant son biceps" />
            <button
                onClick={(e) => {
                props.onClickClose()
                }}
            >
                Retour aux achats
            </button>
        </section>
        )
}

export default Popup