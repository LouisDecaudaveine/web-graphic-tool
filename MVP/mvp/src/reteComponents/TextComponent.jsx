import React, { useState, useEffect, useCallback, useRef } from "react";
import TextController from "../reteControllers/TextController";
import SocketList from "../SocketList";
import Rete from "rete";

export default class TextComponent extends Rete.Component {
    constructor(){
        super("Text");
    }

    builder(node) {
        var con1 = new TextController(this.editor, "text", node);
        var out1 = new Rete.Output("text", "String", SocketList.textSocket);
        var out2 = new Rete.Output("coordArr", "Point Cloud", SocketList.coordArray)
        return node.addControl(con1).addOutput(out1).addOutput(out2);
    }

    worker() {
        console.log("Text component is doing bits");
    }
}

