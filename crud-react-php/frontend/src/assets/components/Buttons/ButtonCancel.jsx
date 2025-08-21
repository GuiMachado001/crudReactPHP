import './Buttons.css';

function ButtonCancel(props){
    return(
        <button type='reset' name={props.nameBtn} id={props.inBtn}>{props.TextBtn}</button>
    );
}

export default ButtonCancel