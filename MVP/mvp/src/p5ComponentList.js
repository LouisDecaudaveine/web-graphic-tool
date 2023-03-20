import BlockifyComp from "./p5Components/BlockifyComp"
import ColourComp from "./p5Components/ColourComp"
import EllipseComp from "./p5Components/EllipseComp"
import AddComp from "./p5Components/maths/AddComp"
import MultComp from "./p5Components/maths/MultComp"
import SineComp from "./p5Components/maths/SineComp"
import StepComp from "./p5Components/maths/StepComp"
import NoiseComp from "./p5Components/NoiseComp"
import RectangleComp from "./p5Components/RectangleComp"
import TestComp from "./p5Components/TestComp"
import TextComp from "./p5Components/TextComp"

const p5ComponentList = {
    Step: StepComp,
    Sine: SineComp,
    Multiply: MultComp,
    Add: AddComp,
    Noise: NoiseComp,
    Blockify: BlockifyComp,
    Colour: ColourComp,
    Ellipse: EllipseComp,
    Rectangle: RectangleComp,
    Text : TextComp, 
    Test : TestComp,
}

export default p5ComponentList