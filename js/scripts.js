
eventListeners();
let listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //Boton para crear proyecto 
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
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
    //Inyectar el HTML 
    let nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = `
        <a href ="#">
            ${nombreProyecto} 
        </a>
    `;
    listaProyectos.appendChild(nuevoProyecto);
}