 //object constructor
function cell(){
    this.alive = Math.random() >0.8;    
    this.neighbours = 0;  //number of live neighbours
    this.checkneighbours = [[-1,-1],[-1,0],[0,-1],[-1,1],[1,-1],[1,0],[0,1],[1,1]];
}


function GoL(size){
    this.size = size;
    this.grid = this.makeGrid(size);
};      

    GoL.prototype.makeGrid = function(size){
        var grid = [];
        for(var i=0; i<size; i++){
            var row=[];
            for(var j =0; j<size; j++){
                row.push(new cell());   
            }
            grid.push(row);
        }
            return grid;
    };  

    GoL.prototype.drawGrid = function(){
		grid.innerHTML = '';
        for(var i=0;i<this.size;i++){
            var row =this.grid[i];
            var rowCell="";
            for(var j=0;j<this.size;j++){
                var cell = row[j];
                if(cell.alive){
                    rowCell += "X|";
                }else{
                    rowCell += " |";
                }               
            }
            grid.innerHTML = grid.innerHTML + rowCell + "\n";
        }       
    };  

GoL.prototype.underpopulation = function(ro,col){
    var cell = this.grid[ro][col];
    if(cell.neighbours <2){
        return true;
    }else{
        return false;   
    }
};  
GoL.prototype.overpopulation = function(ro,col){
    var cell = this.grid[ro][col];
    if(cell.neighbours >3){
        return true;
    }else{
        return false;   
    }
};  

GoL.prototype.backtolife = function(ro,col){
    var cell = this.grid[ro][col];
    if(cell.neighbours ==3 && !cell.alive){
    return true;
    }else{
        return false;   
    }   
};

GoL.prototype.update = function(ro,col){    
    var cell = this.grid[ro][col];
    cell.neighbours = 0;
    for(var i = 0; i < cell.checkneighbours.length; i++){
        // Get new indices
        var newRow = ro + cell.checkneighbours[i][0];
        var newCol = col + cell.checkneighbours[i][1];

        // Check that indices are in range
        if (newRow >= 0 && newRow < this.grid.length && newCol >= 0 && newCol < this.grid[newRow].length) {
            if(this.grid[newRow][newCol].alive){
                cell.neighbours++;
            }
        }
    }
};


GoL.prototype.updateAll = function(){
    for(var i=0; i<this.size-1;i++){
        for(var j=0; j<this.size-1;j++){
            this.update(i,j);
        }
    }   
}

GoL.prototype.cellstatus = function(ro,col){
    var cell = this.grid[ro][col];
    if(this.underpopulation(ro,col) || this.overpopulation(ro,col)){
        cell.alive = false;
    }else if(this.backtolife(ro,col)){
        cell.alive = true;
    }
};

GoL.prototype.allcellstatus = function(ro,col){
    for(var i=0; i<this.size;i++){
        for(var j=0; j<this.size;j++){
            this.cellstatus(i,j);
        }
    }   
};


var gameoflife = new GoL(80);   

var interval = setInterval(function(){
    gameoflife.drawGrid();
    gameoflife.updateAll();
    gameoflife.allcellstatus();
},200);    