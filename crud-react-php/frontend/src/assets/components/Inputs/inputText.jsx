import './Inputs.css';

function InputText(props){
    return(
        <input type={props.inputType} name={props.inputName} id={props.inputId}/>
    );
}

export default InputText