const submit = document.querySelector("#submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = [];
let turn = 0;
let boardState = Array(9).fill(null);

const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

submit.addEventListener("click", startGame);

cells.forEach(cell => {
    cell.addEventListener("click", handleMove);
});

function startGame() {
    const p1 = document.querySelector("#player-1").value.trim();
    const p2 = document.querySelector("#player-2").value.trim();

    if (!p1 || !p2) {
        alert("Please enter both player names");
        return;
    }

    players = [p1, p2];
    turn = 0;
    boardState = Array(9).fill(null);

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("disabled", "winner");
    });

    document.querySelector(".userDetails").style.display = "none";
    document.querySelector(".board").style.display = "grid";
    message.style.display = "block";

    message.innerText = `${players[turn]} you are up!`;
}

function handleMove(e) {
    const index = e.target.id - 1;

    if (boardState[index] !== null) return;

    const mark = turn === 0 ? "X" : "O";
    e.target.innerText = mark;
    boardState[index] = mark;
    e.target.classList.add("disabled");

    const winningLine = wins.find(line =>
        line.every(i => boardState[i] === mark)
    );

    if (winningLine) {
        winningLine.forEach(i => {
            document.getElementById(i + 1).classList.add("winner");
        });
        message.innerText = `${players[turn]} congratulations you won!`;
        cells.forEach(cell => cell.classList.add("disabled"));
        return;
    }

    if (!boardState.includes(null)) {
        message.innerText = "It's a draw!";
        return;
    }

    turn = 1 - turn;
    message.innerText = `${players[turn]} you are up!`;
}
