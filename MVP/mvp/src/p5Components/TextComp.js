export default function TextComp(VPLNode){

    console.log("within text comp: ",VPLNode);

    this.id = VPLNode.id;
    this.posX = VPLNode.data.xPos;
    this.posY = VPLNode.data.yPos;
    this.content = VPLNode.data.text;
    this.size = VPLNode.data.size;

    this.show = (p5) => {
        p5.push();
            p5.fill(255);
            p5.textSize(this.size);
            p5.text(this.content, this.posX, this.posY);
        p5.pop();
    }

    this.update = (inputs) => {

    }

}