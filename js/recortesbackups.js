let region_data = [];
let data_lineas = [];
let k = 0;
let recortes = (function () {
    region_all = function () {
        // Comprueba la region del primer punto

        for (let i = 0; i < data_lineal.length; i++) {
            let puntos = data_lineal[i].punto_inicial;
            let t = 1;
            for (let j = 0; j < 2; j++) {
                let ext = '';
                if (puntos.y < rect_data[0].yi) // es menor que yi
                    ext = ext + '1'; // esta en inferior
                else
                    ext = ext + '0';
                if (puntos.y > rect_data[0].yf) // es mayor que yf 
                    ext = ext + '1'; // esta en superior
                else
                    ext = ext + '0';

                if (puntos.x > rect_data[0].xf)
                    ext = ext + '1';
                else
                    ext = ext + '0';

                if (puntos.x < rect_data[0].xi)
                    ext = ext + '1';
                else
                    ext = ext + '0';
                //Ejemplo punto inicial x = 170, y = 157
                //rect xi,yi = 100, xf,yf = 120
                //valor de region en punto_inicial es 0110 es superior inferior izquierda derecha
                if (t) data_lineal[i].punto_inicial.region = ext;
                else data_lineal[i].punto_final.region = ext;
                t = 0;
                puntos = data_lineal[i].punto_final;
                // if (j = 0) data_lineal[i].punto_inicial.binario = ext;
                // else data_lineal[i].punto_final.binario = ext;
                region_data.push({
                    region: ext,
                })
            }
        }
    }
    // ESTA FUNCION ES PARA CALCULAR LA REGION DE UN SOLO PUNTO Y DEVUELVE LA REGION
    region = function (puntos) {
        let ext = '';
        if (puntos.y > rect_data[0].yf) // es menor que yi
            ext = ext + '1'; // esta en inferior
        else
            ext = ext + '0';
        console.log('ext inferior', ext)
        if (puntos.y < rect_data[0].yi) // es mayor que yf 
            ext = ext + '1'; // esta en superior
        else
            ext = ext + '0';
        console.log('ext superior', ext)
        if (puntos.x > rect_data[0].xf)
            ext = ext + '1';
        else
            ext = ext + '0';
        console.log('ext derecha', ext, puntos.x, '>', rect_data[0].xf)

        if (puntos.x < rect_data[0].xi)
            ext = ext + '1';
        else
            ext = ext + '0';
        console.log('ext izquierda', ext)
        return ext;
    }

    recortar_izquierda = function (x, y, m) {
        y = Math.abs(m * (rect_data[0].xi - x) + y);
        x = parseInt(rect_data[0].xi);
        console.log('iz')
        return {
            x,
            y
        }
    }
    recortar_derecha = function (x, y, m) {
        y = Math.abs(m * (rect_data[0].xf - x) + y);
        x = parseInt(rect_data[0].xf);
        console.log('de')
        return {
            x,
            y
        }
    }
    recortar_arriba = function (x, y, m) {
        console.log('sin el x ', m * (rect_data[0].yi - y))
        x = Math.abs(m * (rect_data[0].yi - y) + x);
        y = parseInt(rect_data[0].yi);
        console.log('ar')
        return {
            x,
            y
        }
    }
    recortar_abajo = function (x, y, m) {
        x = Math.abs(m * (rect_data[0].yf - y) + x);
        y = parseInt(rect_data[0].yf);
        console.log('ab')
        return {
            x,
            y
        }
    }
    mostrar_recorte = function (r) {
        let p = 0;
        canvas.borrar();
        r.map(function (val, i) {
            c = {};
            c.xi = val[0].punto_inicial.x;
            c.xf = val[0].punto_inicial.y;
            c.yi = val[0].punto_final.x;
            c.yf = val[0].punto_final.y;
            console.log('mostrar recorte val ', val[0].punto_final)
            console.log('mostrar recorte i ', i)
            metodos_lineales.simple(p, c)
        })
        // selected_metodo(selected,p);
    }

    region_puntos = function () {
        console.log('rect data ', rect_data)
        region_all();
        console.log('region data', region_data)
        console.log('mouse data', data_lineal)
        let necesario = [];
        let puntos_finales_recortados = [];
        let data_map = data_lineal.map(function (val, i, data_lineal) {
            let data = recorte_lineal(i);
            console.log('dataaaaaaaaaaaaaaa', data);
            if (data.length != 0) puntos_finales_recortados.push(data);
            console.log('estos son los finales', puntos_finales_recortados)
        })
        mostrar_recorte(puntos_finales_recortados);
        // for (let i = 0; i < data_lineal.length; i++) {
        //     let data = recorte_lineal(i);
        //     puntos_finales_recortados.push(data);
        //     // necesario.push(recorte_lineal(i));
        // }
        console.log('estos son los finales', puntos_finales_recortados)
    }
    // ESTA FUNCION ES PARA PONER EL ALGORITMO DE SUTHERLAND
    recorte_lineal = function (i) {
        // data_lineas.push(mouse_data);
        let x, y;
        let lineas_recorte = [];
        let puntos_recorte;
        let punto_inicial = data_lineal[i].punto_inicial;
        let punto_final = data_lineal[i].punto_final;
        let binario_p1 = region(punto_inicial);
        let binario_p2 = region(punto_final);
        let recorte;
        if ((binario_p1.indexOf(1)) == (binario_p2.indexOf(1)) || (binario_p1.lastIndexOf(1)) == (binario_p2.lastIndexOf(1))) {
            return lineas_recorte;
        }
        if (binario_p1 == '0000' && binario_p2 == '0000') {
            lineas_recorte.push({
                punto_inicial,
                punto_final
            });
            return lineas_recorte;
        }
        // if (binario_p1 != '0000' || binario_p2 != '0000') {
        //     k = 1;
        //     console.log('corre el if')
        //     // return metodos_lineales.borrar(1);
        // }
        if (punto_inicial.x != punto_final.x)
            m = (punto_final.y - punto_inicial.y) / (punto_final.x - punto_inicial.x);
        if (punto_inicial.y != punto_final.y)
            minversa = (punto_final.x - punto_inicial.x) / (punto_final.y - punto_inicial.y);
        while ((binario_p1 && binario_p2) != '0000') {
            // for (a = 0; a < 2; a++) {
            // if ((binario_p1 * binario_p2) == '0000') {
            //     console.log('false')
            //     return false;
            // }
            if (binario_p1 == '0000') {
                binario = binario_p2;
                x = punto_final.x;
                y = punto_final.y;
            } else {
                binario = binario_p1;
                x = punto_inicial.x;
                y = punto_inicial.y;
            }
            if (binario[3] == 1) recorte = recortar_izquierda(x, y, m);
            else if (binario[2] == 1) recorte = recortar_derecha(x, y, m);
            else if (binario[1] == 1) recorte = recortar_arriba(x, y, minversa);
            else if (binario[0] == 1) recorte = recortar_abajo(x, y, minversa);
            if (binario == binario_p1) {
                binario_p1 = region(punto_inicial);
                punto_inicial.x = recorte.x;
                punto_inicial.y = recorte.y;
                punto_inicial.region = binario_p1;
            } else {
                binario_p2 = region(punto_final);
                punto_final.x = recorte.x;
                punto_final.y = recorte.y;
                punto_final.region = binario_p2;
            }
        }
        lineas_recorte.push({
            punto_inicial,
            punto_final
        });
        return lineas_recorte;
        // }

    }
    // recortar_izq = function (){

    //     x = 

    // }

    lineal = function () {

        // let 



    }


    return {
        recorte_lineal: lineal,
        puntos: region_puntos,

    }
})()