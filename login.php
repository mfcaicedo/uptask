<?php 

    include 'includes/funciones/funciones.php';
    include 'includes/templates/header.php';
    //debemos abrir la sesión para tener la información del usuario logeado 
    session_start(); //trae los datos existentes del usuario que ha iniciado sesión 
    //cerramos la sesión 
    if (isset($_GET['cerrar_sesion'])) {
        $_SESSION = array(); //con esto cierro la sesión 
    }
?>

    <div class="contenedor-formulario">
        <h1>UpTask</h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="crear-cuenta.php">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

<?php 

    include 'includes/templates/footer.php';

?>