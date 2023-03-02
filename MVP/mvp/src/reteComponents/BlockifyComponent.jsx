import SocketList from "../SocketList";
import NumController from "../reteControllers/NumController";
import Rete from "rete";

export default class BlockifyComponent extends Rete.Component {
    constructor() {
        super("Blockify");
    }

    builder(node) {
        var widthCon = new NumController(this.editor, "width", node, false, "width");
        var heightCon = new NumController(this.editor, "height", node, false, "height");
        var inputData = new Rete.Input("2DFloatArr", "Input Matrix", SocketList.floatArray2DSocket, false);
        return node.addInput(inputData).addControl(widthCon).addControl(heightCon);
    }

    worker() {
        console.log("Blockify component worked")
    }
}