import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';


function Editor(){
  const [setContainer] = useRete();

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


function App() {
  return (
    <div className="App">
      <Editor />
      <P5Wrapper />
    </div>
  );
}

export default App;
