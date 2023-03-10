//import p5 classes/objects not sure how they will be made
import p5ComponentList from "./p5ComponentList";


//this is just a demo function will delete later
function EllipseObj(xPos, yPos){   
    this.id = -1;
    this.x = xPos;
    this.y = yPos;
    this.bassX = xPos;
    this.bassY = yPos;
    this.state = 0;

    this.show = (p5) => {
        p5.fill(255,0,0);
        p5.ellipse(this.x,this.y, 70,70);
    }

    this.update = (inputs) => {
        this.state += 0.01;
        this.x = this.bassX + Math.sin(this.state)*50;
        this.y = this.bassY + Math.cos(this.state)*50;
    }
} 

function treeDescent(SerialisedEditor){
    // this will go down the VPL tree starting at Sketch node inputs
    // following a depth first search pattern, 
    // on its way down it will either create the necessary objects
    // or add what is needed to them 
}


export function ReadParser(SerialisedEditor) {
    // const ellipseO = new EllipseObj(250,250);

    const objects = [];
    const layers = [];

    //first checking if editor exist
    //then going to inputs of sketch Node
    //checking if node already exists if not adding it to objects
    SerialisedEditor.nodes && 
        SerialisedEditor.nodes["1"].data.layers
        .forEach((visComp) => {
           if(!objects.some((obj) => obj.id === visComp.node)){
                const VPLcomp = SerialisedEditor.nodes[visComp.node.toString()];
                const p5Comp = new p5ComponentList[VPLcomp.name](VPLcomp)
                objects.push(p5Comp);
                layers.push(p5Comp);
           }
        }); 

    return [objects, layers];
}