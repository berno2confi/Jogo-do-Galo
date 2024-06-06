// Initial game logic

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = new Array(9).fill("");    
let currentPlayer = "X";
let running = false;

initialize();


// Start game, by making cells interactive
function initialize() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Joga ${currentPlayer}!`;
    running = true;
}

// What happens when a cell is clicked
function cellClicked() {
    const index = this.getAttribute("cellIndex");
    console.log(index);

    if (options[index] != "" || !running)
        return;

    updateCell(this, index);
    checkWinner();
}


function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Joga ${currentPlayer}!`
}


function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const c1 = options[condition[0]];
        const c2 = options[condition[1]];
        const c3 = options[condition[2]];

        if (c1 == "" || c2 == "" || c3 == "") continue;

        if (c1 == c2 && c2 == c3) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} ganhou!`;
        running = false;
    } 
    else if (!options.includes("")) {
        statusText.textContent = `Empate!`;
        running = false;
    }
    else changePlayer();
}


function restartGame() {
    currentPlayer = "X";
    options = new Array(9).fill("");    
    statusText.textContent = `Joga ${currentPlayer}!`
    cells.forEach(cell => cell.textContent = "");
    running = true;
}



