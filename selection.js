let x = document.getElementById("playerX");
let o = document.getElementById("playerO");
const solo = document.getElementById("solo");
const bot = document.getElementById("bot");
const inf = document.getElementById("infinite");

x.addEventListener("click", () => choosePlayer("X"));
o.addEventListener("click", () => choosePlayer("O"));

function choosePlayer(player) {
    localStorage.setItem("jogador", player);
    window.location.href = "actualGame/game.html";
}


function pressDown(element) {
    element.addEventListener('click', () => {
        element.classList.add('button-pressed');
        setTimeout(() => {
            element.classList.remove('button-pressed');
        }, 10000); // 10 seconds
    });
}

document.addEventListener("DOMContentLoaded", () => {
    pressDown(solo);
    pressDown(bot);
    pressDown(inf);
    pressDown(x);
    pressDown(o);
});






