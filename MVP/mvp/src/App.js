import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';
import { useState } from 'react';
import React from 'react';

function Editor(props){
  const [setContainer, getEditor] = useRete();

  return (
    <div>
      <div 
        style = {{
          width: "50vw",
          height: "50vh",
          border: "solid black 2px",
          margin: "auto",
        }}>
          <div ref={(ref) => ref && setContainer(ref)}/>

      </div>
      <button
      onClick={ () =>{
        props.getSerializedData(getEditor());
      }}>Save Editor</button>
    </div>
  )
}


function App() {
  // I want this to be the state of App but wasnt working.
  const [serialisedData, setSerialisedData] = useState({});

  const getSerialisedParentHandler = (se) => {
    // serializedEditor = JSON.parse(JSON.stringify(se));
    setSerialisedData(se);
    console.log("Saved VPE", serialisedData);
  }

  //Currently I am building nodes and connections within createEditor()
  //in lowVPLWrapper.js. For the final build a demo editor will be sent to the Editor component,
  //then once the createEditor promise is done will use the editor.fromJSON() to init the demo

  return (
    <div className="App">
      <Editor getSerializedData={getSerialisedParentHandler}/>

      {
        serialisedData.nodes && 
        serialisedData.nodes["1"] && 
        serialisedData.nodes["1"].name === "Sketch" && 
        <P5Wrapper VPLState={serialisedData} width={serialisedData.nodes["1"].data.width} height ={serialisedData.nodes["1"].data.height}/>
      }

    </div>
  );
}

export default App;
