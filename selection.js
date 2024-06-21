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
            if (!pressedButtons.playerX)
                pressButton(x, "playerX");
        }
        if (key == "bot") {
            if (pressedButtons.solo)
                releaseButton(solo, "solo");
        }
        pressButton(element, key);
        
    });
}

function pressButton(element, key) {
    if (pressedButtons[key]) {
        releaseButton(element, key);
    } else {
        element.classList.add('button-pressed');
        pressedButtons[key] = true;
    }
    checkPlayButtonState();
    
}

function releaseButton(element, key) {
    element.classList.remove('button-pressed');
    pressedButtons[key] = false;
    checkPlayButtonState();
}

function checkPlayButtonState() {
    const pressedCount = Object.values(pressedButtons).filter(value => value).length;
    play.disabled = pressedCount < 2 || (pressedButtons.infinite && pressedCount < 3);
    showState();
}

pressDown(x, "playerX");
pressDown(o, "playerO");
pressDown(solo, "solo");
pressDown(bot, "bot");
pressDown(inf, "infinite");


function showState() {
    const buttonContainer = document.getElementById("info");
    buttonContainer.innerHTML = "";
    for (let key in pressedButtons) {
        if (pressedButtons.hasOwnProperty(key) && pressedButtons[key]) {
            const paragraph = document.createElement("p");
            switch (key) {
                case "playerX": paragraph.textContent = "O primeiro jogador é o X."; break;
                case "playerO": paragraph.textContent = "O primeiro jogador é o O."; break;
                case "solo": paragraph.textContent = "Os dois jogadores jogam localmente um contra o outro."; break;
                case "bot": paragraph.textContent = "O adversário é um robô."; break;
                case "infinite": paragraph.textContent = "Versão do jogo infinito."; break;
            }
            paragraph.classList.add("show");
            buttonContainer.appendChild(paragraph); 
        }
    }
}

play.addEventListener("click", () => {
    localStorage.setItem("pressedButtons", JSON.stringify(pressedButtons));
    window.location.href = "actualGame/game.html";
});

checkPlayButtonState();
