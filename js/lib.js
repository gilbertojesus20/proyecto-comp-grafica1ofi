function dibujarPixel(contexto, x, y) {
    contexto.fillRect(x, y, 1, 1);
}

function Linea(contexto, x1, y1, x2, y2) {
    //Si la recta es empinada, se invierten las X y las Y
    if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
        if (y1 < y2) {
            Bresenham(contexto, y1, x1, y2, x2, true);
        } else {
            Bresenham(contexto, y2, x2, y1, x1, true);
        }
    } else {
        if (x1 < x2) {
            Bresenham(contexto, x1, y1, x2, y2);
        } else {
            Bresenham(contexto, x2, y2, x1, y1);
        }
    }
}

function Bresenham(contexto, x1, y1, x2, y2, inv = false) {
    var dx = x2 - x1,
        dy = y2 - y1,
        incY = 1;
    if (dy < 0) {
        incY = -1;
        dy = -dy;
    }
    var p = 2 * dy - dx,
        x = x1,
        y = y1,
        incP0 = 2 * (dy - dx),
        incP = 2 * dy;
    while (x <= x2) {
        if (inv) dibujarPixel(contexto, y, x);
        else dibujarPixel(contexto, x, y);
        if (p > 0) {
            y += incY;
            p += incP0;
        } else p += incP;
        x++;
    }
}

function puntoPoligono(r, n, t, d) {
    var {
        PI,
        sin,
        cos,
        round
    } = Math;
    return {
        x: round(d + r * cos(((2 * PI) / n) * t)),
        y: round(d + r * sin(((2 * PI) / n) * t)),
    };
}

//Dibuja poligonos regulares
function dibujarPoligonoRegular(contexto, n, r) {
    for (var t = 0; t < n; t++) {
        var p1 = puntoPoligono(r, n, t, alto / 2);
        var p2 = puntoPoligono(r, n, t + 1, alto / 2);
        Linea(contexto, p1.x, p1.y, p2.x, p2.y);
    }
}

function dibujar_puntos_octantes(contexto, x, y, centroX, centroY) {
    dibujarPixel(contexto, centroX + x, centroY + y)
    dibujarPixel(contexto, centroX - x, centroY + y)
    dibujarPixel(contexto, centroX + x, centroY - y)
    dibujarPixel(contexto, centroX - x, centroY - y)
    dibujarPixel(contexto, centroX + y, centroY + x)
    dibujarPixel(contexto, centroX - y, centroY + x)
    dibujarPixel(contexto, centroX + y, centroY - x)
    dibujarPixel(contexto, centroX - y, centroY - x)
}

function circuloBresenham(contexto, centroX, centroY, radio) {
    var x = 0
    var y = radio
    var p = 3 - 2 * radio

    while (x < y) {
        dibujar_puntos_octantes(contexto, x, y, centroX, centroY)
        if (p < 0) p = p + 4 * x + 6
        else {
            p = p + 4 * (x - y) + 10
            y = y - 1
        }
        x++
        if (x == y)
            dibujar_puntos_octantes(contexto, x, y, centroX, centroY)
    }
}


function compararaColores(color1, color2) {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2]
}

function floodFill(contexto, x, y, color, ancho, alto) {
    var colorCorrecto = compararaColores(color, obtenerPixel(contexto, x, y))

    if (colorCorrecto) {
        dibujarPixel(contexto, x, y)

        floodFill(contexto, x + 1, y, color, ancho, alto)
        floodFill(contexto, x - 1, y, color, ancho, alto)
        floodFill(contexto, x, y + 1, color, ancho, alto)
        floodFill(contexto, x, y - 1, color, ancho, alto)
    }
}