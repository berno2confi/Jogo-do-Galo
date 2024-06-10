// Draw the game

let gridSize = 3;

function drawGame() {
    const cellContainer = document.getElementById("cellContainer");
    cellContainer.innerHTML = ""; // Clear any existing cells

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("cellIndex", i);
        cellContainer.appendChild(cell);
    }
}

// Set win conditions

const winConditions = [];

function setWinConditions() {
    // Rows
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(i * gridSize + j);
        }
        winConditions.push(row);
    }

    // Columns
    for (let i = 0; i < gridSize; i++) {
        const column = [];
        for (let j = 0; j < gridSize; j++) {
            column.push(i + j * gridSize);
        }
        winConditions.push(column);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < gridSize; i++) {
        diagonal1.push(i * gridSize + i);
        diagonal2.push((i + 1) * gridSize - (i + 1));
    }
    winConditions.push(diagonal1, diagonal2);
}

//////////////////////////////////////////////

drawGame();
setWinConditions();

// Initial game logic

let cells;
let statusText;
let restartBtn;
let reselectBtn;
let currentPlayer;
let playerChoice;
let running = false;

// Get chosen player
window.addEventListener("load", () => {
    playerChoice = localStorage.getItem("jogador");
    if (!playerChoice) window.location.href = "../index.html";
    else initialize();
})



function initialize() {
    cells = document.querySelectorAll(".cell");
    statusText = document.querySelector("#statusText");
    restartBtn = document.querySelector("#restartBtn");
    reselectBtn = document.querySelector("#reselectBtn");

    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    reselectBtn.addEventListener("click", reselectPlayer);

    currentPlayer = "X";
    statusText.textContent = `Joga ${currentPlayer}!`;
    running = true;

    reselectBtn.style.display = "none";

    if (playerChoice === "O") setTimeout(botsTurn, 500);
}

function cellClicked() {
    const index = this.getAttribute("cellIndex");

    if (cells[index].textContent != "" || !running) 
        return;

    updateCell(index);
    checkWinner();

    if (running) setTimeout(botsTurn, 500);
}


function updateCell(index) {
    cells[index].textContent = currentPlayer; 
    cells[index].classList.add(currentPlayer);  // append x or o to the end of "cell", for styling purposes
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Joga ${currentPlayer}!`
}


function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const conditionValues = condition.map(index => cells[index].textContent);

        if (conditionValues.includes("")) continue;

        if (conditionValues.every(val => val === conditionValues[0])) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} ganhou!`;
        if (currentPlayer == "X") statusText.style.color = "#FF6666";  
        else statusText.style.color = "#ADD8E6"; 
        running = false;
        reselectBtn.style.display = "block"; 
    } 
    else if (![...cells].map(cell => cell.textContent).includes("")) {      // options was here
        statusText.textContent = `Empate!`;
        running = false;
        reselectBtn.style.display = "block"; 
    }
    else changePlayer();
}


function restartGame() {
    currentPlayer = "X";
    statusText.textContent = `Joga ${currentPlayer}!`
    statusText.style.color = ""
    cells.forEach(cell => {
        cell.textContent = ""
        cell.classList.remove("X", "O");
    });
    running = true;

    reselectBtn.style.display = "none"; 

    if (playerChoice == "O") setTimeout(botsTurn, 500);
}

function reselectPlayer() {
    localStorage.removeItem("jogador");
    window.location.href = "../index.html";
}

function botsTurn() {
    // First phase: check if there is any cell that must be filled, and win if possible
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const conditionValues = condition.map(index => cells[index].textContent);

        const emptyIndices = [];
        const filledValues = [];

        for (let j = 0; j < condition.length; j++) {
            if (conditionValues[j] == "") 
                emptyIndices.push(condition[j]);
            else 
                filledValues.push(conditionValues[j]);
        }

        if (filledValues.length === gridSize - 1 && emptyIndices.length === 1) {
            if (filledValues.every(val => val === filledValues[0])) {
                updateCell(emptyIndices[0]);
                checkWinner();
                return;
            }
        }
    }
    // Second phase: go straight for the middle cell if unoccupied - greedy
    const middleIndex = Math.floor((gridSize * gridSize) / 2);
    if (cells[middleIndex].textContent == "") {
        updateCell(middleIndex);
        checkWinner();
        return;
    }
    // Third phase: implement some choice algorithm
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent == "") {
            updateCell(i);
            checkWinner();
            break;
        }
    }

}



