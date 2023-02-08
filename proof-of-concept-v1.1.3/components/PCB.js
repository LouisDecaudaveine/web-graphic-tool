//Parent Code Block
//For this version of the project this will consist of 
//a node that can either be a perlin noise 

function PCB(x,y,w,h, title = "UNTITLED"){

    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.title = title;
    this.titleSize = Math.floor(this.w / 15);
    this.color = (255,255,255);
    this.radius = w/25;
    
    //When adding sliders/input boxes/etc :
    //there needs to be coordinates for all the items
    this.itemCoords = [];

    this.show = () => {
        fill(this.color);
        rect(this.x,this.y,this.w,this.h, this.radius);
        this.titleVis();
        
    }

    this.titleVis = () => {
        fill(125);
        textAlign(LEFT,CENTER);
        textSize(this.titleSize);
        text(title,this.x+this.titleSize, this.y+this.titleSize);
    }

    this.anchorPoint = [-1,-1];
    this.anchored = false;
    this.move = (newX,newY) => {
        //this is to move the object around the canvas 
        //to be called if the mouse is held down on the title section
        this.x = newX;
        this.y = newY;
    }
    
    this.resize = () => {
        //resize the block
        //to be called if mouse held on either corners of the node
    }

}
