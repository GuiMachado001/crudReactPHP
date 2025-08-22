import './Formulario.css';

import InputText from '../Inputs/inputText';
import ButtonSubmit from '../Buttons/ButtonSubmit';
import ButtonCancel from '../Buttons/ButtonCancel';

import { useRef } from 'react';
import Swal from 'sweetalert2';


function Formulario(){
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = formRef.current;
        const formData = {
            nome: form.nome.value,
            email: form.email.value,
            senha: form.senha.value,
        };
        
        console.log(formData);

        try {
            const response = await fetch(
            "http://localhost/crudReactPHP/crud-react-php/backend/app/action/action-usuario.php?acao=cadastrar",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
            );

            const result = await response.json();
            console.log("Resposta do PHP:", result);

            Swal.fire({
                title: "Cadastrado com sucesso",
                text: 'O usuário foi cadastrado com sucesso!!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                form.reset();
            });
            
        

        } catch (error) {
            console.log("Error: ", error);
        }
    };


    return(
        <section id='containerForm'>
            <form ref={formRef} id='formUsuario' onSubmit={handleSubmit}>

                <div className="containerNome">
                    <label htmlFor="" id='lblNome'>Nome: </label>
                    <InputText inputType='text' inputName="nome" inputId="nome" />
                </div>
                <div className="containerEmail">
                    <label htmlFor="" id='lblEmail'>E-mail: </label>
                    <InputText inputType='email' inputName='email' inputId='email' />
                </div>
                <div className="containerPassword">
                    <label htmlFor="" id='lblPassword'>Senha: </label>
                    <InputText inputType='password' inputName='senha' inputId='senha' />
                </div>

                <div className="containerBtn">
                    <ButtonCancel TextBtn="Cancelar"/>
                    <ButtonSubmit TextBtn="Salvar" />
                </div>
            </form>
        </section>

    );
}

export default Formulario