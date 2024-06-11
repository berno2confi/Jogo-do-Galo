let x = document.getElementById("playerX");
let o = document.getElementById("playerO");

x.addEventListener("click", () => choosePlayer("X"));
o.addEventListener("click", () => choosePlayer("O"));

function choosePlayer(player) {
    localStorage.setItem("jogador", player);
    window.location.href = "actualGame/game.html";
}



const solo = document.getElementById("solo");
const bot = document.getElementById("bot");
const inf = document.getElementById("infinite");

function pressDown(element) {
    document.addEventListener("DOMContentLoaded", () => {
    
        element.addEventListener('click', () => {
            element.classList.add('button-pressed');
    
            setTimeout(() => {
                element.classList.remove('button-pressed');
            }, 10000); // 10 seconds
        });
    });
}

pressDown(solo);
pressDown(bot);
pressDown(inf);






