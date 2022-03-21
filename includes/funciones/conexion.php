<?php

//Credenciales de la base de dato s
// define('DB_USUARIO', 'root');
// define('DB_PASSWORD', 'root');
// define('DB_HOST', 'localhost');
// define('DB_NOMBRE', 'uptask');
// $conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);
$conn = new mysqli('localhost','root', 'root', 'uptask');
//echo $conn->ping(); //->pruebo si la conexión es correcta (impresión 1 correcto)
//para los asentos y las ñ 
$conn->set_charset('uft8');

?>