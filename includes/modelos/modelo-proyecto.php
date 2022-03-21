<?php 

    $accion = $_POST['accion'];
    $proyecto = $_POST['proyecto'];

    if ($accion === 'crear') {
        //Código para crear los proyectos
        //importar la conexion 
        include '../funciones/conexion.php';
        try {
            //Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO Proyecto (proNombre) VALUES (?)");
            $stmt->bind_param('s', $proyecto);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_proyecto'=> $stmt->insert_id,
                    'tipo'=>$accion,
                    'nombre_proyecto' => $proyecto
                );
            }else{
                $respuesta = array(
                    'respuesta' => 'error'
                );
            }
            $stmt->close();
            $conn->close();

        } catch (Exception $e) {
            //En caso de error, tomar la excepción 
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }

?>