<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'] ?? '';
$expertise = $data['expertise'] ?? 'General Hacker';
if (empty($name)) {
    echo json_encode(["status" => "error", "message" => "Name is required"]);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "learnweb");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO hackers (name_, expertise) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $expertise);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Hacker $name created via PHP."]);
} else {
    echo json_encode(["status" => "error", "message" => "DB Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>