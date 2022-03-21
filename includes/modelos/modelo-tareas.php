<?php 

$accion = $_POST['accion'];
$id_proyecto = isset(($_POST['id_proyecto'])) ? (int) $_POST['id_proyecto']: ''; //Operador ternario (if en una línea)
$tarea =  isset($_POST['tarea']) ?  $_POST['tarea']: '';
$estado = isset($_POST['estado']) ? (int) $_POST['estado']: '';
$id_tarea = isset($_POST['id']) ? (int) $_POST['id']: '';

if ($accion === 'crear') {
    //Código para crear los proyectos
    //importar la conexion 
    include '../funciones/conexion.php';
    try {
        //Realizar la consulta a la base de datos
        $stmt = $conn->prepare("INSERT INTO Tarea (tarNombre, proId) VALUES (?,?)");
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_proyecto'=> $id_proyecto,
                'tipo'=>$accion,
                'tarea' => $tarea
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

//Actualización del estado de una tarea 
if ($accion === 'actualizar') {
    //importar la conexion 
    include '../funciones/conexion.php';
    try {
        //Realizar la consulta a la base de datos
        $stmt = $conn->prepare("UPDATE Tarea SET tarEstado = ? WHERE tarId = ?");
        $stmt->bind_param('ii', $estado, $id_tarea);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $respuesta = array(
                'respuesta' => 'correcto'
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

//Eliminar una tarea 
if ($accion === 'eliminar') {
    //importar la conexion 
    include '../funciones/conexion.php';
    try {
        //Realizar la consulta a la base de datos
        $stmt = $conn->prepare("DELETE FROM Tarea WHERE tarId = ?");
        $stmt->bind_param('i', $id_tarea);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $respuesta = array(
                'respuesta' => 'correcto'
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