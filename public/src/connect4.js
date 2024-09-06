var playerRed = "red";
var playerYellow = "blue";
// // var lastLoser = localStorage.getItem('lastLoser')
var currPlayer = 'red';

var gameOver = false;
var logicBoard = [];

var rows = 5;
var columns = 6;
var currColumns = [ 4, 4, 4, 4, 4, 4]; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    //create rack
    const tray = document.getElementById('tray')
    for(let i = 0; i < columns; i++){
        let rack = document.createElement('div');
        rack.id = i.toString();
        const style = ["h-full", "w-1/6", 'flex', 'justify-center', 'items-center']
        rack.classList.add(...style)
        rack.appendChild(setTray(i))
        tray.appendChild(rack)
    }


    //create board
    logicBoard = Array(rows).fill().map(() => Array(columns).fill(' '));

    const board = document.getElementById('board')
    for(let r = 0; r < rows; r++){
        let row = document.createElement('div');
        row.classList.add('flex')
        row.classList.add('flex-row')
        // row.classList.add('bg-green-600')
        for(let c = 0; c < columns; c++){
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            const style = ['w-1/6', 'aspect-square', 'rounded-full','m-2', 'shadow-xl']
            tile.classList.add(...style)
            tile.style.background = '#222222'
            row.appendChild(tile)
        }
        board.appendChild(row);
    }
    
}

function setTray(id){
    if (gameOver) {
        return;
    }

    let ball = document.createElement('div')
    const style = ['w-3/4', 'aspect-square', 'rounded-full','m-2']
    ball.classList.add(...style)
    ball.style.background = '#222222'
    ball.id = `${id}ball`
    ball.addEventListener('mouseenter', ()=>{
        ball.style.background = `${currPlayer}`
    })
    ball.addEventListener('mouseleave', ()=>{
        ball.style.background = '#222222'
    })
    ball.addEventListener('click', setPiece)
    return ball;
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let col = this.id[0]
    // figure out which row the current column should be on
    let row = currColumns[col]; 

    if (row < 0) { // board[r][c] != ' '
        return;
    }

    logicBoard[row][col] = currPlayer; //update JS board
    
    let tile = document.getElementById(row.toString() + "-" + col.toString());
    tile.style.background = `${currPlayer}`
    if(currPlayer === 'red') currPlayer = 'blue'
    else currPlayer = 'red'
    document.getElementById(`${this.id}`).style.background = `${currPlayer}`

    //update the row height for that column
    currColumns[col]--; //update the array

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (logicBoard[r][c] != ' ') {
                if (logicBoard[r][c] == logicBoard[r][c+1] && logicBoard[r][c+1] == logicBoard[r][c+2] && logicBoard[r][c+2] == logicBoard[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (logicBoard[r][c] != ' ') {
                if (logicBoard[r][c] == logicBoard[r+1][c] && logicBoard[r+1][c] == logicBoard[r+2][c] && logicBoard[r+2][c] == logicBoard[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (logicBoard[r][c] != ' ') {
                if (logicBoard[r][c] == logicBoard[r+1][c+1] && logicBoard[r+1][c+1] == logicBoard[r+2][c+2] && logicBoard[r+2][c+2] == logicBoard[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (logicBoard[r][c] != ' ') {
                if (logicBoard[r][c] == logicBoard[r-1][c+1] && logicBoard[r-1][c+1] == logicBoard[r-2][c+2] && logicBoard[r-2][c+2] == logicBoard[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (logicBoard[r][c] === 'red') {
        winner.innerText = "winner : Red";             
    } else {
        winner.innerText = "winner : Blue";
    }
    console.log('win');
    
    gameOver = true;
}