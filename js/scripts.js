
eventListeners();
let listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){

    //Document Ready 
    document.addEventListener('DOMContentLoaded', function(){
        actualizarProgreso();
    });

    //Boton para crear proyecto 
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    //Boton para una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click',agregarTarea);

    //Botones para las acciones de las tareas 
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
}

//FUNCIONES 
function nuevoProyecto(e){
    e.preventDefault();
    
    //Crea un input para el nombre del nuevo proyecto 
    let nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type = "text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    //Selecionar el ID con el nuevo proyecto 
    let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
    //al presionar enter crear el proyecto 
    inputNuevoProyecto.addEventListener('keypress', function(e){
        let teclaPresionada = e.key;

        if(teclaPresionada == 'Enter'){
            guardarProyectoDB(inputNuevoProyecto.value); 
            listaProyectos.removeChild(nuevoProyecto); //quito el input porque ya guardé todo       
        }
    });
}
function guardarProyectoDB(nombreProyecto){
   //crear el llamado a ajax 
   const xhr = new XMLHttpRequest();

    //enviar los datos por formData
    let datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

   //abrir la conexion 
   xhr.open('POST', 'includes/modelos/modelo-proyecto.php', true);

   //En la carga 
   xhr.onload = function(){
       if (this.status === 200) {
           //obtener los datos de la respuesta
           let respuesta = JSON.parse(xhr.responseText);
           let proyecto = respuesta.nombre_proyecto,
               id_proyecto = respuesta.id_proyecto,
               tipo = respuesta.tipo,
               resultado = respuesta.respuesta;

            //Comprobar la inserción 
            if(resultado === 'correcto'){
                //fue exitoso 
                if (tipo === 'crear') {
                    //se creo un nuevo proyecto 
                    //inyectar en el HTML 
                    let nuevoProyecto = document.createElement('li'); 
                    nuevoProyecto.innerHTML = `
                        <a href= "index.php?id_proyecto = ${id_proyecto}" id=proyecto:"${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;
                    //Agregar al html 
                    listaProyectos.appendChild(nuevoProyecto);

                    //enviar alerta 
                    Swal.fire({
                        icon: 'success',
                        title: 'Correcto!',
                        text: 'El proyecto: '+ proyecto + ' se creó correctamente!'
                    })
                    .then(resultado =>{
                          //redireccionar a la nueva URL 
                        if (resultado.value) {
                            window.location.href = 'index.php?id_proyecto='+ id_proyecto;
                        }
                    });

                }else{
                     //actualización o eliminar 
                }
            }else{
                //Hubo un error 
                Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Hubo un error!'
                });
            }
       }
    
   }

   //enviar los datos 
   xhr.send(datos);
}

//Agregar una nueva tarea al proyecto actual 
function agregarTarea(e){
    e.preventDefault();
    let nombreTarea = document.querySelector('.nombre-tarea').value;
    //Validar que le campo tenga algo escrito 
    if (nombreTarea === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Una tarea no puede ir vacía!'
            });
    }else{
        //Insertar en PHP 
        //Crear el llamado a ajax 
        let xhr = new XMLHttpRequest();

        //Crear el Fordate para guardar la info del form
        let datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        //Abrir la conexion 
        xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);

        //Ejecutar  y respuesta 
        xhr.onload = function(){
            if(this.status === 200){
                //todo correcto 
                let respuesta = JSON.parse(xhr.responseText);
                
                let resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_proyecto = respuesta.id_proyecto,
                    tipo = respuesta.tipo;

                if (resultado === 'correcto') {
                    //se agregó correctamente
                    if(tipo === 'crear'){
                        //lanzar la alerta 
                        Swal.fire({
                            icon: 'success',
                            title: 'Correcto!',
                            text: 'La tarea '+ tarea +' fue agregada correctamente!'
                        });

                        //Seleccionar el parrafo con la lista vacía 
                        let parrafoListaVacia = document.querySelectorAll('.lista-vacia');
                        if(parrafoListaVacia.length > 0){
                            document.querySelector('.lista-vacia').remove();
                        }

                        //Construir el template 
                        let nuevaTarea = document.createElement('li'); 

                        //agregamos el id 
                        nuevaTarea.id = 'tarea:'+id_proyecto; //se le coloca un id al li

                        //agregar la clase tarea 
                        nuevaTarea.classList.add('tarea'); //se le coloca una clase al li 

                        //construir el HTML 
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>
                        `;

                        //agregarlo al HTML 
                        let listado = document.querySelector('.listado-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        //limpiar el formulario 
                        document.querySelector('.agregar-tarea').reset();
                        
                        //actualizar el progreso de las tareas;
                        actualizarProgreso();
                    }

                }else{
                    //hubo un error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Hubo un error!'
                    });
                }
            }
        }

        //Enviar la consulta 
        xhr.send(datos);
    }
}

