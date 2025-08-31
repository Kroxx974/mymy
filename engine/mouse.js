/* ESLint options */
/* exported mouse */
let mouse = {
    x : 0,
    y : 0,
    absolute_x:0,
    absolute_y:0,
    dx: 0,
    dy: 0,
    button  : null,
    pressed : null,
    isDown : function(bt){
        if (bt){
            return bt === this.button; 
        }else{
            return this.button != null; // renvoie vrai des qu'un bouton est enfoncé c'est la fonction NOT(mouse.isUp())
        }
        
    },
    isUp : function(){
        return null === this.button;
    }
};

// Mettre à jour la position de la souris
window.addEventListener("mousemove", (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    mouse.absolute_x = event.clientX;
    mouse.absolute_y = event.clientY;
    mouse.dx = event.movementX;
    mouse.dy = event.movementY;  
});

// Mettre à jour l'état du bouton de la souris
window.addEventListener("mousedown", (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    mouse.button = event.button;
});

window.addEventListener("mouseup", (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    mouse.button = null;
});
