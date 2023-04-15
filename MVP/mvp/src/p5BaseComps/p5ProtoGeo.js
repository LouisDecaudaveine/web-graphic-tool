import VisualCompProto from "./p5VisualProto";

export default function PrimitiveGeo(VPLNode){
    VisualCompProto.call(this, VPLNode);

    console.log("rectangle Node: ", VPLNode);

    this.width = VPLNode.data.width;
    this.height = VPLNode.data.height;

    this.updatedSerialised.width = this.width;
    this.updatedSerialised.height = this.height;

    this.col = this.inputs.has("colour") ? {r:0,g:255,b:0} : {r:255,g:0,b:0}
    this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

    this.updateFunc = async () => {
        if(Boolean(this.inputs.get("width"))) this.data.width = this.inputs.get("width")[0].outData.num;
        if(Boolean(this.inputs.get("height"))) this.data.height = this.inputs.get("height")[0].outData.num;

        this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};
        this.updatedSerialised = {
            xPos: this.posX,
            yPos: this.posY,
            width: this.data.width,
            height: this.data.height
        }

        if(this.inputs.has("colour")) this.col = this.inputs.get("colour")[0].outData.colour;   

    };
}