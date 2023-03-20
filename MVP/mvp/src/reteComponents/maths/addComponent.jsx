import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import Rete from "rete";

export default class AddComponent extends Rete.Component {
    constructor() {
        super("Add");
        this.path = ['Maths'];
    }

    builder(node) {
        var input1 = new Rete.Input("num1", "Number", SocketList.numSocket, false);
        var input2 = new Rete.Input("num2", "Number", SocketList.numSocket, false);
        var resultCon = new NumController(this.editor, "preview", node, true, "result", true);
        var output = new Rete.Output("output","Output", SocketList.numSocket, true);

        input1.addControl(new NumController(this.editor, "num1", node, true))
        input2.addControl(new NumController(this.editor, "num2", node, true))


        return node.addControl(resultCon).addInput(input1).addInput(input2).addOutput(output);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        var sum = n1 + n2;

        this.editor.nodes
        .find((n) => n.id == node.id)
        .controls.get("preview")
        .setValue(sum);
        outputs["output"] = sum;
    }
}