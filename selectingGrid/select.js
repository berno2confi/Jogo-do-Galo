// For select

document.getElementById("grid-form").addEventListener('submit', function(event) {
    event.preventDefault();
    const gridSize = document.getElementById('grid-size').value;
    window.location.href = 'game.php?grid-size=${gridSize}';
})

