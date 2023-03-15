import VisualCompProto from "./p5VisualProto";

export default function PrimitiveGeo(VPLNode){
    VisualCompProto.call(this, VPLNode);

    this.width = VPLNode.data.width;
    this.height = VPLNode.data.height;

    this.updatedSerialised.width = this.width;
    this.updatedSerialised.height = this.height;

    this.inputs.colour = null;
    this.col = this.inputs.colour !== null ? this.inputs.colour : {r:255,g:0,b:0}

    this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

    this.update = (inputs) => {
        this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};


        this.updatedSerialised = {
            xPos: this.posX,
            yPos: this.posY,
            width: this.width,
            height: this.height
        }
    };
}