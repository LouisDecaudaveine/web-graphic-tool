import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';
import { useState } from 'react';
import React from 'react';

function Editor(props){
  const [setContainer, setGetEditorCallBack] = useRete();

  if(props.requestingEditor){
    console.log(setGetEditorCallBack)
    // props.getSerializedData(/*editorRef.toJSON*/setGetEditorCallBack());
    props.resetReqState();
  }


  return (
    <div 
      style = {{
        width: "50vw",
        height: "50vh",
        border: "solid black 2px",
        margin: "auto",
      }}>
        <div ref={(ref) => ref && setContainer(ref)}/>

    </div>
  )
}

function SaveEditorButton(props){
  return (
    <button
      onClick={props.OnClickHandler}
    >
      Save Code
    </button>
  )
}


function App() {
  const [currentSerialized, setCurrentSerialized] = useState({});
  const [requestingSerialized, setRequestingSerialized] = useState(false);
  
  const requestSerialized = () => {
    setRequestingSerialized(true);
  }
  
  const resetRequest = () => {
    setRequestingSerialized(false)
  }

  const getSerialisedParentHandler = (serializedData) => {
    setCurrentSerialized(serializedData);
  }


  return (
    <div className="App">
      <Editor getSerializedData={getSerialisedParentHandler} requestingEditor={requestingSerialized} resetReqState = {resetRequest}/>
      <SaveEditorButton OnClickHandler={requestSerialized}/>
      <P5Wrapper script={currentSerialized}/>
    </div>
  );
}

export default App;
