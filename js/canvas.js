let canvas = document.getElementById("drawing_area");
//  ctx.beginPath();
//  ctx.moveTo(201,0);
//  ctx.lineTo(201,401);
//  ctx.stroke();
//  ctx.beginPath();
//  ctx.moveTo(0,201);
//  ctx.lineTo(401,201);
// let canvas2 = document.getElementById("drawing_area2")
let ctx = canvas.getContext("2d");
// let ctx2 = canvas2.getContext("2d")
//let canvas3 = document.getElementById("drawing_area3")
//let ctx3 = canvas3.getContext("2d")
//ctx2.fillRect(1, 1, 200, 200);
let rect = canvas.getBoundingClientRect();
//  ctx.stroke();
let data_points = [];

// function update() {
//     ctx.beginPath();
//     ctx.arc(100, 100, 50, 0, 2 * Math.PI, true);
//     ctx.fillStyle = "#FF6A6A";
//     ctx.fill();
//   }
//   update();
let mouse_data = []; //array estructura de dato
let rect_data = [];

canvas = (function () {
    juntas_canvas = function () {
        var can = document.getElementById('canvas1');
        var can2 = document.getElementById('canvas2');
        ctx3.drawImage(can, 0, 0);
        ctx3.drawImage(can2, 0, 0);
    }
    // FUNCION PARA COLOCAR LOS PUNTOS Y ESCRIBIR LA PREVISUALIZACION
    mouseMoving = function (event) {
        let canvas = document.getElementById("drawing_area");
        canvas.addEventListener("mousemove", movingMetodo, false);
        function movingMetodo(event) {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
            ctx.clearRect(0, 0, 400, 400);
            text = [x, y]
            //ctx.clearRect( x-50, y-50,100,100);
            ctx.strokeText(text, x, y)
            console.log('puntos puntos iniciales', mouse_data[0].x, mouse_data[0].y)
            console.log('puntos finales', x, y)
            ctx.beginPath();
            let p;
            //metodos_lineales.directo(p,x,y);
            metodos_lineales.simple(p, x, y);
        }
    }
    // FUNCION PARA DETECTAR EL CLICK DEL MOUSE
    getMouse = function (event) {
        console.log('rect let', rect)
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        mouse_data.push({
            x: x,
            y: y
        })
        // mouseMoving(event);
    }
    // DIBUJA EL PUNTO EN EL CANVAS
    point = function (x, y) {
        ctx.fillRect(x, y, 1, 1);
        lista_de_puntos(x, y);
    }
    
    clear_point = function (x, y) {
        ctx.clearRect(x, y, 1, 1);
        // lista_de_puntos(x, y);
    }

    draw_rect = function () {
        c = coordenadas_rect();
        let x = c.xf-c.xi;
        let y = c.yf-c.yi;
        ctx.strokeRect(c.xi, c.yi, x, y);
        console.log(x,y)
//        console.log(c.xi,c.yi,)
        // lista_de_puntos(x, y);
    }
    
    coordenadas_rect = function(){
        let cor = {
            xi: $('#coordenada_xinicial').val(),
            xf: $('#coordenada_xfinal').val(),
            yi: $('#coordenada_yinicial').val(),
            yf: $('#coordenada_yfinal').val(),
        }
        rect_data.push({
            xi: cor.xi,
            xf: cor.xf,
            yi: cor.yi,
            yf: cor.yf,
        })
        console.log(rect_data)
        return cor;
    }
    coordenadas = function () {
        let cor = {
            xi: $('#coordenada_xinicial').val(),
            xf: $('#coordenada_xfinal').val(),
            yi: $('#coordenada_yinicial').val(),
            yf: $('#coordenada_yfinal').val(),
        }
        mouse_data.push({
            x: cor.xi,
            y: cor.yi
        })
        mouse_data.push({
            x: cor.xf,
            y: cor.yf
        })
        coordenadas_input(cor);
        return cor;
    }
    mouse_coordenadas = function (xg, yg) {
        if (mouse_data.length == 1) {
            mouse_data.push({
                x: mouse_data[mouse_data.length - 1].x,
                y: mouse_data[mouse_data.length - 1].y
            })
        }
        let cor = {
            xi: mouse_data[mouse_data.length - 2].x,
            xf: xg ? xg : mouse_data[mouse_data.length - 1].x,
            yi: mouse_data[mouse_data.length - 2].y,
            yf: yg ? yg : mouse_data[mouse_data.length - 1].y
        }
        console.log(cor)
        coordenadas_input(cor);
        return cor;
    }
    coordenadas_input = function (cor) {
        $('#coordenada_xinicial').val(cor.xi);
        $('#coordenada_xfinal').val(cor.xf);
        $('#coordenada_yinicial').val(cor.yi);
        $('#coordenada_yfinal').val(cor.yf);
    }
    borrar = function () {
        console.log('borra');

        mouse_data = [];
        console.log(mouse_data);
        data_points = [];
        console.log(data_points);
        ctx.clearRect(0, 0, 400, 400);
    }
    lista_de_puntos = function (x, y) {
        data_points.push({
            x: x,
            y: y
        });
    }
    consola = function (x) {
        console.log('consola ', x)
    }
    selected_metodo = function (x, p) {
        console.log('valor de x: ', x, p)
        let select = function (x) {
            const met1 = {
                1: metodos_lineales.directo, //metodos_lineales.directo(p),
                2: metodos_lineales.simple,
                3: metodos_lineales.entero //metodos_lineales.directo(p),
            }
            return met1[x];
        }
        select(x)(p);
    }
    return {
        point: point,
        coordenadas: coordenadas,
        borrar: borrar,
        mouseClick: getMouse,
        selected_metodo: selected_metodo,
        mouse_coordenadas: mouse_coordenadas,
        mouseMoving: mouseMoving,
        draw_rect: draw_rect,
        clear_point: clear_point
    }
})();