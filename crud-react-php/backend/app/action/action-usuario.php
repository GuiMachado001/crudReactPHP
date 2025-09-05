<?php
require_once __DIR__ . '/../controller/Usuario.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // ou "http://localhost:5173" durante dev
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$acao = $_GET['acao'] ?? '';

$usuario = new Usuario();

try {
    switch($acao){
        case 'cadastrar':
            $usuario->cadastrar($data);
            break;
        case 'editar':
            if(!isset($_GET['id'])){
                echo json_encode([
                    "status" => "error",
                    "message" => "ID do usuário não fornecido"
                ]);
                exit;
            }
            $usuario->id_usuario = (int) $_GET['id'];
            $usuario->editar($data);
            break;
        case 'excluir':
            $usuario->id_usuario = $_GET['id'];
            $usuario->excluir();
            break;
        case 'listar':
            $usuario->listar();
            break;
        default:
            echo json_encode([
                "status" => "error",
                "message" => "Ação inválida"
            ]);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

