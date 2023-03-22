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
    this.loadMedia = (p5, extraMedia, setExtraMedia) => {

        
        if(VPLNode.data.fileExp.media){
            //if nothing has changed with a source
            if((extraMedia.has(VPLNode.id)) 
                && (extraMedia.get(VPLNode.id).imageURL === VPLNode.data.fileExp.media))
                 return;
            //if something has chnaged
            const img = new Image();
            img.src = VPLNode.data.fileExp.media;
            img.onload = () => {
                setExtraMedia(extraMedia.set(VPLNode.id,{p5Image:p5.loadImage(img.src, true), imageURL: img.src}));
                console.log("Image Loaded");
            }
            return;
        }
        //if there is no longer a source
        else{
            //if no image has been selected delete
            if(extraMedia.has(VPLNode.id)) 
                setExtraMedia(extraMedia.delete(VPLNode.id));
            return;
        }
    }

    this.show = (p5, extraMedia) => {
        p5.push()
            if(extraMedia.has(VPLNode.id)){
                p5.image(extraMedia.get(VPLNode.id).p5Image,this.posX,this.posY);
            }
            else{
                p5.noFill()
                p5.stroke(0,200,100);
                p5.rect(this.posX, this.posY, this.data.width, this.data.height);
            }
        p5.pop()
    }

    this.updateFunc = async () => {
        this.bBox = {x: this.posX, y: this.posY, w: this.width, h: this.height};

        this.updatedSerialised.xPos = this.posX;
        this.updatedSerialised.yPos = this.posY;

    }

}