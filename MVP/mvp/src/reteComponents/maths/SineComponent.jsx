import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import DropdownController from "../../reteControllers/DropdownController";
import Rete from "rete";

export default class SineComponent extends Rete.Component {
    constructor() {
        super("Sine");
        this.path = ['Maths'];
    }

    builder(node) {
        var preview = new NumController(this.editor, "prevVal", node, true, "Start Value", true);
        var step = new NumController(this.editor, "speed", node, true, "step size");
        var offset = new NumController(this.editor, "offset", node, true, "offset");
        var sineOptions = new DropdownController(this.editor, "sineOps", node,
        [
            {value:"Sine", label:"Sine" },
            {value: "Cosine", label: "Cosine"},
        ]
        ,"Sine Options", "Sine");
        var outputVal = new Rete.Output("float", "output", SocketList.numSocket, true);
        return node.addControl(preview).addControl(sineOptions).addControl(step).addControl(offset).addOutput(outputVal);
    }

    worker(node, inputs, outputs) {
        this.editor.nodes
        .find((n) => n.id == node.id)
        .controls.get("prevVal").setValue(
            node.data.sineOps === "Sine" ? Math.sin(node.data.offset).toFixed(5):
            Math.cos(node.data.offset).toFixed(5));
        outputs["float"] = node.data.prevVal;
    }
}