let gridSize = 16;
const defaultGridSize = 16; /* Change to change the number of grid squares */
const gridWidth = 400; /* width of grid in pixels */
let backgroundColor = 'black';
const etch = document.getElementById('etch');
let buttonDown = false;
let row;
let cell;
let filledCells;
let selectedCells;
let chosenCells;
let mode = 'draw';
let chosenColor = 'black';


let drawGrid = function(gridSize){
    for (let i = 0; i < gridSize; i++){
        row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < gridSize; j++){
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `a${i}${j}`;
            row.appendChild(cell);
        }
        etch.appendChild(row);
    };
};

let removeGrid = function(){
    let rows = document.querySelectorAll('.row');
    rows.forEach((gridRow) => {
        gridRow.remove();
    });
    //console.log("Removed the old grid");
};
drawGrid(gridSize);

/* look for each cell to be hover over */
// Remove the old grid and draw the new one 
// Removal of the old might have to be part of another function

let checkDraw = function(){
    // Want to check to see if a cell has been clicked or entered
    let cells = document.querySelectorAll('.cell');
    let cellId;
    cells.forEach((square) => {
        square.addEventListener('mouseenter', function(){
        /* only want to draw if the mouse is clicked */
        if (buttonDown) {
            if (mode === 'puzzle'){
                cellId = String(square.id);
                checkCell(cellId);
            } else {
            square.style.background = backgroundColor;
            }
        };
    });
        square.addEventListener('click', function(){
            console.log(mode);
            if (mode === 'puzzle'){
                cellId = String(square.id);
                checkCell(cellId);
            } else {
            square.style.background = backgroundColor;
            }
        });
});
};
checkDraw();
let mouseDown = function(){
    buttonDown = true;
};
let mouseUp = function(){
    buttonDown = false;
};

/* look for a color to be clicked */
let colors = document.querySelectorAll('.color');
colors.forEach((color) => {
    color.addEventListener('click',()=>{
        /* remove the previously selected color and set the new color as selected */
        document.getElementById(backgroundColor).classList.remove('selectedColor');
        backgroundColor = String(color.id);
        chosenColor = String(color.id);
        color.classList.add('selectedColor');
    });
})

let buttons = document.querySelectorAll('.buttons > button');
buttons.forEach((button => {
    button.addEventListener('click', () =>{
        document.getElementById(mode).classList.remove('selected');
        mode = String(button.id);
        button.classList.add('selected');
    });

}));

let slider = document.getElementById('gridSize');
let output = document.getElementById('dimensions');

slider.oninput = function(){
    output.innerHTML = `${this.value} x ${this.value}`;
    gridSize = this.value;
    removeGrid();
    drawGrid(gridSize);
    fill(cellColor)
    checkDraw();
};

let fill = function(cellColor){
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.background = cellColor;
    });
}

let reset = function(gridSize, cellColor){
    removeGrid();
    drawGrid(gridSize);
    fill(cellColor);
    checkDraw();
    document.querySelector('.slideContainer').style.display = 'flex';
    document.querySelector('#gridSize').value = gridSize;
    document.getElementById('dimensions').innerHTML = `${gridSize} x ${gridSize}`; 
    document.getElementById('colClues').style.display = 'none';
    document.getElementById('rowClues').style.display = 'none';
}

let draw = function(){
    /* Show the color options and make the background white */
    cellColor = 'white';
    gridSize = defaultGridSize;
    reset(gridSize,cellColor);
    //fill(cellColor);
    document.getElementById(chosenColor).classList.remove('selectedColor');
    document.getElementById('black').classList.add('selectedColor');
    document.getElementById('title').textContent = 'Etch-A-Sketch';
    document.querySelector('.colors').style.display = 'block';
    document.querySelector('#etch').style.backgroundImage = "none";
    document.querySelector('.instructions').style.display = 'none';
    backgroundColor = 'black';
};

let scratch = function (){
    /* Set background color of each cell to transparent to reveal the picture behind */
    cellColor = 'darkgray';
    gridSize = defaultGridSize;
    reset(gridSize,cellColor);
    document.getElementById('title').textContent = 'Scratch Off';
    document.querySelector('.colors').style.display = 'none';
    document.querySelector('#etch').style.backgroundImage = "url('images/cat.jpg')";
    document.querySelector('.instructions').style.display = 'none';
    backgroundColor = 'transparent';

};

