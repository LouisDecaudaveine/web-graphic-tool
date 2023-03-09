import mirrorFont from "../assets/mirror82_v2.otf"

export default function TextComp(VPLNode){

    //these is all the properties relating to the VPL
    this.id = VPLNode.id;
    this.posX = VPLNode.data.xPos;
    this.posY = VPLNode.data.yPos;
    this.content = VPLNode.data.text;
    this.size = VPLNode.data.size;
    this.type = "Text";

    this.updatedSerialised = {
        size: this.size, 
        text: this.content, 
        xPos: this.xPos,
        yPos: this.yPos
        };

    //these one here are for anything to do with the sketch
    this.font = null;
    this.anchorPoint = {x: null, y: null};
    this.anchored = false;
    this.bBox = null;
    this.setFonty = (font) => {
        this.font = font;
        this.bBox =  font && font.textBounds(this.content,this.posX,this.posY,this.size);
    }

    this.show = (p5) => {
        p5.push(); 
            p5.fill(255);
            p5.textSize(this.size);
            p5.text(this.content, this.posX, this.posY);
            
            //visualising the bounding box
            p5.noFill();
            p5.stroke(255,0,0);
            p5.rect(this.bBox.x,this.bBox.y,this.bBox.w,this.bBox.h);
        p5.pop();
    }

    this.update = (inputs) => {
        // console.log(this.bBox);
        this.bBox =  this.font && this.font.textBounds(this.content,this.posX,this.posY,this.size);

        //updating the VPL data
        this.updatedSerialised = {
            size: this.size, 
            text: this.content, 
            xPos: this.posX,
            yPos: this.posY
        };
    }


}