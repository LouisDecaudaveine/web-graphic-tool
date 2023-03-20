import ObjCompProto from "../../p5BaseComps/p5protoObj";

export default function MultComp(VPLNode) {
    ObjCompProto.call(this, VPLNode);

    this.outData =  {
        num: 0,
    }


    this.updateFunc = () => {
        this.data.num1 = this.inputs.get("num1") ? this.inputs.get("num1")[0].outData.num : this.data.num1;
        this.data.num2 = this.inputs.get("num2") ? this.inputs.get("num2")[0].outData.num : this.data.num2;
        this.data.preview = this.data.num1 * this.data.num2;
        this.outData.num = this.data.preview;
    }
}