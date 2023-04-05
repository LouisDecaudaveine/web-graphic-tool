import ObjCompProto from "./p5protoObj";

export default function VisualCompProto(VPLNode) {

    ObjCompProto.call(this, VPLNode);


    //all the data present in any visual VPL component
    this.posX = VPLNode.data.xPos;
    this.posY = VPLNode.data.yPos;
    this.type = "";

    //this is what can be edited in the VPL component
    this.updatedSerialised = {
        xPos: this.posX,
        yPos: this.posY,
    }

    //this handles all user manipulation within the sketch 
    this.anchored = false;
    this.anchorPoint = {x: null, y: null};
    this.bBox = {x:null, y:null, w:null, h:null};

    this.show = (p5) => {
        //bBoxVisualised
        p5.stroke(0,255,0);
        p5.noFill();
        p5.rect(this.bBox.x,this.bBox.y,this.bBox.w,this.bBox.h)
    }

    this.updateFunc = async () => {

    }
}