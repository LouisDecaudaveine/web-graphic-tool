import ObjCompProto from "../../p5BaseComps/p5protoObj";

export default function StepComp(VPLNode) {
    ObjCompProto.call(this, VPLNode);

    this.outData =  {
        num: 0,
    }

    this.data.pos = 0;

    this.updateFunc = () => {
        this.data.pos += this.data.stepSize;
        this.outData.num = this.data.pos;
    }
}