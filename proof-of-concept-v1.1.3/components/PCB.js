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
    this.margin = Math.floor(this.h/30)

    this.title = {
        "text" : title,
        "size" : Math.floor(this.w / 15),
        "pos" : [this.x+this.margin, this.y+Math.floor(this.w / 15)],
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
            this.elements.forEach((element) => {
                element.obj.show()

                push()
                    noFill()
                    stroke(0,255,0)
                    rect(element.bbox[0],element.bbox[1],element.bbox[2],element.bbox[3])
                pop()
            })
        }
            
    }

    this.updateTitle = () => {
        this.title.pos = [this.x+this.title.size/2,this.y+this.title.size]
        this.title.bbox = font.textBounds(this.title.text, 
            this.title.pos[0], this.title.pos[1],this.title.size);  
    }
    this.updateTitle();

    this.titleVis = () => {
        fill(125);
        textSize(this.title.size);
        text(this.title.text,this.title.pos[0], this.title.pos[1]);

        //this is to show the bounding box of the text used for adding elements to block
        
        push();
            noFill()
            stroke(255,0,0);
            rect(this.title.bbox.x, this.title.bbox.y, this.title.bbox.w,this.title.bbox.h)
        pop();  
    }

    this.anchorPoint = [-1,-1];
    this.anchored = false;

    this.move = (newX,newY) => {
        //this is to move the object around the canvas 
        //to be called if the mouse is held down on the title section
        let xDiff = Math.floor(mouseX) - this.anchorPoint[0];
        let yDiff = Math.floor(mouseY) - this.anchorPoint[1]; 
        this.x += xDiff;
        this.y += yDiff;

        this.elements.forEach((element) => {
            element.obj.updatePos(xDiff,yDiff);
            element.bbox[0] += xDiff;
            element.bbox[1] += yDiff;
        })
         
        this.updateTitle();
        
        this.anchorPoint = [Math.floor(mouseX),Math.floor(mouseY)];
    }
    
    this.resize = () => {
        //resize the block
        //to be called if mouse held on either corners of the node
    }

    this.addSlider = (title,minVal,maxVal, Parent, steps = 0, value = null) => {
        //adding  slider to the node
        let id = Math.floor(Math.random(0,99999));
        this.itemCoords.push([this.title.pos[0]+10, this.title.pos[1]]);
        this.elements.push(
            {id : id,
             type : "slider",
             obj : new Slider(title,minVal,maxVal, Parent, steps, value, id),
             bbox : this.allot(this.w-4*this.margin,this.title.bbox.h), // x,y,w,h
            });
    }

    this.allot = (boundingW,boundingH) => {
        if(this.elements.length > 0) {
            let lastE = this.elements[this.elements.length-1].bbox;
            return([
                this.title.bbox.x,
                lastE[1] + lastE[3] + this.margin,
                boundingW,
                boundingH
            ])
        }
        else return ([
            this.title.bbox.x, 
            this.title.bbox.y + this.title.bbox.h + this.margin,
            boundingW,
            boundingH
        ])
        //needs x,y coords and w,h for bounds
        //goes through all elements and finds best place new obj
        //for now its just going to be done in rows 
    }
}
