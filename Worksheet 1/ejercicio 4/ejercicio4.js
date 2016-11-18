window.onload = function () {
    var lista = document.getElementById("lista");
    var boton = document.getElementById("nuevo");
    boton.onclick = function(){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("elemento"));
    	lista.appendChild(li);
    };

};