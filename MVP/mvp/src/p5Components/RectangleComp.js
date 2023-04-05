import PrimitiveGeo from "../p5BaseComps/p5ProtoGeo";

export default function RectangleComp(VPLNode) {
    PrimitiveGeo.call(this, VPLNode);

    this.show = (p5) => {
        p5.push();
            p5.fill(this.col.r, this.col.g, this.col.b);
            p5.rect(this.posX, this.posY, this.width, this.height);
        p5.pop();
    };

}