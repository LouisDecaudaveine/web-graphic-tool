import React, { useState, useEffect, useCallback, useRef } from "react";
import TextController from "../../reteControllers/TextController";
import SocketList from "../../SocketList";
import Rete from "rete";
import NumController from "../../reteControllers/NumController";

export default class TextComponent extends Rete.Component {
    constructor(){
        super("Text");
        this.path = ['Visual'];
        
    }

    builder(node) {
        var con1 = new TextController(this.editor, "text", node);
        var col = new Rete.Input("colour", "Colour", SocketList.colourSocket,false);
        var size = new Rete.Input("size", "Size", SocketList.numSocket, false);
        size.addControl(new NumController(this.editor,"size", node, false, "size"));
        var posX = new NumController(this.editor,"xPos", node, false, "x");
        var posY = new NumController(this.editor,"yPos", node, false, "y");
        var out1 = new Rete.Output("textbox", "TextBox", SocketList.VisualSocket);
        var out2 = new Rete.Output("coordArr", "Point Cloud", SocketList.coordArray)
        return node.addInput(size).addInput(col).addControl(con1).addControl(posX).addControl(posY).addOutput(out1).addOutput(out2);
    }

    worker() {
    }
}

