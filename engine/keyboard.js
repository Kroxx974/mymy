/* ESLint options */
/* exported keyboard */
let keyBoard = {
    key : null,
    keyCode : null,
    keyPressed : false,
    ctrlKey: false,
    setDown : function(event){
        if (event.key != " "){
            this.key = event.key;}
        else{
            this.key = "space";
        }
        this.keyCode = event.keyCode;
        this.ctrlKey = event.ctrlKey;
    },
    setUp: function(){
        this.key = null;
        this.keyCode = null;
        this.keyPressed = false;
        this.ctrlKey = false;
    },
    isDown : function(pkey){
        return pkey==this.key;
    },
    isPressed : function(pkey){
        if (!this.keyPressed  && pkey==this.key){
            this.keyPressed = true;
            return this.keyPressed;
        }
        return false;
    }
};

document.addEventListener("keydown",(event) => {keyBoard.setDown(event);});  
document.addEventListener("keyup",() => {keyBoard.setUp();});