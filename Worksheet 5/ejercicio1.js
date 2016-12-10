class Controlador{
  constructor(){
    this.tablero = new Tablero();
    this.boton = document.createElement("input");
    this.boton.type = "button";
    this.boton.value = "Añadir nueva nota";
    var that = this;
    this.boton.onclick = function() {
      var hoy = new Date(); 
      var nota = new Nota("Nota","",hoy,80,40);
      listaNotas.push(nota);
      localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
      that.tablero.nuevaNota(div,nota,listaNotas.length,nota.x,nota.y);
    };
    this.boton.style.margin = "40px"; 
    div.appendChild(this.boton);
  }
}

class Nota{
  constructor(titulo,texto,fechaCreacion,x,y){
    this.titulo = titulo;
    this.texto = texto;
    this.fechaCreacion = fechaCreacion;
    this.x = x;
    this.y = y;
  }
  formatearHora(millisec){
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return "Hace " + hours + " horas y " + minutes + " minutos.";
    }
    return "Hace " + minutes + " minutos.";
  }

  getTiempo(){
    return new Date().getTime() - new Date(this.fechaCreacion).getTime();
  }

}

class Tablero{
  constructor(){
    document.body.style.backgroundImage = "url('images/tablero.png')";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  nuevaNota(div,nota,id,x,y){
    var contenedor = document.createElement("div");
    contenedor.id = "contenedor" + id;
    contenedor.style.width = "232px";
    contenedor.style.height = "250px";
    contenedor.style.position = "absolute";
    contenedor.style.top = x + "px";
    contenedor.style.left = y + "px";
    var label = document.createElement("input");
    label.type = "text";
    label.value = nota.titulo;
    label.style.backgroundColor = "#FFF59D";
    label.style.width = "203px";
    label.onblur = function(){
      var indice = listaNotas.indexOf(nota);
      listaNotas[indice].titulo = label.value;
      localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
    };
    contenedor.appendChild(label);
    var eliminar = document.createElement("input");
    eliminar.type = "button";
    eliminar.value = "X";
    eliminar.onclick = function() { 
      var indice = listaNotas.indexOf(nota);
      listaNotas.splice(indice,1);
      localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
      div.removeChild(div.children.namedItem("contenedor" + id));
    }; 
    contenedor.appendChild(eliminar);
    var textarea = document.createElement("textarea");
    textarea.name = nota.titulo;
    textarea.id = "nota" + id;
    textarea.maxLength = "5000";
    textarea.cols = "30";
    textarea.rows = "15";
    textarea.value = nota.texto;
    textarea.style.backgroundColor = "#FFF9C4";
    var offsetX = 0;
    var offsetY = 0;
    var moving = false;
    var mouseup = false;
    textarea.onmousedown = function(e){
      mouseup = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      moving = true;
      
    };
    textarea.onmousemove = function(e){
      if (moving) {
        this.parentNode.style.top = (e.clientY - offsetY) + "px";
        this.parentNode.style.left = (e.clientX - offsetX) + "px";
      }
    };
    textarea.onmouseout = function(e){
      moving = false;
      mouseup = true;
    };
    textarea.onmouseup = function(e){
      if (mouseup) {
        moving = false;
        nota.x = (e.clientY - offsetY);
        nota.y = (e.clientX - offsetX);
      }
    };
    textarea.onblur = function(){
      var indice = listaNotas.indexOf(nota);
      listaNotas[indice].texto = textarea.value;
      localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
    };
    contenedor.appendChild(textarea);

    var fecha = document.createElement("label");
    fecha.for = "nota" + id;
    var a = nota.getTiempo();
    fecha.innerHTML = nota.formatearHora(nota.getTiempo());
    fecha.style.backgroundColor = "#FFF59D";
    fecha.style.display = "inline-block";
    fecha.style.width = "233px";
    var intervalo = setInterval(function(){
      fecha.innerHTML = nota.formatearHora(nota.getTiempo());
    }, 60000);
    contenedor.appendChild(fecha);
    div.appendChild(contenedor);
  }

}


window.onload = function(){
  div = document.getElementById("div");
  var controlador = new Controlador();
  if (JSON.parse(localStorage.getItem("listaNotas")) === null) {
    listaNotas = [];
  }else{
    listaNotas = JSON.parse(localStorage.getItem("listaNotas"));
    for (var i = 0; i < listaNotas.length; i++) {
      //JSON guarda los objetos de tipo date en un formato diferente, por ello vuelvo a crear un date.
      var nota = new Nota(listaNotas[i].titulo,listaNotas[i].texto,new Date(listaNotas[i].fechaCreacion),listaNotas[i].x,listaNotas[i].y);
      listaNotas[i] = nota;
      controlador.tablero.nuevaNota(div,nota,i,nota.x,nota.y);
    }
  }
  
};