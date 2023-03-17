import BlockifyComp from "./p5Components/BlockifyComp"
import ColourComp from "./p5Components/ColourComp"
import EllipseComp from "./p5Components/EllipseComp"
import NoiseComp from "./p5Components/NoiseComp"
import RectangleComp from "./p5Components/RectangleComp"
import TestComp from "./p5Components/TestComp"
import TextComp from "./p5Components/TextComp"

const p5ComponentList = {
    Noise: NoiseComp,
    Blockify: BlockifyComp,
    Colour: ColourComp,
    Ellipse: EllipseComp,
    Rectangle: RectangleComp,
    Text : TextComp, 
    Test : TestComp,
}

export default p5ComponentList