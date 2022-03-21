<?php  

    function obtenerPaginaActual(){
        $archivo = basename($_SERVER['PHP_SELF']); //me dice el archivo en el que se está ejecutando (ej: index.php)
        $pagina = str_replace(".php", "", $archivo);
        return $pagina; 
    }

?>