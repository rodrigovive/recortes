let metodos = (function(){
    let x = 2;
    coordenadas = function(){
        let z=1;
    }
    let r;
    coordenadas2 = (function(){
         r=0;
         console.log('adentro',r)
    })()
    console.log('afuera',r);
})()