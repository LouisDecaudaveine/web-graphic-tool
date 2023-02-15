let temp = [];
let connections = [];
let inputMP3;
let col = 0
let font;

function preload() {
  font = loadFont('./assets/mirror 82_v2.otf');
}

function setup() {
  createCanvas(1200, 800);
  inputMP3 = createFileInput(() => {
    col = 125
  });
  // temp.push(new PCB(100,100,300,200, "Giving", font));
  //   temp[0].addSlider("test", 0, 10, temp[0]);
  //   temp[0].addSlider("test2", 0, 10, temp[0]);
  //   temp[0].addSlider("test2", 0, 10, temp[0]);
  // temp.push(new PCB(100,400,300,200, "Receiving", font));
  //   temp[1].addSlider("test", 0, 10, temp[0]);
  //   temp[1].addSlider("test2", 0, 10, temp[0]);
  temp.push(new NoiseBlock(font,[50,40],3));
  temp.push(new GridifyBlock(font, 50));
  addConnection(temp[1], temp[0]);

}


function draw() {
  background(col);
  temp[0].threeDMove();
  // temp[0].dislpay();
  temp[1].display();
  temp.forEach((block) => {
    block.base.show()
  })
  
  
  noLoop()
  // console.log((int)(frameRate()))
  
}
function mousePressed() {
  temp.forEach((block) => {
    if(mouseX > block.base.x &&
      mouseX < block.base.x +block.base.w &&
      mouseY > block.base.y &&
      mouseY < block.base.y+1.5*block.base.titleSize){
      block.base.anchorPoint = [Math.floor(mouseX),Math.floor(mouseY)]
      block.base.anchored = true;
    }
  });
}
function mouseDragged() {
  temp.forEach((block) => {
    //this is for moving the blocks
    //if an anchor point has been set then move block to mouse
    //and update the anchor point
    if(block.base.anchored) {
      block.base.move();
    }
  })
}

function mouseReleased(){

  temp.forEach((block) => {
    //this is resetting the anchor points of each block
    block.base.anchorPoint = [-1,-1];
    block.base.anchored = false;
  })
}

function addConnection(input, output){
  connections.push({
    input: input.base.id,
    output: output.base.id,
  });

  input.addInput(output);
  output.addOutput(input);
}
//NOTE TO SELF: padding is included 
//in mouse position not how to stop it other then manually
