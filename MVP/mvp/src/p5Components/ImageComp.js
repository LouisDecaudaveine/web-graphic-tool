import VisualCompProto from "../p5BaseComps/p5VisualProto";

export default function ImageComp(VPLNode, imagePack) {
    VisualCompProto.call(this, VPLNode);

    this.width = VPLNode.data.width;
    this.height = VPLNode.data.height;
    this.updatedSerialised.width = this.width;
    this.updatedSerialised.height = this.height;
    this.updatedSerialised.fileExp = VPLNode.data.fileExp;
    this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

    // console.log("in p5 Comp", this.updatedSerialised.fileExp);
    this.preload = (p5, extraMedia, setExtraMedia) => {
        if(VPLNode.data.fileExp.media){
            const img = new Image();
            img.src = VPLNode.data.fileExp.media;
            img.onload = () => {
                setExtraMedia(extraMedia.set(VPLNode.id,p5.loadImage(img.src, true)));
                console.log("Image Loaded");
            }
        }
    }

    this.show = (p5, extraMedia) => {
        console.log(extraMedia);
        p5.push()
            if(extraMedia.get(VPLNode.id)){
                p5.image(extraMedia.get(VPLNode.id),this.posX,this.posY);
            }
            else{
                p5.noFill()
                p5.stroke(0,200,100);
                p5.rect(this.posX, this.posY, this.data.width, this.data.height);
            }
        p5.pop()
    }

    this.updatedFunc = async () => {
        this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

        this.updatedSerialised.xPos = this.posX;
        this.updatedSerialised.yPos = this.posY;

    }

}