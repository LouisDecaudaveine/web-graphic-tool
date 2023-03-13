import PrimitiveGeo from "../p5BaseComps/p5PrimitiveGeo";

export default function RectangleComp(VPLNode) {
    PrimitiveGeo.call(this, VPLNode);

    this.show = (p5) => {
        p5.push();
            p5.fill(this.col.r, this.col.g, this.col.b);
            p5.ellipse(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height);
        p5.pop();
    }
}