let click_count = 0;

function draw() {

    $('#borrar').click(function () {
        canvas.borrar();
    })
    $('#draw_rect').click(function () {
        canvas.draw_rect();
    })
    $('#drawing_area').click(function(e){
        if(click_count>1){
            click_count=0;
        }
        click_count++;

        let x = $('#select_metodo').val();
        let p = 0;
        canvas.mouseClick(e,click_count,x);
        // DIBUJA PUNTOS CON EL CLICK
        // canvas.selected_metodo(x,p);
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

/*
    ESTRUCTURA DE DATOS

    LINEAS

    ARRAY    
        OBJETOS
            OBJECTOS
    [0]={
            PUNTO_INICIAL: {
                X:
                Y:
            }
            PUNTO_FINAL: {
                X:
                Y:   
            }
        }
    [1]={
            PUNTO_INICIAL: {
                X:
                Y:
            }
            PUNTO_FINAL: {
                X:
                Y:   
            }
        }
    [2]={
            PUNTO_INICIAL: {
                X:
                Y:
            }
            PUNTO_FINAL: {
                X:
                Y:   
            }
        }
    
    BINARIO

    ARRAY

    region_data=[
        [0]= ext
        [1]= ext
        [2]= ext
    ]
    
    
*/