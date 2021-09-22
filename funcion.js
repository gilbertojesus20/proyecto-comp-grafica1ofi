var canvas = document.querySelector("canvas");
var contexto = canvas.getContext("2d");
var ancho = canvas.width;
var alto = canvas.height;

llenarBlanco(contexto, ancho, alto)

var global = {
    relleno: [255, 0, 0],
    borde: [0, 0, 0],
    figura: "Triángulo"
}

pintarSeleccionado(global.figura)

function pintarSeleccionado(figura){
    var r = 30
    switch (figura) {
        case "Triángulo":
            actualizar(contexto,ancho, alto, ()=>dibujarPoligonoRegular(contexto, 3, r));
            break;
        case "Cuadrado":
            actualizar(contexto,ancho, alto, ()=>dibujarPoligonoRegular(contexto, 4, r));
            break;
        case "Pentágono":
            actualizar(contexto,ancho, alto, ()=>dibujarPoligonoRegular(contexto, 5, r));
            break;
        case "Hexágono":
            actualizar(contexto,ancho, alto, ()=>dibujarPoligonoRegular(contexto, 6, r));
            break;
        case "Círculo":
            actualizar(contexto,ancho, alto, ()=>circuloBresenham(contexto, ancho/2, alto/2, r));
            break;
    }
}

function actualizar(contexto, ancho, alto, f) {
    llenarBlanco(contexto, ancho, alto)
    contexto.fillStyle = arrARGB(global.borde);
    f()
    contexto.fillStyle = arrARGB(global.relleno);
    floodFill(contexto, ancho/2, alto/2, obtenerPixel(contexto, ancho/2, alto/2), ancho, alto)
}

var botones1 = document.querySelectorAll(".boton1");

botones1.forEach(boton1 => {
    boton1.addEventListener("click", (event) => {
        global.figura = event.currentTarget.innerHTML
        pintarSeleccionado(global.figura)
    })
});

var inputRelleno = document.getElementById("input-relleno");
inputRelleno.addEventListener("input", debounce((event) => {
    global.relleno = cadenaARGB(inputRelleno.value)
    pintarSeleccionado(global.figura)
}, 50))

var inputBorde = document.getElementById("input-borde");
inputBorde.addEventListener("input", debounce((event) => {
    console.log("evento: ", event.target)
    global.borde = cadenaARGB(inputBorde.value)
    pintarSeleccionado(global.figura)
}, 50))

function debounce(funcion, intervalo) {
    var ultimoLlamado;
    return function() {
        clearTimeout(ultimoLlamado);
        var argumentos = arguments;
        ultimoLlamado = setTimeout(function() {
            funcion.apply(this, argumentos);
        }.bind(this), intervalo);
    };
}

function llenarBlanco(contexto, width, height){
    contexto.fillStyle = "white";
    contexto.fillRect(0, 0, width, height);
}

function obtenerPixel(contexto, x, y){
    return contexto.getImageData(x, y, 1, 1).data
}

function arrARGB(color){
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 255)`
}

function cadenaARGB(color){
    return color.match(/(\d|\w){2}/g).map(x=>parseInt(x, 16))
}
