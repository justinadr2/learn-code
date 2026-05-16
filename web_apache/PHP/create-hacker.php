<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'] ?? '';

if (empty($name)) {
    echo "Error: Name is empty";
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "learnweb");

if ($conn->connect_error) {
    die("Database Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO hackers (name_) VALUES (?)");
$stmt->bind_param("s", $name);

if ($stmt->execute()) {
    $targetDir = "../hacker/" . $name; 
    
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true); 
    }

    $filePath = $targetDir . "/index.html";
    
    $htmlContent = "
    <html>
    <head>
    </head>
    <body style='background:#000; color:#0f0; font-family:monospace; padding:20px;'>
        <h1> Hacker $name created via PHP </h1>
        <hr>
        <a href='/hacker.html' style='color:#0f0;'> [ Back ] </a>
    </body>
    </html>";

    if (file_put_contents($filePath, $htmlContent)) {
        echo "Created /hacker/$name/index.html";
    } else {
        echo "DB Success, but file write failed. Check Apache permissions.";
    }

} else {
    echo "Database Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>