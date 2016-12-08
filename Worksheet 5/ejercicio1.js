class Controlador{
  constructor(){
    var div = document.getElementById("div");
    this.tablero = new Tablero();
    this.boton = document.createElement("input");
    this.boton.type = "button";
    this.boton.value = "Añadir nueva nota";
    var that = this;
    this.boton.onclick = function() { 
      var nota = new Nota("Nota","",Date());
      listaNotas.push(nota);
      that.tablero.nuevaNota(div,nota,listaNotas.length);
    };
    this.boton.style.margin = "40px"; 
    div.appendChild(this.boton);
  }
}

class Nota{
  constructor(titulo,texto,hora){
    this.titulo = titulo;
    this.texto = texto;
    this.hora = hora;
  }
}

class Tablero{
  constructor(){
    document.body.style.backgroundImage = "url('images/tablero.png')";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  nuevaNota(div,nota,id){
    var moving = false;
    var contenedor = document.createElement("div");
    contenedor.id = "contenedor" + id;
    contenedor.style.width = "232px";
    contenedor.style.height = "250px";
    contenedor.style.position = "absolute";
    var label = document.createElement("label");
    label.for = "nota" + id;
    label.innerHTML = "Titulo";
    label.style.backgroundColor = "#FFF59D";
    label.style.display = "inline-block";
    label.style.width = "207px";
    contenedor.appendChild(label);
    var eliminar = document.createElement("input");
    eliminar.type = "button";
    eliminar.value = "X";
    eliminar.onclick = function() { 
      var indice = listaNotas.indexOf(nota);
      listaNotas.splice(indice,1);
      div.removeChild(div.children.namedItem("contenedor" + id));
    }; 
    contenedor.appendChild(eliminar);
    var textarea = document.createElement("textarea");
    textarea.name = nota.titulo;
    textarea.id = "nota" + id;
    textarea.maxLength = "5000";
    textarea.cols = "30";
    textarea.rows = "15";
    textarea.style.backgroundColor = "#FFF9C4";
    var offsetX = 0;
    var offsetY = 0;
    textarea.onclick = function(e){
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      moving = !moving;
    };
    textarea.onmousemove = function(e){
      if (moving) {
        this.parentNode.style.top = (e.clientY - offsetY) + "px";
        this.parentNode.style.left = (e.clientX - offsetX) + "px";
      }
    };
    contenedor.appendChild(textarea);
    div.appendChild(contenedor);
  }
}


window.onload = function(){
  var controlador = new Controlador();
  listaNotas = new Array();
};