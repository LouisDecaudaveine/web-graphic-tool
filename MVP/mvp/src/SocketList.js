import Rete from "rete";

export default {
    floatSocket : new Rete.Socket("Float Value"),
    floatArray2DSocket : new Rete.Socket("2D Float Array"),
    textSocket : new Rete.Socket("String value"),
    coordArray : new Rete.Socket("Array of coordinates"),
}