window.onload = function () {
    var p = document.getElementById("p2");
    var boton = document.getElementById("showText");
    boton.onclick = function(){
    	if (p.hidden) {
    		boton.value = "Ocultar articulo";
        p.hidden = false;
   		}else{
   			boton.value = "Ver articulo completo";
   			p.hidden = true;
   		}
    };

};