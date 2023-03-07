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
      }}>Save Me</button>
    </div>
    
  )
}


function App() {
  const [currentSerialized, setCurrentSerialized] = useState({});
  
  const getSerialisedParentHandler = (serializedData) => {
    setCurrentSerialized(serializedData);
  }

  //Currently I am building nodes and connections within createEditor()
  //in lowVPLWrapper.js. For the final build a demo editor will be sent to the Editor component,
  //then once the createEditor promise is done will use the editor.fromJSON() to init the demo

  return (
    <div className="App">
      <Editor getSerializedData={getSerialisedParentHandler}/>
      <P5Wrapper VPLState={currentSerialized} />
    </div>
  );
}

export default App;
