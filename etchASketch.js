let gridSize = 16; /* Change to change the number of grid squares */
const gridWidth = 400; /* width of grid in pixels */
let backgroundColor = 'black';
const etch = document.getElementById('etch');
let buttonDown = false;
let row;
let cell;
let mode = 'draw';
let chosenColor = 'black';

let drawGrid = function(gridSize){
    for (let i = 0; i < gridSize; i++){
        row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < gridSize; j++){
            cell = document.createElement('div');
            cell.className = 'cell';
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
    console.log("Removed the old grid");
};
drawGrid(gridSize);

/* look for each cell to be hover over */
// Remove the old grid and draw the new one 
// Removal of the old might have to be part of another function

let checkDraw = function(){
    let cells = document.querySelectorAll('.cell');
    cells.forEach((square) => {
        square.addEventListener('mouseenter', function(){
        /* only want to draw if the mouse is clicked */
        if (buttonDown) {
            square.style.background = backgroundColor;
            console.log("Changing the color of this square");
        };
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

let buttons = document.querySelectorAll('button');
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

}

let fill = function(cellColor){
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.background = cellColor;
    });
}


let draw = function(){
    /* Show the color options and make the background white */
    cellColor = 'white';
    fill(cellColor);
    document.getElementById(chosenColor).classList.remove('selectedColor');
    document.getElementById('black').classList.add('selectedColor');
    document.getElementById('title').textContent = 'Etch-A-Sketch';
    document.querySelector('.colors').style.display = 'block';
    document.querySelector('#etch').style.backgroundImage = "none";
    backgroundColor = 'black';
};

let scratch = function (){
    /* Hide the color options. Add a background image. Cover the image in gray squares */
    /* Add an animation to scratch off the card revealing the image behind */
    /* Set background color of each cell to transparent to reveal the picture behind */
    cellColor = 'darkgray';
    fill(cellColor);
    document.getElementById('title').textContent = 'Scratch Off';
    document.querySelector('.colors').style.display = 'none';
    document.querySelector('#etch').style.backgroundImage = "url('images/cat.jpg')";
    backgroundColor = 'transparent';
};

let puzzle = function (){
    document.getElementById('title').textContent = 'Puzzle';
    /* Show the color options and make the background white */
    /* Add clues for which colors go where -> The clues should be color coded
    and include the number of each color that should be included */
    /* Add animation to show when a color is incorrectly placed */
};