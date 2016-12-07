class Controlador{
  constructor(){
    var div = document.getElementById("div");
    this.tablero = new Tablero();
    this.listaNotas = new Array();
    this.boton = document.createElement("input");
    this.boton.type = "button";
    this.boton.value = "Añadir nueva nota";
    var that = this;
    this.boton.onclick = function() { 
      var nota = new Nota("Nota","",Date());
      that.listaNotas.push(nota);
      that.tablero.nuevaNota(div,nota);
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
  nuevaNota(div,nota){
    var textarea = document.createElement("textarea");
    textarea.name = nota.titulo;
    textarea.maxLength = "5000";
    textarea.cols = "30";
    textarea.rows = "15";
    textarea.style.backgroundColor = "#FFF9C4";
    div.appendChild(textarea);
  }
}


window.onload = function(){
  var controlador = new Controlador();
};