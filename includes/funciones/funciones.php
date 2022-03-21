<?php  
    //Obtiene la página actual que se ejecuta 
    function obtenerPaginaActual(){
        $archivo = basename($_SERVER['PHP_SELF']); //me dice el archivo en el que se está ejecutando (ej: index.php)
        $pagina = str_replace(".php", "", $archivo);
        return $pagina; 
    }

    /*CONSULTAS */

    //Ontener todos los proyectos 
    function obtenerProyectos(){
        include 'conexion.php';
        try {
            return $conn->query("SELECT proId, proNombre FROM Proyecto");
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    //Obtener el nombre del proyecto 
    function obtenerNombreProyecto($id = null){
        include 'conexion.php';
        try {
            return $conn->query("SELECT proNombre FROM Proyecto WHERE proId = {$id}");
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    //Obtener las tareas para cada proyecto 
    function obtenerTareasProyecto($id_proyecto = null){
        include 'conexion.php';
        try {
            return $conn->query("SELECT tarId, tarNombre, tarEstado FROM Tarea WHERE proId = {$id_proyecto}");
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

?>