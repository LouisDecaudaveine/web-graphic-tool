import mirrorFont from "../assets/mirror82_v2.otf"
import VisualCompProto from "../p5BaseComps/p5VisualProto";

export default function TextComp(VPLNode){

    VisualCompProto.call(this, VPLNode)

    this.content = VPLNode.data.text;
    this.data.size = VPLNode.data.size;
    this.type = "Text";

    this.updatedSerialised.size = this.data.size;
    this.updatedSerialised.text = this.content;

    this.font = null;
    this.setFonty = (font) => {
        this.font = font;
        this.bBox =  font && font.textBounds(this.content,this.posX,this.posY,this.data.size);
    }

    this.show = (p5) => {
        p5.push(); 
            p5.fill(255);
            p5.textSize(this.data.size);
            p5.text(this.content, this.posX, this.posY);
            
            //visualising the bounding box
            // p5.noFill();
            // p5.stroke(255,0,0);
            // p5.rect(this.bBox.x,this.bBox.y,this.bBox.w,this.bBox.h);
        p5.pop();
    }

    this.updateFunc = async () => {
        if(Boolean(this.inputs.get("size"))) this.data.size = this.inputs.get("size")[0].outData.num;

        this.bBox =  this.font && this.font.textBounds(this.content,this.posX,this.posY,this.data.size);

        //updating the VPL data
        this.updatedSerialised = {
            size: this.data.size, 
            text: this.content, 
            xPos: this.posX,
            yPos: this.posY
        };
    }


}