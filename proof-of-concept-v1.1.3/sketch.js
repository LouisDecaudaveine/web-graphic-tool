let temp = [];
let inputMP3;
let col = 0

function setup() {
  createCanvas(800, 800);
  inputMP3 = createFileInput(() => {
    col = 125
  });
  temp.push(new PCB(100,100,300,200, "IDIAT"));
}

function draw() {
  background(col);
  temp[0].show();
  
}
function mousePressed() {
  temp.forEach((block) => {
    if(mouseX > block.x &&
      mouseX < block.x +block.w &&
      mouseY > block.y &&
      mouseY < block.y+1.5*block.titleSize){
      block.anchorPoint = [Math.floor(mouseX),Math.floor(mouseY)]
      block.anchored = true;
    }
  });
}
function mouseDragged() {
  temp.forEach((block) => {
    //this is for moving the blocks
    //if an anchor point has been set then move block to mouse
    //and update the anchor point
    if(block.anchored) {
      block.x += Math.floor(mouseX) - block.anchorPoint[0];
      block.y += Math.floor(mouseY) - block.anchorPoint[1];  
      block.anchorPoint = [Math.floor(mouseX),Math.floor(mouseY)]
    }
  })
}

function mouseReleased(){

  temp.forEach((block) => {
    //this is resetting the anchor points of each block
    block.anchorPoint = [-1,-1];
    block.anchored = false;
  })
}


//NOTE TO SELF: padding is included 
//in mouse position not how to stop it other then manually
