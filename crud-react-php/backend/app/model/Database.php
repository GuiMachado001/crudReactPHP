<?php


class Database{
    private $conn;
    private $table;

    private string $local;
    private string $db;
    private string $user;
    private string $password;

    function __construct($table = null){
        $this->table = $table;
        $this->set_conn();
        $this->conecta();
    }

    function set_conn(){
        $envPath = dirname(__DIR__, 2) . '/.env';
        $env = parse_ini_file($envPath);

        if(!$env){
            throw new Exception("Erro ao carregar o arquivo .env, verifique a sintaxe.");
        }

        $this->local=$env['DB_HOST'];
        $this->db=$env['DB_DATABASE'];
        $this->user=$env['DB_USER'];
        $this->password=$env['DB_PASSWORD'];
    }

    function conecta(){
        try{
            $this->set_conn();

            $this->conn = new PDO("mysql:host=".$this->local.";dbname=$this->db",$this->user,$this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $err){
            throw new Exception("Erro de conexão: " . $err->getMessage());
        }
    }

    public function execute($query, $binds = []){
        try{
            $stmt = $this->conn->prepare($query);
            $stmt->execute($binds);
            return $stmt;
        }catch(PDOException $err){
            throw new Exception("Erro de conexão: " . $err->getMessage());
        }
    }

    public function insert($values){
        $filds = array_keys($values);
        $binds = array_pad([], count($filds), '?');

        $query = 'INSERT INTO '.$this->table . '('.implode(',',$filds).') VALUES ('.implode(',',$binds).')';
        $res = $this->execute($query, array_values($values));

        if($res){
            return true;
        }else{
            return false;
        }
    }

    public function select($where = null, $order = null, $limit = null, $fields = '*'){
        $where = $where ? 'WHERE ' . $where : '';
        $order = $order ? 'ORDER BY ' . $order : '';
        $limit = $limit ? 'LIMIT ' . $limit : '';

        $query = 'SELECT '.$fields.' FROM '.$this->table. ' '.$where.' '.$order.' '.$limit ;
        return $this->execute($query);
    }

    public function delete($where){
        $query = 'DELETE FROM '.$this->table.' WHERE '.$where;

        $res = $this->execute($query);
        $res = $res->rowCount();

        if($res == 1){
            return true;
        }else{
            return false;
        }
    }

public function update($where, $array){
    $fields = array_keys($array); // ✅ CORRETO
    $values = array_values($array);

    // Monta a query: nome=?, email=?, ...
    $query = 'UPDATE '.$this->table.' SET '.implode('=?, ', $fields). '=? WHERE '.$where;

    return $this->execute($query, $values); // Passe os valores para o execute
}

}