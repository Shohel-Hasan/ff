import style from '../styles/MessageBox.module.css';

export default function MessageBox(props) {
    return (
        <div className={`${style.main_container} shadow d-flex flex-column`}>
            <div className={`${style.title}`}>{props.title}</div>

            <div className={`${style.bar} my-1`}></div>

            <div className={`${style.text}`}>{props.message}</div>
            <div className={`d-flex flex-row-reverse mt-2 ${style.button}`}>
                <button onClick={props.buttonCallback}>Okay</button>
            </div>
        </div>
    )
}