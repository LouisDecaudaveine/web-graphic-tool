import NumController from "../reteControllers/NumController";
import SocketList from "../SocketList";
import Rete from "rete";

export default class SketchComponent extends Rete.Component {
    constructor() {
        
        super("Sketch");
        this.path = [];
        this.data.noContextMenu = true;
        this.data["layers"] = []; 
    }

    builder(node) {
        var widthCon = new NumController(this.editor, "width", node, false, "Sketch Width");
        var heightCon = new NumController(this.editor, "height", node, false, "Sketch Height");
        var sketchInputs = new Rete.Input("viscomps", "visual components", SocketList.VisualSocket, true);
        return node.addInput(sketchInputs).addControl(widthCon).addControl(heightCon);
    }

    worker(node) {
        node.data.layers = node.inputs.viscomps.connections;
        this.data.layers = node.inputs.viscomps.connections;
    }

}