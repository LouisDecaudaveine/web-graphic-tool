import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";
import { createRoot } from "react-dom/client";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from 'rete-context-menu-plugin';
import NoiseComponent from "./reteComponents/NoiseComponent"
import TextComponent from "./reteComponents/visualComponents/TextComponent";
import BlockifyComponent from "./reteComponents/visualComponents/BlockifyComponent";
import ListComponent from "./reteComponents/ListComponent";
import SketchComponent from "./reteComponents/SketchComponent";
import EndlessTest from "./reteComponents/EndlessTest";
import RectangleComponent from "./reteComponents/visualComponents/RectangleComponent";
import EllipseComponent from "./reteComponents/visualComponents/EllipseComponent";
import ColourComponent from "./reteComponents/ColourComponent";
import SineComponent from "./reteComponents/maths/SineComponent";
import MultiplyComponent from "./reteComponents/maths/multiplyComponent";
import AddComponent from "./reteComponents/maths/addComponent";
import StepComponents from "./reteComponents/maths/stepComponent";
import ImageComponent from "./reteComponents/visualComponents/ImageComponent";

export async function createEditor(container) {

    var components = [
       new SketchComponent(),
       new NoiseComponent(),
       new TextComponent(), 
       new BlockifyComponent(),  
       new RectangleComponent(),
       new EllipseComponent(),
       new ColourComponent(),
       new SineComponent(),
       new MultiplyComponent(),
       new StepComponents(),
       new AddComponent(),
       new ImageComponent(),];

    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin, { createRoot });

    var engine = new Rete.Engine("demo@0.1.0");
    
    //adding components to editor and engine
    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    editor.use(ContextMenuPlugin, {
      // allocate(component) { 
      //   return component.path;
      // },
    });

    var n5 = await components[0].createNode({
      width : 800,
      height: 1000,
    });
    n5.position = [-300,50];
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