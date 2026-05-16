
<?php

if (isset($_POST['user'])) {
    $username = $_POST['user'] . PHP_EOL;
    
    file_put_contents('../users.txt', $username, FILE_APPEND | LOCK_EX);

} else {
    echo "No user data received.";
}

?>