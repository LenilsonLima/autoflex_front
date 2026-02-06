import styles from './Modal.module.scss';
import { MdClose } from "react-icons/md";

const Modal = ({ title, function_1, function_2, close, text, text_btn_1, text_btn_2 }) => {
    return (
        <div className={styles.container_modal}>
            <div className={styles.area_modal}>
                <div className={styles.area_close}>
                    <span>{title}</span>
                    <MdClose onClick={close} />
                </div>
                <span>
                    {text}
                </span>
                <div className={styles.area_btn}>
                    <button onClick={function_1}>{text_btn_1}</button>
                    <button onClick={function_2}>{text_btn_2}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;