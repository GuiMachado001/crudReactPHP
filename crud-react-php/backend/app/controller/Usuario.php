<?php

require_once __DIR__ . '/../model/Database.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // ou "http://localhost:5173" durante dev
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

class Usuario{
    public int $id_usuario;
    public string $nome;
    public string $email;
    public string $senha;

    public function cadastrar($data){
        $db = new Database('usuario');

        if($data){
            $nome = $data["nome"];
            $email = $data["email"];
            $senha = $data["senha"];

            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

            $res = $db->insert([
                'nome' => $nome,
                'email' => $email,
                'senha' => $senha_hash
            ]);

            $response = [
                "status" => "success",
                "message" => "Usuário cadastrado com sucesso",
                "dados" => $data
            ];
            
            echo json_encode($response);
        }else{
            echo json_encode([
                "status" => "error",
                "message" => "Nenhum dado recebido",
            ]);
        }


    }
}