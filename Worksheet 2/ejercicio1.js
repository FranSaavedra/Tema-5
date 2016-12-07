class Juego{

    start(){
        zona_juego.setAttribute("width", 500);
        zona_juego.setAttribute("height", 500);
        zona_juego.style.border = "solid black";
        document.body.appendChild(zona_juego);

        var x = Math.round(Math.random()*470) + 16;
        var bola = new Bola(x,140,1,1,15,"red");
        bola.move();
        zona_juego.appendChild(bola.bola);

        zona_juego.appendChild(base.base);
        var posX = 5;
        var posY = 0;
        var id = 0;
        for (var i = 1; i < 6; i++) {
            for (var j = 1; j < 6; j++) {
                var bloque = new Base(posX,posY,20,90,"blue",id++);
                zona_juego.appendChild(bloque.base);
                arrayBloques.push(bloque);
                posX += 100;
            }
            posX = 5;
            posY += 25;
        }
    }

}

class Bola{
    constructor(x,y,cx,cy,r,color){
        this.x = x;
        this.y = y;
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.color = color;

        this.bola = document.createElementNS("http://www.w3.org/2000/svg","circle");
        this.bola.setAttribute("cx", this.x);
        this.bola.setAttribute("cy", this.y);
        this.bola.setAttribute("r", this.r);
        this.bola.setAttribute("fill", this.color);
        this.bola.setAttribute("width", 30);
        this.bola.setAttribute("height", 30);
    }

    move(){
        self = this;
        var intervalo = setInterval(function(){

            if (self.ifEndGame(self.bola.cy.baseVal.value,self.r,zona_juego.height.baseVal.value)) {
                clearInterval(intervalo);
               
            }else{
                if (self.ifVerticalCollision(self.bola.cy.baseVal.value,self.r,zona_juego.height.baseVal.value)) {
                    self.cy *= -1;
                }

                if (self.ifHorizontalCollision(self.bola.cx.baseVal.value,self.r,zona_juego.width.baseVal.value)) {
                    self.cx *= -1;
                }

                if (self.ifBaseCollision(self.bola.cy.baseVal.value,self.r,base.y,self.bola.cx.baseVal.value,base.x,base.width)) {
                        self.cy *= -1;
                }

                for (var i = 0; i < arrayBloques.length; i++) {
                    if (zona_juego.children.namedItem(i).style.display != "none") {
                        if (self.ifBloqueCollision(self.bola.cy.baseVal.value,self.r,arrayBloques[i].y,self.bola.cx.baseVal.value,
                            arrayBloques[i].x,arrayBloques[i].width,arrayBloques[i].height)) {
                            zona_juego.children.namedItem(i).style.display = "none";
                            self.cy *= -1;
                        }
                    }
                }
                
                self.x += self.cx;
                self.y += self.cy;
                self.bola.setAttribute("cx", self.x);
                self.bola.setAttribute("cy", self.y);
            }
            
        }, 5);
    }

    ifEndGame(cyBola,rBola,heightZona){
        if (cyBola >=(heightZona - rBola)) 
            return true;
        return false;
    }

    ifHorizontalCollision(cxBola,rBola,widthZona){
        return ((cxBola <= rBola) || (cxBola >= (widthZona - rBola)));
    }

    ifVerticalCollision(cyBola,rBola,heightZona){
        return ((cyBola <= rBola) || (cyBola >= (heightZona - rBola)));
    }

    ifBaseCollision(cyBola,rBola,cyBase,cxBola,cxBase,wBase){
        //posicion Y de bola >= (posicion Y de base - radio de bola)
        if ((cyBola >=(cyBase - rBola)) && (cxBola >=(cxBase - rBola) && cxBola <=((cxBase + wBase)- rBola)))  
            return true;
        return false;
    }

    ifBloqueCollision(cyBola,rBola,cyBase,cxBola,cxBase,wBase,hBase){
        if ((cyBola >=(cyBase + rBola) && cyBola <=((cyBase + hBase)+ rBola)) &&
         (cxBola >=(cxBase + rBola) && cxBola <=((cxBase + wBase)+ rBola)))  
            return true;
        return false;
    }

}

class Bloque{
    constructor(x,y,height,width,color,id){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.id = id;

        this.base = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.base.setAttribute("x", this.x);
        this.base.setAttribute("y", this.y);
        this.base.setAttribute("height", this.height);
        this.base.setAttribute("width", this.width);
        this.base.setAttribute("fill", this.color);
        this.base.setAttribute("id", this.id);
    }
}

class Base extends Bloque{

    moveLeft(){
        this.x -=10;
        this.base.setAttribute("x", this.x);
    }

    moveRight(){
        this.x += 10;
        this.base.setAttribute("x", this.x);
    }
}


window.onload = function () {
    zona_juego = document.createElementNS("http://www.w3.org/2000/svg","svg");
    base = new Base(200,470,20,100,"black");
    arrayBloques = [];

    document.addEventListener("keydown", function (e){
        switch (e.keyCode) {
            case 37:
                if(base.x >= 10)
                    base.moveLeft();
                break;
            case 39:
                if(base.x < 400)
                    base.moveRight();
                break;
            default:
                // statements_def
                break;
        }
    });

    var juego = new Juego();
    juego.start();
};