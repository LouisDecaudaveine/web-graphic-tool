import PrimitiveGeo from "../p5BaseComps/p5ProtoGeo";

export default function EllipseComp(VPLNode) {
    PrimitiveGeo.call(this, VPLNode);

    this.show = (p5) => {
        p5.push();
            p5.fill(this.col.r, this.col.g, this.col.b);
            p5.ellipse(this.posX+this.data.width/2, this.posY+this.data.height/2, this.data.width, this.data.height);
        p5.pop();
    }
}