//Cambia el estado de las tareas o las eimina 
function accionesTareas(e){
    e.preventDefault();
    //esto se conoce como delagation 
    if(e.target.classList.contains('fa-check-circle')){
        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }
    else if(e.target.classList.contains('fa-trash')){
        Swal.fire({
            title: 'Estas seguro(a)?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
              if (result.value) {
                let tareaEliminar = e.target.parentElement.parentElement;

                //borrar de la DB   
                eliminarTareaDB(tareaEliminar);
    
                //borrar del HTML
                tareaEliminar.remove();
              }
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'La tarea fue eliminada!',
                'success'
              )
            }
          })
    }
}

//Completa o descompleta la tarea 
function cambiarEstadoTarea(tarea, estado){
    let idTarea = tarea.parentElement.parentElement.id.split(':');
   
    //crear el llamado a ajax 
    let xhr = new XMLHttpRequest();
    //informacion FormData
    let datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    //abrir la conexion 
    xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);
    //on load 
    xhr.onload = function(){
        if(this.status === 200){
           // console.log(xhr.responseText);
           let respuesta = JSON.parse(xhr.responseText);
           //actualizar el progreso de las tareas 
           actualizarProgreso();
        }
    }
    //enviar la petición 
    xhr.send(datos);
}

//Elimina las tareas de la base de datos 
function eliminarTareaDB(tarea){
    let idTarea = tarea.id.split(':');
   
    //crear el llamado a ajax 
    let xhr = new XMLHttpRequest();
    //informacion FormData
    let datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');
   
    //abrir la conexion 
    xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);
    //on load 
    xhr.onload = function(){
        if(this.status === 200){
           // console.log(xhr.responseText);
           let respuesta = JSON.parse(xhr.responseText);
           // console.log(respuesta);
           
           //Comprobar que haya tareas restantes 
           let listaTareasRestantes = document.querySelectorAll('li.tarea');
           if (listaTareasRestantes.length === 0) {
               document.querySelector('.listado-pendientes ul').innerHTML = "<h1 class='lista-vacia'> No hay tareas en el proyecto </h1>"
           }
           //actualizar el progreso de las tareas;
           actualizarProgreso();
        }
    }
    //enviar la petición 
    xhr.send(datos);
}

//Actualiza el avance del proyecto 
function actualizarProgreso(){
    //Obtener todas las tareas 
    const tareas = document.querySelectorAll('li.tarea');
    //Obtener las tareas completadas 
    const tareasCompletadas = document.querySelectorAll('i.completo');

    //Determinar el avance 
    const avance = Math.round((tareasCompletadas.length / tareas.length)*100);

    //Asignar el avance a la barra 
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance+'%';

    //Mostrar una alerta el completar las tareas al 100% 
    if(avance === 100){
        Swal.fire({
            icon: 'success',
            title: 'Terminado!',
            text: 'Ya no tienes tareas pendientes!'
        });
    }
}