import Rete from "rete";

const SocketList =  {
    numSocket : new Rete.Socket("Number Soc"),
    colourSocket: new Rete.Socket("Colour Soc"),
    floatArray2DSocket : new Rete.Socket("twoD Float Array Soc"),
    colourArray2DSocket : new Rete.Socket("twoD Colour Array Soc"),
    textSocket : new Rete.Socket("Text Soc"),
    coordArray : new Rete.Socket("Array of coordinates Soc"),
    testSocket: new Rete.Socket("Testing"),
    ListSocket: new Rete.Socket("List"),
    VisualSocket: new Rete.Socket("Visual Soc"),
}


//not sure if I want a list component yet so this may be axed
Object.entries(SocketList).forEach(([key,value]) => {
    if(key !== "ListSocket"){
        value.combineWith(SocketList["ListSocket"]);
    }
});



export default SocketList;