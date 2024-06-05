<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Grid Size - Tic Tac Toe</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div id="initial-page">
        <h1>TIC TAC TOE</h1>
        <div class="box">
            <form id="grid-form">
                <label for="grid-size">Select Grid Size:</label>
                <select id="grid-size" name="grid-size">
                    <option value="3">3 x 3</option>
                    <option value="4">4 x 4</option>
                    <option value="5">5 x 5</option>
                    <option value="6">6 x 6</option>
                    <option value="7">7 x 7</option>
                </select>
                <button type="submit" id="start-button">Start Game</button>
            </form>
        </div>
    </div>
    <script src="select.js" defer></script>
</body>
</html>
