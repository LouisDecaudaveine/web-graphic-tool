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
import SketchComponent from "./reteComponents/SketchComponent";
import EndlessTest from "./reteComponents/EndlessTest";
import ColourFilterComponent from "./reteComponents/ColourFilter";
import RectangleComponent from "./reteComponents/RectangleComponent";
import EllipseComponent from "./reteComponents/EllipseComponent";
import ColourComponent from "./reteComponents/ColourComponent";

export async function createEditor(container) {

    var components = [
       new SketchComponent(),
       new NoiseComponent(),
       new TextComponent(), 
       new BlockifyComponent(),  
       new EndlessTest(),
       new ColourFilterComponent(),
       new RectangleComponent(),
       new EllipseComponent(),
       new ColourComponent(),];

    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);new SketchComponent()
    editor.use(ReactRenderPlugin, { createRoot });
    editor.use(Context);

    var engine = new Rete.Engine("demo@0.1.0");
    
    //adding components to editor and engine
    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    // var n1 = await components[0].createNode({
    //   speed: 0.01,
    //   dimensions: 2,
    //   seed: Math.round(Math.random()*10000),
    // });
    // var n2 = await components[1].createNode({
    //   xPos: 50, 
    //   yPos: 100,
    //   size: 12,
    // });

    // var n3 = await components[2].createNode({
    //   width: 30,
    //   height: 50,
    // });
    // var n4 = await components[3].createNode();
    var n5 = await components[0].createNode({
      width : 500,
      height: 500,
    });

    // n1.position = [50,50];
    // n2.position = [100,50];
    // n3.position = [300,50];
    // n4.position = [-100,50];
    n5.position = [-300,50];
    // editor.addNode(n1);
    // editor.addNode(n2);
    // editor.addNode(n3);
    // editor.addNode(n4);
    editor.addNode(n5);

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


    //this is half of the solution to make sure that only 1 sketch component is possible
    editor.on('showcontextmenu', ({ node }) => {
      return !node || !editor.components.get(node.name).data.noContextMenu;
    });
    
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


export function useRete(props) {
    const [container, setContainer] = useState(null);
    const editorRef = useRef();

    const getEditor = () => {
      return editorRef.current.toJSON();
    }


    const setEditor = async (newEditor) => {
      console.log("now in the VPL wrapper before await");
      await editorRef.current.fromJSON(newEditor);
      console.log("after await");
    }

    useEffect(() => {
      if (container) {
          createEditor(container).then((value) => {
          console.log("created");
          editorRef.current = value;
        })
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
  
    return [setContainer,getEditor, setEditor];
  }