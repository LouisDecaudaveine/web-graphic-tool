import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";
import { createRoot } from "react-dom/client";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Context from "efficy-rete-context-menu-plugin";

export async function createEditor(container) {

    var components = [];

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

    //updates endgine when editor content is modified
    //abort() is used when a process becomes impossible and is therefore stopped
    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        async () => {
          console.log("process");
          await engine.abort();
          await engine.process(editor.toJSON());
        }
      );

    // A bit of library magic
    editor.view.resize();
    editor.trigger("process");
    //this handles the map of the flow-vpl
    AreaPlugin.zoomAt(editor, editor.nodes);
    
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