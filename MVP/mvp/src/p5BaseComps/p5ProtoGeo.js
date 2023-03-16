import VisualCompProto from "./p5VisualProto";

export default function PrimitiveGeo(VPLNode){
    VisualCompProto.call(this, VPLNode);

    this.width = VPLNode.data.width;
    this.height = VPLNode.data.height;

    this.updatedSerialised.width = this.width;
    this.updatedSerialised.height = this.height;

    this.col = this.inputs.has("colour") ? {r:0,g:255,b:0} : {r:255,g:0,b:0}
    this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

    this.update = () => {
        this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};


        this.updatedSerialised = {
            xPos: this.posX,
            yPos: this.posY,
            width: this.width,
            height: this.height
        }

        this.col = this.inputs.has("colour") ? {r:0,g:255,b:0} : {r:255,g:0,b:0}

    };
}