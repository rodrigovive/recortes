let metodos_lineales = (function () {
    let xi, xf, yi, yf, m;
    coordenadas = function (position,c) {
        if(position && (c == null)){
            c = canvas.coordenadas();
            console.log('llego')
        }else{
            if(c == null) c = canvas.mouse_coordenadas2();
        }
        xi = c.xi;
        xf = c.xf;
        yi = c.yi;
        yf = c.yf;
        m = (yf - yi) / (xf - xi);
        console.log('coordenadas',xi,xf,yi,yf)
    }
    permutar = function () {
        let aux = xi;
        xi = xf;
        xf = aux;
        aux = yi;
        yi = yf;
        yf = aux;
        console.log('permutar ', xi, xf, yi, yf)
    }
    metodo_directo = function (p,c) {
        coordenadas(p,c);

        //data_points = [];
        console.log('directo',xi, xf, yi, yf)
        let b, yff = 0;
        if ((Math.abs(m) < 1 && xi > xf) || (Math.abs(m) > 1 && yf < yi)) {
            permutar();
            console.log(xi, xf, yi, yf)
        }
        b = yi - (m * xi);
        for (xi; xi <= xf; xi++) {
            yff = (m * xi) + b;
            canvas.point(xi, Math.round(yff));
        }
        //console.log(data_points)
    }
    metodo_simple = function (p,c) {
        coordenadas(p,c);
        //data_points = [];
        console.log(xi, xf, yi, yf)
        if ((Math.abs(m) < 1 && xi > xf) || (Math.abs(m) > 1 && yf < yi)) {
            permutar();
            console.log(xi, xf, yi, yf)
        }
        let b = yi - (m * xi);
        let yff;
        if (Math.abs(m) < 1) {
            for (xi; xi <= xf; xi++) {
                yff = (m * xi) + b;
                canvas.point(xi, Math.round(yff));
            }
            return;
        }
        for (yi; yi <= yf; yi++) {
            p = (yi - b) / m;
            canvas.point(Math.round(p), yi);
        }
        //console.log(data_points)
    }




    metodo_simple_borrar = function (p,c) {
        coordenadas(p,c);
        //data_points = [];
        console.log(xi, xf, yi, yf)
        if ((Math.abs(m) < 1 && xi > xf) || (Math.abs(m) > 1 && yf < yi)) {
            permutar();
            console.log(xi, xf, yi, yf)
        }
        let b = yi - (m * xi);
        let yff;
        if (Math.abs(m) < 1) {
            for (xi; xi <= xf; xi++) {
                yff = (m * xi) + b;
                canvas.clear_point(xi, Math.round(yff));
            }
            return;
        }
        for (yi; yi <= yf; yi++) {
            p = (yi - b) / m;
            canvas.clear_point(Math.round(p), yi);
        }
        //console.log(data_points)
    }



    metodo_entero = function (p) {
        coordenadas(p);
        data_points = [];
        let error, delta_x, delta_y;
        error = 0;
        delta_x = xf - xi;
        delta_y = yf - yi;
        console.log('DELTA', delta_x, delta_y);
        if (delta_y < 0) {
            permutar();
            delta_y = -delta_y;
            delta_x = -delta_x;
            console.log('pERMU', delta_x, delta_y);
        }
        let x = xi;
        let y = yi;
        canvas.point(xi, yi);
        if (delta_x > 0) {
            if (delta_x >= delta_y) {
                for (let c = 1; c <= (delta_x - 1); c++) {
                    if (error < 0) {
                        x = parseInt(x) + 1;
                        canvas.point(x, y);
                        error = error + delta_y;
                        console.log('DELTA_X ERROR> 0', error)
                    } else {
                        x = parseInt(x) + 1;
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error + delta_y - delta_x;
                        console.log('DELTA_X > 0 ERROR < 0', error)
                    }
                }
            } else {
                for (let c = 1; c <= (delta_y - 1); c++) {
                    if (error < 0) {
                        x = parseInt(x) + 1;
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error + delta_y - delta_x;
                    } else {
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error - delta_x;
                    }
                }
            }
        } else {
            if (delta_x >= delta_y) {
                for (let c = 1; c <= (delta_x - 1); c++) {
                    if (error < 0) {
                        x = parseInt(x) - 1;
                        canvas.point(x, y);
                        error = error + delta_y;
                    } else {
                        x = parseInt(x) - 1;
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error + delta_x + delta_y;
                    }
                }
            } else {
                for (let c = 1; c <= (delta_y - 1); c++) {
                    if (error < 0) {
                        x = parseInt(x) - 1;
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error + delta_x + delta_y;
                    } else {
                        y = parseInt(y) + 1;
                        canvas.point(x, y);
                        error = error + delta_x;
                    }
                }
            }
        }
        console.log(data_points)

    }

    return {
        directo: metodo_directo,
        simple: metodo_simple,
        entero: metodo_entero,
        borrar: metodo_simple_borrar,
    }
})();