import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import Rete from "rete";
import FileExplorerCon from "../../reteControllers/FileExplorerCon";

export default class ImageComponent extends Rete.Component {
    constructor(callback){
        super("Image");
        this.path = ['Visual'];
        this.callback = callback;
    }

    builder(node){
        var fileExp = new FileExplorerCon(this.editor, "fileExp", node, "image",this.callback);
        var width = new NumController();
        var height = new NumController();
        var xPos = new NumController();
        var yPos = new NumController();
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
       
        return node.addControl(fileExp).addOutput(outputVisData);
    }

    worker(node) {

    }
}