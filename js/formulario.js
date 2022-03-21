eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit',validarRegistro);

}

//FUNCIONES 
function validarRegistro(e){
    e.preventDefault();//evita que el formulario se envíe (evita que se ejecuten acciones posteriores)

    let usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
    
    if(usuario === '' || password == ''){
         //campos incompletos 
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios!'
          });          
    }else{
        //ambos campos son correctos, ejecutar ajax
        //datos que se envían al servidor 
        let datos = new FormData(); //guardado array como clave/valor
        datos.append('usuario',usuario);
        datos.append('password',password);
        datos.append('accion',tipo);

        //crear el llamado a ajax 

        //objeto ajax
        let xhr = new XMLHttpRequest();

        //abrir la conexion 
        xhr.open('POST', 'includes/modelos/modelo-admin.php', true);

        //retorno de datos 
        xhr.onload = function(){
            if (this.status === 200) {
                // console.log(JSON.parse(xhr.responseText));   
                let respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                //mostramos notifiación de correcto 
                if (respuesta.respuesta === 'correcto') {
                    //si es un nuevo usuario 
                    if (respuesta.tipo === 'crear') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Correcto!',
                            text: 'Usuario creado correctamente!'
                        }); 
                    }else if(respuesta.tipo == 'login'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Login correcto!',
                            text: 'Presiona OK para acceder al sistema!'
                        })
                        .then(resultado =>{//arrow function (=> funtion(resultado){})
                            if (resultado.value) {
                                window.location.href = 'index.php';
                            }
                        });
                    }
                }else{
                    //hubo un error 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Hubo un error!'
                    }); 
                }
                //limpio los campos 

            }
        }

        //enviar la petición 
        xhr.send(datos);

    }

}