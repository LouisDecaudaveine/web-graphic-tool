import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import Rete from "rete";
import FileExplorerCon from "../../reteControllers/FileExplorerCon";

export default class ImageComponent extends Rete.Component {
    constructor(){
        super("Image");
        this.path = ['Visual'];
        this.img = new Image();
    }
  

    builder(node){
        var fileExp = new FileExplorerCon(this.editor, "fileExp", node, "image",this.imgCallback);
        var width = new NumController(this.editor,"width", node, false, "width", false);
        var height = new NumController(this.editor,"height", node, false, "height", false);
        var xPos = new NumController(this.editor, "xPos", node, false, "x", false);
        var yPos = new NumController(this.editor, "yPos", node, false, "y", false);
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
       
        return node.addControl(fileExp).addControl(width).addControl(height).addControl(xPos).addControl(yPos).addOutput(outputVisData);
    }

    worker(node) {
        if(node.data.fileExp.filePath){
            this.img.src = node.data.fileExp.media;
            this.img.onload = () =>{
                this.editor.nodes
                .find((n) => n.id === node.id)
                .controls.get("width")
                .setValue(this.img.width);

                this.editor.nodes
                .find((n) => n.id === node.id)
                .controls.get("height")
                .setValue(this.img.height);
            }
        }
    }

}