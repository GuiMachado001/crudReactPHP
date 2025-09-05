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

    const ExcluirUsuario = async (id) =>{
        const response = await fetch(
            "http://localhost/crudReactPHP/crud-react-php/backend/app/action/action-usuario.php?acao=excluir&id="+id
        );

        const result = await response.json();

        if(result.status === "success"){
            console.log("Excluido com sucesso");
            setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
        }else(
            console.error(result.message)
        )
    }

const [modalAberto, setModalAberto] = useState(false);
const [usuarioAtual, setUsuarioAtual] = useState({
  id_usuario: "",
  nome: "",
  email: ""
});

const abrirModal = (usuario) => {
  setUsuarioAtual(usuario);
  setModalAberto(true);
};

const salvarEdicao = async () => {
    try {
        const response = await fetch(
            `http://localhost/crudReactPHP/crud-react-php/backend/app/action/action-usuario.php?acao=editar&id=${usuarioAtual.id_usuario}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioAtual)
            }
        );

        const result = await response.json();

        if(result.status === "success"){
            setUsuarios(prev => prev.map(u => u.id_usuario === usuarioAtual.id_usuario ? usuarioAtual : u));
            setModalAberto(false);
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Erro ao editar usuário", error);
    }
};
    useEffect(() => {
        carregarUsuarios();
    }, []);

return (
  <>
    <section>
      <h2>Lista de Usuários</h2>
      <table border="1" cellPadding="5" style={{ color: "#fff" }}>
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
                <td>
                  <button onClick={()=> ExcluirUsuario(usuario.id_usuario)}>Excluir</button>
                  <button onClick={() => abrirModal(usuario)}>Editar</button>
                </td>
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

    {modalAberto && (
      <div className="modal">
        <div className="modal-content">
          <h3>Editar Usuário</h3>
          <label>Nome:</label>
          <input
            type="text"
            value={usuarioAtual.nome}
            onChange={(e) => setUsuarioAtual({...usuarioAtual, nome: e.target.value})}
          />
          <label>Email:</label>
          <input
            type="email"
            value={usuarioAtual.email}
            onChange={(e) => setUsuarioAtual({...usuarioAtual, email: e.target.value})}
          />
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={() => setModalAberto(false)}>Cancelar</button>
        </div>
      </div>
    )}
  </>
);

}

export default ListarUsuarios;
