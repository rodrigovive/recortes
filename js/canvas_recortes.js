let canvas = document.getElementById("drawing_area");
let ctx = canvas.getContext("2d");

let rect = canvas.getBoundingClientRect();

let data_points = [];

let mouse_data = [];
let data_lineal = [];
let rect_data = [];
let puntos = {};
let punto_inicial = {};
let punto_final = {};


canvas = (function () {

    // DIBUJA EL PUNTO EN EL CANVAS
    point = function (x, y) {
        ctx.fillRect(x, y, 1, 1);
        lista_de_puntos(x, y);
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
    //Guarda las coordenadas del click
    getMouse = function (event, cc,selected) {

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        mouse_data.push({
            x: x,
            y: y
        })
        if (cc == 2) {
            punto_final = {
                x,
                y
            }
            data_lineal.push({
                punto_inicial,
                punto_final,
            })
            punto_inicial = {};
            punto_final = {};
            let p = 0;
            selected_metodo(selected,p);
        } else {
            punto_inicial = {
                x,
                y
            }
        }
        // mouseMoving(event);
    }

    mouse_coordenadas2 = function (){
        let cor = {
            xi: data_lineal[data_lineal.length - 1].punto_inicial.x,
            xf: data_lineal[data_lineal.length - 1].punto_final.x,
            yi: data_lineal[data_lineal.length - 1].punto_inicial.y,
            yf: data_lineal[data_lineal.length - 1].punto_final.y
        }
        coordenadas_input(cor);
        console.log('data lineal final',data_lineal);
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
    draw_rect = function () {
        if(rect_data.length != 0){
            c = rect_data[0];
            console.log('rect data ',rect_data[0])
            console.log('cccc' , c)

            console.log('rectangulo')
        }else{
            c = coordenadas_rect();
        }
        let x = c.xf-c.xi;
        let y = c.yf-c.yi;
        ctx.strokeRect(c.xi, c.yi, x, y);
        console.log(x,y)
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

    return {
        point: point,
        coordenadas: coordenadas,
        borrar: borrar,
        mouseClick: getMouse,
        selected_metodo: selected_metodo,
        mouse_coordenadasoriginal: mouse_coordenadas,
        mouse_coordenadas2: mouse_coordenadas2,
        draw_rect: draw_rect
    }
})();