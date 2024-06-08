document.getElementById("playerX").addEventListener("click", () => choosePlayer("X"));
document.getElementById("playerO").addEventListener("click", () => choosePlayer("O"));

function choosePlayer(player) {
    localStorage.setItem("jogador", player);
    window.location.href = "game.html";
}


