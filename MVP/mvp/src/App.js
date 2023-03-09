import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';
import { useState, useEffect } from 'react';
import React from 'react';

function Editor(props){
  const [setContainer, getEditor,setEditor] = useRete();

  const [sketchCreated, setSketchCreated] = useState(false);

  useEffect(()=>{
    if(sketchCreated){
      setEditor(props.editedSerialised).
      then(() => {
        props.getSerializedData(getEditor());
      });
    }
  },[props.editedSerialised]);

  return (
    <div>
      <div 
        style = {{
          width: "50vw",
          height: "50vh",
          border: "solid black 2px",
          margin: "auto",
        }}>
          <div ref={(ref) => {
            ref && setContainer(ref);
            }}/>

      </div>
      <button
      onClick={ () =>{
        props.getSerializedData(getEditor());
        setSketchCreated(true);
      }}>Save Editor</button>
    </div>
  )
}


function App() {
  const [serialisedData, setSerialisedData] = useState({});
  const [editedSerialised, setEditedSerialised] = useState();

  const getSerialisedParentHandler = (se) => {
    // serializedEditor = JSON.parse(JSON.stringify(se));
    setSerialisedData(se);
    console.log("Saved VPE", serialisedData);
  }

  const setEditedParentHandler = (jsonData) => {
    setEditedSerialised(jsonData);
  } 

  //Currently I am building nodes and connections within createEditor()
  //in lowVPLWrapper.js. For the final build a demo editor will be sent to the Editor component,
  //then once the createEditor promise is done will use the editor.fromJSON() to init the demo

  return (
    <div className="App">
      <Editor getSerializedData={getSerialisedParentHandler} editedSerialised={editedSerialised}/>

      {
        serialisedData.nodes && 
        serialisedData.nodes["1"] && 
        serialisedData.nodes["1"].name === "Sketch" && 
        <P5Wrapper VPLState={serialisedData} 
          width={serialisedData.nodes["1"].data.width} 
          height ={serialisedData.nodes["1"].data.height}
          editedSerialisedHandler={setEditedParentHandler}/>
      }

    </div>
  );
}

export default App;
