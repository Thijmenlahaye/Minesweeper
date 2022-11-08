//GAME INITIALIZATION

function initializeGame(rowSize, colSize){
    
    var minefield = [];

    //populate minefield. 
    let mines = []

    while(mines.length < 1){
        var r = Math.floor(Math.random() * rowSize*colSize) + 1;
        if(mines.indexOf(r) === -1) mines.push(r);
    }
    console.log(mines)
    //initialize allscells
    var minefield = []
    
    let cellIndex = 0
    for(let row = 0; row < rowSize; row ++){
        var mineRow = []
        for(let col=0; col < colSize; col ++){
            console.log(cellIndex)
            if (mines.includes(cellIndex)){
                mineRow.push(1)
            }else {
                mineRow.push(0)
            }
            cellIndex += 1 
        }
        minefield.push(mineRow)
        
    }
    console.log(minefield)
    

    //define neighbours
    var neighbours = []
    for(let row = 0; row < rowSize; row ++){
        var neighbourRow = []
        for(let col=0; col < colSize; col ++){
            let score = 0 
            if(col != 0){
                score += minefield[row][col-1] > 0 ? 1 : 0 
            }
            if(col < colSize - 1){
                score += minefield[row][col+1] > 0 ? 1 : 0 
            }
            if(row != 0){
                score += minefield[row-1][col] > 0 ? 1 : 0 
            }
            if(row < rowSize - 1){
                score += minefield[row+1][col] > 0 ? 1 : 0 
            }
            if(row != 0 && col != 0){
                score += minefield[row-1][col-1] > 0 ? 1 : 0 
            }
            if(row != 0 && col < colSize -1){
                score += minefield[row-1][col+1] > 0 ? 1 : 0 
            }
            if(row < rowSize - 1 && col != 0){
                score += minefield[row+1][col-1] > 0 ? 1 : 0 
            }
            if(row < rowSize -1 && col < colSize -1){
                score += minefield[row+1][col+1] > 0 ? 1 : 0
            }
            neighbourRow.push(score)
        }
        neighbours.push(neighbourRow)
    }
    
    return  [minefield, neighbours, mines]
}

//SITE IMPLEMENTATION
var rowSize = 5
var colSize = 10

//initalize game
var initializedGamestate = initializeGame(rowSize, colSize)
var minefield = initializedGamestate[0]
var neighbours = initializedGamestate[1]
var mines = initializedGamestate[2]


//get game main div
const gameContainer = document.getElementById("game--container")

//add cells to div based on minefield
let cellIndex = 0
for(let row = 0; row < rowSize; row ++){
    for(let col=0; col < colSize; col ++){
        

        //Generate HTML according to minefield and neighbours
        const newCell = document.createElement("div")
        newCell.classList.add("cell")
        newCell.setAttribute("data-cell-index", cellIndex)
        newCell.setAttribute("row", row)
        newCell.setAttribute("col", col)
        gameContainer.appendChild(newCell)
        if (mines.includes(cellIndex)){
            const img = document.createElement("img")
            img.src = "./imgs/mine.svg"
            newCell.appendChild(img)
            newCell.classList.add("mine")           
        }else{
            newCell.innerText = neighbours[row][col]
        }
        newCell.addEventListener("click", () => {
            newCell.classList.add("uncovered-cell")
            updateField(newCell)
            
        })
        cellIndex += 1 
    }    
}


function updateField(cell){
    if (mines.includes(parseInt(cell.getAttribute("data-cell-index")))){
        gameLost()
    } else{
        if (cell.innerText == "0"){
            let row = parseInt(cell.getAttribute("row"))
            let col = parseInt(cell.getAttribute("col"))
            var toTest = [[row, col]]
            var toUncover = [] 
            while(i > 0){
                toTest.forEach(testCell =>{
                    toUncover.push(testCell)
                    toTest.splice(testCell)
                    let row = testCell[0]
                    let col = testCell[1]
                    console.log(toTest.length)
                       
                    if(col != 0){
                        if(neighbours[row][col-1] === 0){
                            if(!toUncover.includes([row, col-1])){
                                toTest.push([row, col-1]) 
                            }
                        }
                    }
                    if(col < colSize - 1){
                        if(!toUncover.includes([row, col+1])){
                            if(neighbours[row][col+1] === 0){
                                toTest.push([row, col+1]) 
                            }
                        }
                    }
                    if(row != 0){
                        if(!toUncover.includes([row-1, col])){
                            if(neighbours[row-1][col] === 0){
                                toTest.push([row-1, col]) 
                            }
                        }
                    }
                    if(row < rowSize - 1){
                        if(!toUncover.includes([row+1, col])){
                            if(neighbours[row+1][col] === 0){
                                toTest.push([row+1, col]) 
                            }
                        }
                    }
                console.log(toTest)
                console.log(toUncover)
                })
            toUncover.forEach(cellIndexes =>{
                let row = cellIndexes[0]
                let col = cellIndexes[1]
                document.querySelector(`[row=${CSS.escape(row.toString())}][col=${CSS.escape(col.toString())}]`).classList.add("uncovered-cell")
                
            }) 
            }
        }
    }
}

function gameLost(){
    console.log("game over")
}




