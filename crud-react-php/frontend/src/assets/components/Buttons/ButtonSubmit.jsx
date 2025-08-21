import './Buttons.css';

function ButtonSubmit(props){
    return(
        <button type='submit' name={props.nameBtn} id={props.inBtn}>{props.TextBtn}</button>
    );
}

export default ButtonSubmit