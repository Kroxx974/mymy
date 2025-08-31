//========================================================================================
// ██████  ██    ██ ███████ ███████ ██      ███████ 
// ██   ██ ██    ██    ███     ███  ██      ██      
// ██████  ██    ██   ███     ███   ██      █████   
// ██      ██    ██  ███     ███    ██      ██      
// ██       ██████  ███████ ███████ ███████ ███████ 

const canvas_part_3     = document.getElementById("canvas_part_3");
const ctx               = canvas_part_3.getContext("2d");

canvas_part_3.width  = window.innerWidth-70;
canvas_part_3.height = canvas_part_3.width*6/14;
let canvasScale = canvas_part_3.width /1400;

const textImage = new Image(1400,600);
textImage.src = "mymy/assets/text.jpg";

let selectedPiece = null;
let diff = {x:0,y:0};

class Piece {
    constructor(x,y,img,x_source,y_source,width,height){
        this.pos    = new Vector(x,y);
        this.img    = img;
        this.source = new Vector(x_source,y_source);
        this.width  = width;
        this.height = height;
    }
    followMouse(mouse,canvasScale,diff){
        this.pos.x = mouse.x + diff.x;
        this.pos.y = mouse.y + diff.y;
        // this.pos.x = mouse.x - this.width*0.5*canvasScale;
        // this.pos.y = mouse.y - this.height*0.5*canvasScale;
        if(mouse.isUp()){

            return null;
            
        }
        return this;
    }
    touch(mx, my,canvasScale) {
        return mx > this.pos.x && mx < this.pos.x + this.width*canvasScale && my > this.pos.y && my < this.pos.y + this.height*canvasScale;
    }
    update(mouse,canvasScale,canvas_part_3,selectedPiece,diff){
        if (this.touch(mouse.x , mouse.y,canvasScale)){
            canvas_part_3.style.cursor = "pointer"
        }
        if (mouse.isDown(0) && this.touch(mouse.x, mouse.y,canvasScale) && selectedPiece == null){
            diff.x = this.pos.x - mouse.x;
            diff.y = this.pos.y - mouse.y;

            selectedPiece=this;
        }
        
        return [selectedPiece,diff];
    }
    draw(canvasScale,mouse){
        engine.drawImagePart(this.img,this.source.x, this.source.y, this.width, this.height, this.pos.x, this.pos.y, canvasScale*this.width, canvasScale*this.height);
        if (this.touch(mouse.x,mouse.y,canvasScale)){
             engine.setStrokeColor([0,0,0]);
            engine.rectangle("stroke", this.pos.x, this.pos.y, canvasScale*this.width, canvasScale*this.height, 0,0,0);
        }
   }
}

let puzzle = []
let nbCol = 4
for (let i = 0; i < nbCol; i++) {
    for (let j = 0 ; j < 2 ; j++){
        puzzle.push(new Piece(Math.random()*(canvas_part_3.width-350),Math.random()*(canvas_part_3.height-300),textImage,i*1400/nbCol,j*300,1400/nbCol,300));
    }

}



function update(dt) {
    canvas_part_3.width  = window.innerWidth-70;
    canvas_part_3.height = canvas_part_3.width*6/14;
    canvasScale = canvas_part_3.width*0.9 /1400;
    
    for (let j = 0 ; j < puzzle.length ; j++){
        if (selectedPiece==null){
            let resultat = puzzle[j].update(mouse,canvasScale,canvas_part_3,selectedPiece,diff);
            selectedPiece=resultat[0];
            diff=resultat[1];
        }
    }
    if (selectedPiece != null){
        selectedPiece = selectedPiece.followMouse(mouse,canvasScale,diff);
    }
}


function draw() {
    engine.setContext(ctx);
    engine.clear(canvas_part_3);
    
    for (let j = puzzle.length-1 ; j >=0 ; j--){
        puzzle[j].draw(canvasScale,mouse);
    }
}

                                                                         
let lastTime = 0;
function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) * 0.001;
    lastTime = timestamp;
    update(dt);
    draw();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);