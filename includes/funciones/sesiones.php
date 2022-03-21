<?php 

    function usuario_autenticacion(){
        if (!revisar_usuario()) {
            header('Location: login.php');
            exit();
        }
    }
    function revisar_usuario(){
        return isset($_SESSION['nombre']);
    }
    session_start();// para iniciar una sesión 
    usuario_autenticacion(); // autenticación de una sesión 

?>