let showInstructions = function(){
    document.querySelector('.instructionBox').style.display = 'flex';
    document.querySelector('#showInstructions').style.display = 'none';
};

let hideInstructions = function(){
    document.querySelector('.instructionBox').style.display = 'none';
    document.querySelector('#showInstructions').style.display = 'block';
}

let puzzle = function (){
    document.getElementById('title').textContent = 'Puzzle';
    let puzzleSize = array.length;
    cellColor = 'white';
    gridSize = puzzleSize;
    reset(gridSize,cellColor);
    document.querySelector('.slideContainer').style.display = 'none';
    document.querySelector('.colors').style.display = 'none';
    document.querySelector('.instructions').style.display = 'block';
    filledCells = countCells();
    selectedCells = 0;
    chosenCells = [];
    document.getElementById('colClues').style.display = 'flex';
    document.getElementById('rowClues').style.display = 'block';
    displayRowClues();
    displayColClues();
    resetClues();
    /* Show the color options and make the background white */
    /* Add clues for which colors go where -> The clues should be color coded
    and include the number of each color that should be included */
    /* Add animation to show when a color is incorrectly placed */
};

// Create the basic puzzle shape of an airplane
let array = [[0,0,1,0,0],
            [0,1,1,1,0],
            [1,1,1,1,1],
            [0,0,1,0,0],
            [0,1,1,1,0]];


let getRowClues = function(array){
    let rows = [];
    let clues;
    let count;
    for (let rowPos = 0; rowPos <  array.length; rowPos++){
        clues = [];
        count = 0;
        for (let colPos = 0; colPos < array[0].length; colPos++){
            if (array[rowPos][colPos] === 1){
                count++;
            };
            if ((array[rowPos][colPos] === 0 && count > 0) || (array[rowPos][colPos] === 1 && colPos === array[0].length - 1)){
                clues.push(count);
                count = 0;
            };
        };
        count = 0;
        rows.push(clues);
        clues = [];
    };
    console.log(rows);
    return rows;
};

let displayRowClues = function(){
    let rowClue = '';
    let rowClues;
    let clue;
    let rows = getRowClues(array);
    for (let row = 0; row < rows.length; row++){
        rowClue = rows[row].join(' ');
        console.log(rowClue);
        clue = document.createElement('div');
        clue.textContent = rowClue;
        rowClues = document.getElementById('rowClues');
        rowClues.appendChild(clue);
        rowClue = 0;
    };   
};
// Change to columns
let displayColClues = function(){
    let colClue = '';
    let colClues;
    let clue;
    let cols = getColumnClues(array);
    for (let col = 0; col < cols.length; col++){
        colClue = cols[col].join('\r\n');
        console.log(colClue);
        clue = document.createElement('div');
        clue.textContent = colClue;
        colClues = document.getElementById('colClues');
        colClues.appendChild(clue);
        colClue = 0;
    };   
};

let resetClues = function(){
    let clues = document.querySelectorAll('.clues > div');
    clues.forEach((clue) => {
        clue.remove();
    });
    displayRowClues();
    displayColClues();
}

let getColumnClues = function(array){
    let columns = [];
    let clues;
    let count;
    for (let colPos = 0; colPos <  array[0].length; colPos++){
        clues = [];
        count = 0;
        for (let rowPos = 0; rowPos < array.length; rowPos++){
            if (array[rowPos][colPos] === 1){
                count++;
            };
            if ((array[rowPos][colPos] === 0 && count > 0) || (array[rowPos][colPos] === 1 && rowPos === array.length - 1)){
                clues.push(count);
                count = 0;
            };
        };
        count = 0;
        columns.push(clues);
        clues = [];
    };
    return columns;
};

let checkCell = function(cellId){
    // cellId is in the form of a[row][col] as a string
    let row = cellId[1];
    let col = cellId[2];
    let color;
    if (array[row][col] === 1){
        color = 'black';
        if (!chosenCells.includes(cellId)){
            chosenCells.push(cellId);
            selectedCells++;
        }
    } else {
        color = 'red';
    }
    document.getElementById(cellId).style.background = color;
    if (array[row][col] === 1){checkWin(selectedCells)};
};

let checkWin = function(selectedCells){
    if (selectedCells === filledCells){
        alert('Congratulations, you win! You found the airplane.');
    }
}

let countCells = function(){
    let filledCells = 0;
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array[0].length; j++){
            if (array[i][j] === 1){
                filledCells++;
            };
        };
    };
    console.log(filledCells);
    return filledCells;
}