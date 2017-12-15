function draw() {

    $('#borrar').click(function () {
        canvas.borrar();
    })
    $('#draw_rect').click(function () {
        canvas.draw_rect();
    })

    $('#metodo_directo').click(function () {
        metodos_lineales.directo();
    })
    $('#metodo_simple').click(function () {
        metodos_lineales.simple();
    })
    $('#metodo_entero').click(function () {
        metodos_lineales.entero();
    })
    $('#drawing_area').click(function(e){
        let x = $('#select_metodo').val();
        let p = 0;
        canvas.mouseClick(e);
        // DIBUJA PUNTOS CON EL CLICK
        canvas.selected_metodo(x,p);
    })
    $('#draw').click(function(){
        let x = $('#select_metodo').val();
        let p = 1;
        canvas.selected_metodo(x,p);
    })
    $('#clipping').click(function(){
        recortes.puntos();
    })   
}
draw();
//974599761
//         $(c).css("cursor","crosshair");
