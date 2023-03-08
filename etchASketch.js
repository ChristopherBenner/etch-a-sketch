let gridSize = 15; /* Change to change the number of grid squares */
const gridWidth = 500; /* width of grid in pixels */
let backgroundColor = 'black';
const etch = document.getElementById('etch');

let row;
let cell;

let drawGrid = function(){
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
}

drawGrid();
/* look for each cell to be clicked */
let cells = document.querySelectorAll('.cell');
cells.forEach((square) => {
    square.addEventListener('mouseenter', function(){
        /*square.classList.add('filled');*/
        square.style.background = backgroundColor;
    });
});

/* look for a color to be clicked */
let colors = document.querySelectorAll('.color');
colors.forEach((color) => {
    color.addEventListener('click',()=>{
        backgroundColor = String(color.id);
        color.classList.add('selectedColor');
    });
})