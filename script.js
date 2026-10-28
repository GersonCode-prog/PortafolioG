// =========================================================
// MENU RESPONSIVE
// =========================================================
var menuVisible = false;

// Función que oculta o muestra el menú
function mostrarOcultarMenu(){
    var nav = document.getElementById("nav");
    menuVisible = !menuVisible;
    if(menuVisible){
        nav.classList.add("responsive");
    }else{
        nav.classList.remove("responsive");
    }
}

// Oculta el menú una vez que se selecciona una opción
function seleccionar(){
    document.getElementById("nav").classList.remove("responsive");
    menuVisible = false;
}

// Cierra el menú si se hace clic fuera de él
document.addEventListener("click", function(e){
    if(!menuVisible) return;
    var nav = document.getElementById("nav");
    var boton = document.querySelector(".nav-responsive");
    if(!nav.contains(e.target) && !boton.contains(e.target)){
        seleccionar();
    }
});

// =========================================================
// BARRAS DE HABILIDADES
// Lee el porcentaje escrito en cada barra (<span>45%</span>),
// así ya no hace falta una clase/keyframe por cada skill.
// =========================================================
var habilidadesAnimadas = false;

function efectoHabilidades(){
    if(habilidadesAnimadas) return;

    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if(distancia_skills >= 300){
        var barras = document.querySelectorAll(".skills .progreso");
        for(var i = 0; i < barras.length; i++){
            var etiqueta = barras[i].querySelector("span");
            var valor = etiqueta ? etiqueta.textContent.trim() : "0%";
            barras[i].style.width = valor;
            barras[i].classList.add("animar");
        }
        habilidadesAnimadas = true;
    }
}

// =========================================================
// HEADER Y LINK ACTIVO SEGÚN LA SECCIÓN VISIBLE
// =========================================================
function actualizarHeader(){
    var header = document.querySelector(".contenedor-header");
    if(window.pageYOffset > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }
}

function marcarLinkActivo(){
    var secciones = document.querySelectorAll("section[id]");
    var links = document.querySelectorAll("#nav a");
    var posicion = window.pageYOffset + 120;
    var actual = "";

    for(var i = 0; i < secciones.length; i++){
        if(secciones[i].offsetTop <= posicion){
            actual = secciones[i].id;
        }
    }
    for(var j = 0; j < links.length; j++){
        if(links[j].getAttribute("href") === "#" + actual){
            links[j].classList.add("activo");
        }else{
            links[j].classList.remove("activo");
        }
    }
}

// =========================================================
// ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// =========================================================
var elementosRevelar = [];

function prepararRevelar(){
    var selector = ".sobremi .col, .skills .col, .curriculum .item, .portfolio .proyecto, .contacto .col";
    var nodos = document.querySelectorAll(selector);
    for(var i = 0; i < nodos.length; i++){
        nodos[i].classList.add("revelar");
        elementosRevelar.push(nodos[i]);
    }
}

function revelarElementos(){
    var limite = window.innerHeight - 80;
    for(var i = elementosRevelar.length - 1; i >= 0; i--){
        if(elementosRevelar[i].getBoundingClientRect().top < limite){
            elementosRevelar[i].classList.add("visible");
            elementosRevelar.splice(i, 1);
        }
    }
}

// =========================================================
// SCROLL (con requestAnimationFrame para no saturar)
// =========================================================
var esperandoFrame = false;

function alHacerScroll(){
    efectoHabilidades();
    actualizarHeader();
    marcarLinkActivo();
    revelarElementos();
    esperandoFrame = false;
}

window.addEventListener("scroll", function(){
    if(!esperandoFrame){
        esperandoFrame = true;
        (window.requestAnimationFrame || setTimeout)(alHacerScroll, 16);
    }
});

// =========================================================
// RELOJ
// =========================================================
function actualizarReloj(){
    var ahora = new Date();

    var hora = ahora.getHours();
    var minuto = ahora.getMinutes();
    var segundo = ahora.getSeconds();
    var ampm = hora >= 12 ? "PM" : "AM";
    var horaMostrar = hora % 12 || 12; // Formato de 12 horas

    document.getElementById("hora").textContent = dosDigitos(horaMostrar);
    document.getElementById("minuto").textContent = dosDigitos(minuto);
    document.getElementById("segundo").textContent = dosDigitos(segundo);
    document.getElementById("ampm").textContent = ampm;

    var opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    document.getElementById("fecha").textContent = ahora.toLocaleDateString("es-GT", opciones);
}

function dosDigitos(n){
    return (n < 10 ? "0" : "") + n;
}

// =========================================================
// INICIO
// =========================================================
prepararRevelar();
actualizarReloj();
setInterval(actualizarReloj, 1000);
alHacerScroll(); // aplica estados correctos si la página carga a mitad del scroll
