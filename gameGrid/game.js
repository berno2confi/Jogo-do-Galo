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
let currentPlayer = "X";
let running = false;

initialize();


function initialize() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Joga ${currentPlayer}!`;
    running = true;
}

function cellClicked() {
    const index = this.getAttribute("cellIndex");

    if (cells[index].textContent != "" || !running)  // options was here
        return;

    updateCell(index);
    checkWinner();

    if (running) setTimeout(botsTurn, 500);
}




function updateCell(index) {
    cells[index].textContent = currentPlayer;  // options was here
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Joga ${currentPlayer}!`
}


function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const c1 = cells[condition[0]].textContent;
        const c2 = cells[condition[1]].textContent;
        const c3 = cells[condition[2]].textContent;

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
    else if (![...cells].map(cell => cell.textContent).includes("")) {      // options was here
        statusText.textContent = `Empate!`;
        running = false;
    }
    else changePlayer();
}


function restartGame() {
    currentPlayer = "X";  // options was here
    statusText.textContent = `Joga ${currentPlayer}!`
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function botsTurn() {
    // First phase: check if there is any cell that must be filled
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const c1 = cells[condition[0]].textContent;
        const c2 = cells[condition[1]].textContent;
        const c3 = cells[condition[2]].textContent;

        if (c1 == "X" && c2 == "X" && c3 == "") {
            updateCell(condition[2]);
            checkWinner();
            return;
        }
        else if (c1 == "X" && c2 == "" && c3 == "X") {
            updateCell(condition[1]);
            checkWinner();
            return;
        }
        else if (c1 == "" && c2 == "X" && c3 == "X") {
            updateCell(condition[0]);
            checkWinner();
            return;
        }

    }

    // Second phase: go straight to the middle cell if unoccupied - greedy
    if (cells[4].textContent == "") {
        updateCell(4);
        checkWinner();
        return;
    }

    // Third phase: implement choice algorithm
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent == "") {
            updateCell(i);
            checkWinner();
            break;
        }
    }

}



