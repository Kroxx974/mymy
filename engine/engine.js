/* ESLint options */
/* exported engine */
let engine = {
    setContext: function(context){
        this.ctx = context;
    },
    clear: function(pcanvas) {
        this.ctx.clearRect(0, 0, pcanvas.width, pcanvas.height);
    },
    setFillColor: function([r,g,b,a=1]) {
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        a = Math.min(1, Math.max(0, a));
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    setStrokeColor: function([r,g,b,a=1]) {
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        a = Math.min(1, Math.max(0, a));
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    setLineStyle: function(pstyle,pLen,lSpace,pOffset){
        if (pstyle == "dash"){
            this.ctx.setLineDash([pLen, lSpace]);
            this.ctx.lineDashOffset = pOffset;
        }else if (pstyle == "solid"){
            this.ctx.setLineDash([]);
        }
    },
    setLineWidth: function(w) {
        this.ctx.lineWidth = w;
    },
    setFont: function(font) {
        this.ctx.font = font;
    },
    line: function(x1, y1, x2, y2, pstyleCap) {
        if (pstyleCap == "round"){
            this.ctx.lineCap = "round";
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    },
    pointe: function(edgeX,edgeY,angle,epaisseur ){
        this.ctx.beginPath();
        this.ctx.moveTo(edgeX, edgeY);
        this.ctx.lineTo(
            edgeX - epaisseur * Math.cos(angle - Math.PI / 6),
            edgeY - epaisseur * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            edgeX - epaisseur * Math.cos(angle + Math.PI / 6),
            edgeY - epaisseur * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.lineTo(edgeX, edgeY);
        this.ctx.fill(); 
    },
    arrow: function(fromX,fromY,toX,toY,epaisseur,taux ){
        this.ctx.beginPath();
        const angle = Math.atan2(toY-fromY, toX-fromX);
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(fromX, fromY);
        this.ctx.stroke();
        const edgeX = fromX+taux*(toX-fromX)
        const edgeY = fromY+taux*(toY-fromY)
        this.ctx.moveTo(edgeX, edgeY);
        this.ctx.lineTo(
            edgeX - epaisseur * Math.cos(angle - Math.PI / 6),
            edgeY - epaisseur * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            edgeX - epaisseur * Math.cos(angle + Math.PI / 6),
            edgeY - epaisseur * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.lineTo(edgeX, edgeY);
        this.ctx.fill(); 
    },
    rectangle: function(pstyle, px, py, pw, ph, poffsetx, poffsety, pangle) {
        if (pangle || poffsetx || poffsety){
            this.ctx.translate(px,py);
            this.ctx.rotate(pangle);
        
            if (pstyle == 'fill') {
                this.ctx.fillRect(-poffsetx, -poffsety, pw, ph);
            }
            else if (pstyle == 'stroke') {
                this.ctx.strokeRect(-poffsetx, -poffsety, pw, ph);
            }else if (pstyle == "stencil"){
                this.ctx.beginPath();
                this.ctx.rect(-poffsetx, -poffsety, pw, ph);
                this.ctx.clip();
            }
            this.ctx.rotate(-pangle); 
            this.ctx.translate(-px,-py);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }else{
            if (pstyle == 'fill') {
                this.ctx.fillRect(px, py, pw, ph);
            }
            else if (pstyle == 'stroke') {
                this.ctx.strokeRect(px, py, pw, ph);
            }else if (pstyle == "stencil"){
                this.ctx.beginPath();
                this.ctx.rect(px, py, pw, ph);
                this.ctx.clip();
            }
        }
    },
    arc: function(pstyle, x, y, radius, startAngle, endAngle, counterclockwise){
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        if (pstyle == "fill"){
            this.ctx.fill();
        }else if (pstyle == "stroke"){
            this.ctx.stroke();
        }else if (pstyle == "stencil"){
            this.ctx.clip();
        }
    },
    circle: function(pstyle, x, y, radius){
        this.arc(pstyle, x, y, radius, 0, 6.28);
    },
    ellipse: function(centreX,centreY,rayonX,rayonY,rotation,angleDebut,angleFin,antiHoraire){
        this.ctx.beginPath();
        this.ctx.ellipse(centreX,centreY,rayonX,rayonY,rotation,angleDebut,angleFin,antiHoraire);
        this.ctx.stroke();
    },
    triangle: function(pstyle,x1,y1,x2,y2,x3,y3){
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x1, y1);
        if (pstyle == "fill"){
            this.ctx.fill();
        }
        else if (pstyle == "stroke"){
            this.ctx.stroke();
        }
    },
    text: function(ptexte, px, py, pstyle, pAlignement,baseline) {
        if (pAlignement){
            this.ctx.textAlign = pAlignement; 
        }else {
            this.ctx.textAlign = "left";//"center" "right"
        }
        if (baseline){
            this.ctx.textBaseline  = baseline;
        }else {
            this.ctx.textBaseline  = "alphabetic"; //"top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
        }
        let txt = ptexte;
        if (pstyle == "fill"){
            this.ctx.fillText(txt.toString(), px, py);
        }
        else if (pstyle == 'stroke') {  
            this.ctx.strokeText(txt.toString(), px, py);
        }
    },
    drawImage: function(image,dx, dy, dWidth, dHeight){
        this.ctx.drawImage(image,dx, dy, dWidth, dHeight);
    },
    drawImagePart: function(image,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        // s -> source
        //d -> destination
        this.ctx.drawImage(image,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
