import './ListarUsuarios.css';
import { useEffect, useState } from 'react';

function ListarUsuarios(){
    const [usuarios, setUsuarios] = useState([]);

    const carregarUsuarios = async () => {
        try {
            const response = await fetch(
                "http://localhost/crudReactPHP/crud-react-php/backend/app/action/action-usuario.php?acao=listar"
            );
            const result = await response.json();

            if (result.status === "success") {
                setUsuarios(result.data);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Erro ao carregar usuários", error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <section>
            <h2>Lista de Usuários</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhum usuário cadastrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default ListarUsuarios;
