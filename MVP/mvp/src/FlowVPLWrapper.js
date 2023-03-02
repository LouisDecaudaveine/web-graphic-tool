import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";
import { createRoot } from "react-dom/client";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Context from "efficy-rete-context-menu-plugin";
import NoiseComponent from "./reteComponents/NoiseComponent"
import TextComponent from "./reteComponents/TextComponent";
import BlockifyComponent from "./reteComponents/BlockifyComponent";
import ListComponent from "./reteComponents/ListComponent";

export async function createEditor(container) {

    var components = [new NoiseComponent(), new TextComponent(), new BlockifyComponent(), new ListComponent()];

    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin, { createRoot });
    editor.use(Context);

    var engine = new Rete.Engine("demo@0.1.0");
    
    //adding components to editor and engine
    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    var n1 = await components[0].createNode({
      speed: 0.01,
      dimensions: 2,
      seed: Math.round(Math.random()*10000),
    });
    var n2 = await components[1].createNode();
    var n3 = await components[2].createNode({
      width: 30,
      height: 50,
    });
    var n4 = await components[3].createNode();

    n1.position = [50,50];
    n2.position = [100,50];
    n3.position = [300,50];
    n4.position = [-100,50];
    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(n3);
    editor.addNode(n4);

    //updates engine when editor content is modified
    //abort() is used when a process becomes impossible and is therefore stopped
    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        async () => {
          console.log("process");
          await engine.abort();
          await engine.process(editor.toJSON());
        }
      );

    //this gets rid of double click zoom that is not needed
    editor.on('zoom', ({ source }) => {
      return source !== 'dblclick';
    });

    // A bit of library magic
    editor.view.resize();
    editor.trigger("process");
    //this handles the map of the flow-vpl
    AreaPlugin.zoomAt(editor, editor.nodes);
    
    console.log(editor.toJSON())

    return editor;
}


export function useRete() {
    const [container, setContainer] = useState(null);
    const editorRef = useRef();
  
    useEffect(() => {
      if (container) {
        createEditor(container).then((value) => {
          console.log("created");
          editorRef.current = value;
        });
      }
    }, [container]);
  
    useEffect(() => {
      return () => {
        if (editorRef.current) {
          console.log("destroy");
          editorRef.current.destroy();
        }
      };
    }, []);
  
    return [setContainer];
  }