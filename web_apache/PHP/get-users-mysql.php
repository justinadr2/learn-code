<?php
header('Content-Type: application/json');

$host = '127.0.0.1';
$user = 'root';      
$pass = '';      
$db   = 'learnweb'; 
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     
     $stmt = $pdo->query("SELECT name_ FROM users");
     $users = $stmt->fetchAll();

     echo json_encode($users);

} catch (\PDOException $e) {
     echo json_encode(['error' => $e->getMessage()]);
     http_response_code(500);
}
?>