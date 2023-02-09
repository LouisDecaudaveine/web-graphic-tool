//Parent Code Block
//For this version of the project this will consist of 
//a node that can either be a noiseNode or a gridNode

function PCB(x,y,w,h, title = "UNTITLED", font){
    this.font = font;
    textFont(this.font)
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;

    this.title = {
        "text" : title,
        "size" : Math.floor(this.w / 15),
        "pos" : [this.x+Math.floor(this.w / 30), this.y+Math.floor(this.w / 15)],
        "bbox" : this.font.textBounds(title,this.x+Math.floor(this.w / 15),
            this.y+Math.floor(this.w / 15),Math.floor(this.w / 15)),
    };
    
    //this is where all the sliders, inputs, functionality, etc is stored
    //within a block of code
    this.elements = [];

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
        if(this.elements.length > 0){
            this.elements.forEach(({type,element}) => element.show())
        }
            
    }

    this.updateTitle = () => {
        this.title.pos = [this.x+this.title.size/2,this.y+this.title.size]
        this.title.bbox = font.textBounds(this.title.text, 
            this.title.pos[0], this.title.pos[1],this.title.size);  
    }

    this.titleVis = () => {
        fill(125);
        textSize(this.title.size);
        text(this.title.text,this.title.pos[0], this.title.pos[1]);

        //this is to show the bounding box of the text used for adding elements to block
        
        // push();
        //     noFill()
        //     stroke(255,0,0);
        //     rect(this.title.bbox.x, this.title.bbox.y, this.title.bbox.w,this.title.bbox.h)
        // pop();  
    }

    this.anchorPoint = [-1,-1];
    this.anchored = false;

    this.move = (newX,newY) => {
        //this is to move the object around the canvas 
        //to be called if the mouse is held down on the title section
        this.x += Math.floor(mouseX) - this.anchorPoint[0];
        this.y += Math.floor(mouseY) - this.anchorPoint[1]; 
         
        this.updateTitle();
        
        this.anchorPoint = [Math.floor(mouseX),Math.floor(mouseY)];
    }
    
    this.resize = () => {
        //resize the block
        //to be called if mouse held on either corners of the node
    }

    this.addSlider = (title,minVal,maxVal, Parent, steps = -1, value = null) => {
        //adding  slider to the node
        this.itemCoords.push([this.title.pos[0]+10, this.title.pos[1]]);
        this.elements.push(
            {type : "slider",
             element : new Slider(title,minVal,maxVal, Parent, steps, value)
            });
    }

    
}
