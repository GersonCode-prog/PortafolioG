let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

function actualizarReloj() {
    const ahora = new Date();

    const hora = ahora.getHours();
    const minuto = ahora.getMinutes();
    const segundo = ahora.getSeconds();
    const ampm = hora >= 12 ? 'PM' : 'AM';

    const horaMostrar = hora % 12 || 12; // Formato de 12 horas

    document.getElementById('hora').textContent = horaMostrar.toString().padStart(2, '0');
    document.getElementById('minuto').textContent = minuto.toString().padStart(2, '0');
    document.getElementById('segundo').textContent = segundo.toString().padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', options);
    document.getElementById('fecha').textContent = fecha;
}


actualizarReloj(); // Llamar a la función para mostrar la hora actual al cargar la página

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);
