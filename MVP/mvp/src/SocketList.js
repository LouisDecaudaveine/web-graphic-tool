import Rete from "rete";

const SocketList =  {
    numSocket : new Rete.Socket("Float Value"),
    floatArray2DSocket : new Rete.Socket("2D Float Array"),
    textSocket : new Rete.Socket("String value"),
    coordArray : new Rete.Socket("Array of coordinates"),
    ListSocket: new Rete.Socket("Any Type that fits in a list"),
}

Object.entries(SocketList).forEach(([key,value]) => {
    if(key !== "ListSocket"){
        value.combineWith(SocketList["ListSocket"]);
    }
});

export default SocketList;