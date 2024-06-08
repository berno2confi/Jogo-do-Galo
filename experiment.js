function checkWinner() {
    let roundWon = true;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        
        for (let j = 1; j < condition.length; j++) {
            c1 = cells[condition[j - 1]].textContent;
            c2 = cells[condition[j]].textContent;

            if (c1 == "" || c2 == "" || c1 != c2) {
                roundWon = false;
                break;
            }
        }
        
        if (!roundWon) break;
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