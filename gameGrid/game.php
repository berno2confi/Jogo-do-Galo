<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div id="gameContainer">
        <h1>Jogo do Galo</h1>
        <div id="cellContainer">
            <div cellIndex="0" class="cell"></div>
            <div cellIndex="1" class="cell"></div>
            <div cellIndex="2" class="cell"></div>
            <div cellIndex="3" class="cell"></div>
            <div cellIndex="4" class="cell"></div>
            <div cellIndex="5" class="cell"></div>
            <div cellIndex="6" class="cell"></div>
            <div cellIndex="7" class="cell"></div>
            <div cellIndex="8" class="cell"></div>
        </div>
        <h2 id="statusText"></h2>
        <button id="restartBtn">Recomeçar</button>
    </div>
    <script src="game.js"></script>
</body>

</html>