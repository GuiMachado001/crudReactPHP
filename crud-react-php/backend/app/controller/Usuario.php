<?php

require_once __DIR__ . '/../model/Database.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // ou "http://localhost:5173" durante dev
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Usuario {
    public int $id_usuario;
    public string $nome;
    public string $email;
    public string $senha;

    // Cadastrar usuário
    public function cadastrar($data) {
        $db = new Database('usuario');

        if ($data) {
            $nome = $data["nome"];
            $email = $data["email"];
            $senha = $data["senha"];

            // Criptografa a senha
            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

            $res = $db->insert([
                'nome' => $nome,
                'email' => $email,
                'senha' => $senha_hash
            ]);

            $response = [
                "status" => "success",
                "message" => "Usuário cadastrado com sucesso",
                "dados" => [
                    "id" => $res, // id retornado do insert
                    "nome" => $nome,
                    "email" => $email
                ]
            ];
            
            echo json_encode($response);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Nenhum dado recebido",
            ]);
        }
    }

    // Listar usuários
    public function listar() {
        $db = new Database('usuario');

        try {
            // Buscar todos os usuários
            $res = $db->select()->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                "status" => "success",
                "data" => $res
            ]);
        } catch (Exception $e) {
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }

public function excluir() {
    try {
        $db = new Database('usuario');
        $res = $db->delete('id_usuario = ' . $this->id_usuario);

        echo json_encode([
            "status" => "success",
            "data" => $res
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}

public function editar($data){
    if(!$this->id_usuario) {
        echo json_encode([
            "status" => "error",
            "message" => "ID do usuário não definido"
        ]);
        return;
    }

    try {
        $db = new Database('usuario');

        $res = $db->update('id_usuario = '.$this->id_usuario, [
            'nome' => $data['nome'],
            'email' => $data['email']
        ]);

        echo json_encode([
            "status" => "success",
            "message" => "Usuário atualizado com sucesso"
        ]);
    } catch(Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}



    
}
