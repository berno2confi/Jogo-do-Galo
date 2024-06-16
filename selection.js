const x = document.getElementById("playerX");
const o = document.getElementById("playerO");
const solo = document.getElementById("solo");
const bot = document.getElementById("bot");
const inf = document.getElementById("infinite");
const play = document.getElementById("play");

let pressedButtons = {
    playerX: false,
    playerO: false,
    solo: false,
    bot: false,
    infinite: false,
};

function pressDown(element, key) {
    element.addEventListener('click', () => {
        // X releases O. O releases X, and solo, if pressed.
        if (key == "playerX") {
            if (pressedButtons.playerO)
                releaseButton(o, "playerO");
        }
        else if (key == "playerO") {
            if (pressedButtons.playerX) {
                releaseButton(x, "playerX");
                if (pressedButtons.solo)
                    releaseButton(solo, "solo");
            }
        }
        // Solo is always paired with X, and releases bot and O if pressed. Bot releases solo.
        if (key == "solo") {
            if (pressedButtons.bot)
                releaseButton(bot, "bot");
            if (pressedButtons.playerO)
                releaseButton(o, "playerO");
            pressButton(x, "playerX");
        }
        else if (key == "bot") {
            if (pressedButtons.solo)
                releaseButton(solo, "solo");
        }

        pressButton(element, key);
    });
}

function pressButton(element, key) {
    if (pressedButtons[key]) {
        releaseButton(element, key);
        return;
    }
    element.classList.add('button-pressed');
    pressedButtons[key] = true;
}

function releaseButton(element, key) {
    element.classList.remove('button-pressed');
    pressedButtons[key] = false;
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
