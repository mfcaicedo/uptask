<?php 

    $accion = $_POST['accion'];
    $password = $_POST['password'];
    $usuario = $_POST['usuario'];

    if ($accion === 'crear') {
        //Código para crear los admistradores 

        //hashear password 
        $opciones = array(
            'cost'=> 12 //12 opciones nos da una buena seguridad 
        );
        //password_hash -> valor a aplicar hash, función de hash y arreglo de opciones
        $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

        //importar la conexion 
        include '../funciones/conexion.php';
        try {
            //Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO usuario (usuUsuario, usuPassword) VALUES (?,?)");
            $stmt->bind_param('ss', $usuario, $hash_password);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado'=> $stmt->insert_id,
                    'tipo'=>$accion
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

    //verificar si funciona 
    if ($accion === 'login') {
        //escribir el código que loguee a los administradores 
        include '../funciones/conexion.php';
        try{
            //Seleccionar el administrador de la base de datos
            $stmt = $conn->prepare("SELECT usuId, usuUsuario, usuPassword FROM Usuario WHERE usuUsuario = ?");
            $stmt->bind_param('s', $usuario);
            $stmt->execute();
            //logear el usuario 
            $stmt->bind_result($id_usuario, $nombre_usuario, $password_usuario);//trae el resultado pero asinga las 3 variables 
            $stmt->fetch();

            if ($nombre_usuario) {
                //El usuario existe, verificar el password 
                if(password_verify($password, $password_usuario)){
                   session_start();
                   $_SESSION['nombre'] = $usuario; 
                   $_SESSION['id'] = $id_usuario;
                   $_SESSION['login'] = true;

                    //login correcto 
                    $respuesta = array(
                        'respuesta' => 'correcto',
                        'nombre' => $nombre_usuario,
                        'tipo' => $accion
                    );
                }else{
                    //login incorrecto, enviar error
                    $respuesta = array(
                        'resultado' => 'Password incorrecto'
                    );
                }
            }else{
                $respuesta = array(
                    'error' => 'Usuario no existe'
                );
            }

            $stmt->close();
            $conn->close();
        }catch (Exception $e) {
            //En caso de error, tomar la excepción 
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);

    }


?>