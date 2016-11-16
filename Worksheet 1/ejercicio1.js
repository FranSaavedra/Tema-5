window.onload = function () {
    var p3 = document.getElementById("p3");
	var pTexto = document.getElementById("p4");
    var enlaces = document.links;
    var cont = 0;
    var enlacesParrafo = p3.getElementsByTagName("a");

    for (var i = 0; i < enlaces.length; i++) {
        if ( enlaces[i].href == "https://www.google.es/") {
            cont++;
        }
    }

    pTexto.innerHTML = "Numero de enlaces: " + enlaces.length + ", direccion del penultimo enlace: " + enlaces[2] +
     ", numero de enlaces de google: " + cont + ", numero de enlaces del tercer parrafo: " + enlacesParrafo.length;
	
};