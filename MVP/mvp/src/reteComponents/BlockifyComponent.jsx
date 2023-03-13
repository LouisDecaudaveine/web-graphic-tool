import SocketList from "../SocketList";
import NumController from "../reteControllers/NumController";
import Rete from "rete";

export default class BlockifyComponent extends Rete.Component {
    constructor() {
        super("Blockify");
    }

    builder(node) {
        var size = new NumController(this.editor, "blockSize", node, false, "Block Size");
        var inputData = new Rete.Input("2DColourArray", "Input Matrix", SocketList.colourArray2DSocket, false);
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
        return node.addInput(inputData).addControl(size).addOutput(outputVisData);
    }

    worker() {
        console.log("Blockify component worked")
    }
}