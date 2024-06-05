// For game

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        gridSize: parseInt(params.get('grid-size'), 10) || 3
    };
}

function drawGrid(size) {
    const gameContainer = document.getElementById('game');
    gameContainer.style.display = 'grid';
    gameContainer.style.gridTemplateColumns = 'repeat(${size}, 1fr)';
    gameContainer.style.gridTemplateRows = 'repeat(${size}, 1fr)';
    gameContainer.style.gap = '5px';

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameContainer.appendChild(cell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const { gridSize } = getQueryParams();
    drawGrid(gridSize);
})