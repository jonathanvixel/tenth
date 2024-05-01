document.addEventListener("DOMContentLoaded", function() {
    const playGameLink = document.getElementById("play-game");

    playGameLink.addEventListener("click", function(event) {
        event.preventDefault();
        resetBoard(); // Reset the board when "Play Game" is clicked
        const gameSection = document.getElementById("game");
        gameSection.scrollIntoView({ behavior: 'smooth' });
    });

    const grid = document.getElementById("tic-tac-toe");
    const cells = [];
    const gridSize = 3; // Size of the grid (3x3)
    let currentPlayer = "X";
    let moves = 0; // Track number of moves
    let gameWon = false;

    // Create cells
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", cellClick);
        cells.push(cell);
        grid.appendChild(cell);
    }

    // Handle cell click
    function cellClick() {
        if (!gameWon && !this.textContent) {
            this.textContent = currentPlayer;
            moves++;
            if (checkWin()) {
                alert(currentPlayer + " wins!");
                gameWon = true;
            } else if (checkDraw()) {
                alert("It's a draw!");
                gameWon = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(makeAIMove, 500); // Delay for visual clarity
                }
            }
        }
    }

    // AI makes a move
    function makeAIMove() {
        const emptyCells = cells.filter(cell => !cell.textContent);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].click();
    }

    // Check for a win
    function checkWin() {
        if (moves < 5) {
            return false; // No win before 5 moves
        }
        // Check rows, columns, and diagonals for win
        for (let i = 0; i < gridSize; i++) {
            if (checkLine(i, 0, 0, 1) || // Check rows
                checkLine(0, i, 1, 0)) { // Check columns
                return true;
            }
        }

        // Check main diagonal for win
        if (checkLine(0, 0, 1, 1)) {
            return true;
        }

        // Check anti-diagonal for win
        if (checkLine(0, gridSize - 1, 1, -1)) {
            return true;
        }

        return false;
    }

    // Check for a draw
    function checkDraw() {
        return moves === gridSize * gridSize; // Draw when all cells are filled
    }

    // Check for a win in a line
    function checkLine(row, col, rowIncrement, colIncrement) {
        const player = cells[row * gridSize + col].textContent;
        for (let i = 0; i < gridSize; i++) {
            const cell = cells[(row + i * rowIncrement) * gridSize + (col + i * colIncrement)];
            if (cell.textContent !== player) {
                return false;
            }
        }
        return true;
    }

    // Function to reset the board
    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        moves = 0;
        gameWon = false;
    }
});
