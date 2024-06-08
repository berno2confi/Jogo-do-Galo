/*function checkWinner() {
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
}*/