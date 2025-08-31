/* ESLint options */
/* global engine , Vector*/
/* exported Button */
class Button{
    constructor(x,y,w,h,img,text,font,textColor) {
        this.text      = text;
        this.textColor = textColor;
        this.font      = font;
        this.img       = img;
        this.height    = h
        this.width     = w;
        this.pos       = new Vector(x, y);
        this.callBack  = ()=>{};
        this.on        = false;
        this.willTrigger   = false;
        this.k         = 0;

    }
    addCallBack(callBack){
        this.callBack = callBack;
    }
    trigger(eventData) {
        this.callBack(eventData);
    }
    touch(mx, my) {
        return mx > this.pos.x && mx < this.pos.x+ this.width && my >this.pos.y && my < this.pos.y + this.height;
    }
    update(mouse){
        this.k=0;
        if (this.touch(mouse.x,mouse.y)){
            this.k = 1;
            if (mouse.isDown(0)){
                this.k = 2;
                this.willTrigger   = true;
            }
        }
        if (this.willTrigger && mouse.isUp(0)){
            this.callBack();
            this.willTrigger   = false;
        }
    }
    draw(){
        engine.drawImagePart(this.img,0, this.k*this.img.height/3, this.img.width,this.img.height/3,this.pos.x,this.pos.y,this.width,this.height);
        engine.setStrokeColor(this.textColor );
        engine.text(this.pos.x+this.width/2, this.pos.y+this.height/2,"stroke","center","middle");
    }
}