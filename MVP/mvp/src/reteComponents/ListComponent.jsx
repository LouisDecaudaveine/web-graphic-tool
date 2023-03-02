import SocketList from "../SocketList";
import Rete from "rete";


export default class ListComponent extends Rete.Component {
    constructor() {
        super("List");
    }

    builder(node){
        var inputs = new Rete.Input("elements", "List Items", SocketList.ListSocket, true);
        node.addInput(inputs);
    }

    worker(node){
        console.log(node.inputs)
    }
}