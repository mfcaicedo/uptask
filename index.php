<?php 

    //Login 
    include 'includes/funciones/sesiones.php';
    include 'includes/funciones/funciones.php';
    include 'includes/templates/header.php';
    include 'includes/templates/barra.php';

    //Obtener el ID de la URL 
    if (isset($_GET['id_proyecto'])) {
        $id_proyecto = $_GET['id_proyecto'];

    }

?>

<div class="contenedor">
    <?php 
        include 'includes/templates/sidebar.php';
    ?>

    <main class="contenido-principal">
      
            <?php    
            if(isset($id_proyecto)): ?>
                <h1>Proyecto actual: 
                    <?php 
                    $resultado = obtenerNombreProyecto($id_proyecto);
                    $nombre = $resultado->fetch_assoc(); ?>
                    <span><?php echo $nombre['proNombre']; ?></span>
                </h1>

                <form action="#" class="agregar-tarea">
                    <div class="campo">
                        <label for="tarea">Tarea:</label>
                        <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                    </div>
                    <div class="campo enviar">
                        <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                        <input type="submit" class="boton nueva-tarea" value="Agregar">
                    </div>
                </form>
        <?php 
            else:
                echo "<h1> Selecciona un proyecto a la izaquierda </h1>"; 
            endif; ?>
    
        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
                <?php 
                //llamo a la función que me consulta las tareas del proyecto actual
                if(isset($id_proyecto)):
                    $tareas = obtenerTareasProyecto($id_proyecto);
                    if ( $tareas->num_rows > 0 ):
                        foreach ($tareas as $tarea): ?>
                            <li id="tarea:<?php echo $tarea['tarId'] ?>" class="tarea">        
                                <p><?php echo $tarea['tarNombre']; ?></p>
                                <div class="acciones">
                                    <i class="far fa-check-circle <?php echo ($tarea['tarEstado']) === '1' ? 'completo': '' ?>"></i>
                                    <i class="fas fa-trash"></i>
                                </div>
                            </li>  
                    <?php endforeach ?>
                    <?php     
                    else:
                        echo "<h1 class='lista-vacia'> No hay tareas en el proyecto </h1>";
                    endif; ?>
                <?php 
                else:
                    echo "<h1> Sin tareas </h1>"; 
                endif; ?>
                   
            </ul>
        </div>

        <div class="avance">
            <h2>Avance del proyecto</h2>
            <div class="barra-avance" id="barra-avance">
                <div class="porcentaje" id="porcentaje">
                    
                </div>
            </div>
        </div>

    </main>
</div><!--.contenedor-->

<?php 

    include 'includes/templates/footer.php';

?>