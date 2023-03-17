import ObjCompProto from "../p5BaseComps/p5protoObj"

export default function ColourComp(VPLNode) {
    ObjCompProto.call(this,VPLNode);

    this.outData = {colour: {r:this.data.r, g:this.data.g, b: this.data.b}}

    this.updateFunc = async () => {
        this.outData = {colour: {r:this.data.red, g:this.data.green, b: this.data.blue}}
    }

}