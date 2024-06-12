const x = document.getElementById("playerX");
const o = document.getElementById("playerO");
const solo = document.getElementById("solo");
const bot = document.getElementById("bot");
const inf = document.getElementById("infinite");
const play = document.getElementById("play");

let pressedButtons = {
    x: false,
    o: false,
    solo: false,
    bot: false,
    infinite: false,
};

/*x.addEventListener("click", () => choosePlayer("X"));
o.addEventListener("click", () => choosePlayer("O"));

function choosePlayer(player) {
    localStorage.setItem("jogador", player);
    sendPressedButtons();
    window.location.href = "actualGame/game.html";
}*/

function pressDown(element, key) {
    element.addEventListener('click', () => {
        element.classList.add('button-pressed');
        pressedButtons[key] = true;

        setTimeout(() => {
            element.classList.remove('button-pressed');
            pressedButtons[key] = false;
        }, 10000); // 10 seconds
    });
}

pressDown(x, "playerX");
pressDown(o, "playerO");
pressDown(solo, "solo");
pressDown(bot, "bot");
pressDown(inf, "infinite");

play.addEventListener("click", () => {
    localStorage.setItem("pressedButtons", JSON.stringify(pressedButtons));
    window.location.href = "actualGame/game.html";
});

