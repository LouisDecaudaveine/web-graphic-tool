import { onScopeDispose } from "vue";
import ObjCompProto from "../../p5BaseComps/p5protoObj";

export default function SineComp(VPLNode) {
    ObjCompProto.call(this, VPLNode);

    this.data.pos = this.data.offset;

    this.outData =  {
        num: this.data.prevVal,
    }


    this.updateFunc = async () => {
        this.data.pos += this.data.speed;
        this.data.prevVal = this.data.SineComp === "Sine" ? Math.sin(this.data.pos) : Math.cos(this.data.pos)
        this.outData.num = this.data.prevVal;
        return;
    }
}