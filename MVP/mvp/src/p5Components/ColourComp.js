import ObjCompProto from "../p5BaseComps/p5protoObj"

export default function ColourComp(VPLNode) {
    ObjCompProto.call(this,VPLNode);

    this.outData = {colour: {r:this.data.r, g:this.data.g, b: this.data.b}}

    this.updateFunc = async () => {
        this.data.red = this.inputs.get("red") ? this.inputs.get("red")[0].outData.num : this.data.red;
        this.data.blue = this.inputs.get("blue") ? this.inputs.get("blue")[0].outData.num : this.data.blue;
        this.data.green = this.inputs.get("green") ? this.inputs.get("green")[0].outData.num : this.data.green;

        this.outData = {colour: {r:this.data.red, g:this.data.green, b: this.data.blue}}
    }

}