let board = [];
let n;
let delay = 400;

function start() {
    n = parseInt(document.getElementById("nValue").value);
    createBoard();
    board = Array(n).fill(-1);
    solve(0);
}
function updateBoard() {
    n = parseInt(document.getElementById("nValue").value);
    createBoard();
}

function createBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    boardDiv.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    boardDiv.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = document.createElement("div");

            cell.className =
                "square " + ((row + col) % 2 ? "dark" : "light");

            boardDiv.appendChild(cell);
        }
    }
}

function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
        if (
            board[i] === col ||
            board[i] - i === col - row ||
            board[i] + i === col + row
        ) return false;
    }
    return true;
}

async function solve(row) {
    if (row === n) return true;

    for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
            board[row] = col;
            draw();
            await sleep(delay);

            if (await solve(row + 1)) return true;

            board[row] = -1;
            draw();
            await sleep(delay);
        }
    }
    return false;
}

function draw() {
    const cells = document.querySelectorAll(".square");
    cells.forEach(cell => cell.innerHTML = "");

    for (let r = 0; r < n; r++) {
        if (board[r] !== -1) {
            const index = r * n + board[r];
            cells[index].innerHTML =
            `<img class="queen" src="https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg">`;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function () {
    n = parseInt(document.getElementById("nValue").value);
    createBoard();
};
