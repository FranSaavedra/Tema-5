function nuevoBoton(){
	var boton = document.getElementById("fichero");
	var nuevoFichero = document.createElement("input");
	nuevoFichero.setAttribute("type", "file");
	document.body.insertBefore(nuevoFichero, boton);
	document.body.insertBefore(document.createElement("br"),boton);
}