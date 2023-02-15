// this component takes the canvas and turns it into blocks
function GridifyBlock(font, blocksPerRow = 25) {
    this.type = "GridifyBlock";
    this.base = new PCB((int)(random(0, width)), (int)(random(0, height)), 300, 200, "GRIDIFY", font)

    //size of the box
    this.size = (int)(width / blocksPerRow);
    // the amount of boxes on each axes
    this.boxNumX = blocksPerRow;
    this.boxNumY = Math.ceil(height / this.size);


    console.log(this.boxNumX, this.boxNumY);

    this.blockData = new Array(this.boxNumX, this.boxNumY);


    this.xDataRatio;
    this.yDataRatio;

    this.input = {};

    //example obj in inputs
    // {
    //     id : 212421, 
    //     type : "NoiseBlock",
    //     data : [],
    //     status: 0, // 0 nothing has changed
    //                // 1 grid needs to go through data and update 
    //                // 2 form of data has changed (i.e: sample rate decrease so data different shape)
    // }

    //there can be other types of inputs for example textures in future
    //may want to change type to something more abstract like "grid data" or "grid modifier"
    //but then again a new code block that connects data would probably be a better alternative


    //data shape is not mutable when implemented like this
    this.addInput = (inputObj) => {
        this.input = {
            id: inputObj.base.id,
            data: inputObj.value,
        };


        this.xDataRatio = this.input.data.length/this.boxNumX;
        this.yDataRatio = this.input.data[0].length/this.boxNumY;
    }

    this.updateInput = (newData) => {
        this.input.data = newData;
    }

    

    // having a system where you can subscribe to outputs 
    //would prob be more efficient but for now this will do

    //packed uint_32
    //under the form rgba
    // let r = (elem >> 24) & 0xFF;
    // let g = (elem >> 16) & 0xFF;
    // let b = (elem >> 8) & 0xFF;
    // let a = elem & 0xFF;

    this.display = () => {
        for (let x = 0; x < this.boxNumX; x++) {
            for (let y = 0; y < this.boxNumY; y++) {
                //this will be developed further later for now just rectange with colour in it
                push();
                fill(this.input.data[(int)(this.xDataRatio*x)][(int)(this.yDataRatio)*y]*255);
                noStroke();
                rect(x * this.size, y * this.size, this.size, this.size)
                pop();
            }
        }
    }


    //you make you canvas 
    //you turn it into a grid layout
    //you connect it to its data 
    //you can display it
    //you can update it 

}