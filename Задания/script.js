let rows = prompt('Сколько строк?', 0);
let columns = prompt('Сколько столбцов?', 0);

const moves = [{ player: "", symbol: "x" }, { player: "", symbol: "o" }];
moves[0].player = prompt('Игрок 1', "Игрок 1");
moves[1].player = prompt('Игрок 2', "Игрок 2");

let gameState = [];
let gameStep = 0;

const panel = document.getElementById("panel");
const checkWinner = (x, y) => {
    const hasWinner =
    (gameState[y][x] === gameState[y][x + 1] && gameState[y][x] === gameState[y][x + 2]) ||
    (gameState[y][x] === gameState[y][x - 1] && gameState[y][x] === gameState[y][x - 2]) ||
    (gameState[y][x] === gameState[y][x + 1] && gameState[y][x] === gameState[y][x - 1]) ||

    (gameState[y][x] === gameState[y + 1]?.[x] && gameState[y][x] === gameState[y + 2]?.[x]) ||
    (gameState[y][x] === gameState[y - 1]?.[x] && gameState[y][x] === gameState[y - 2]?.[x]) ||
    (gameState[y][x] === gameState[y + 1]?.[x] && gameState[y][x] === gameState[y - 1]?.[x]) ||

    (gameState[y][x] === gameState[y + 1]?.[x + 1] && gameState[y][x] === gameState[y - 1]?.[x - 1]) ||
    (gameState[y][x] === gameState[y + 1]?.[x + 1] && gameState[y][x] === gameState[y + 2]?.[x + 2]) ||
    (gameState[y][x] === gameState[y - 2]?.[x - 2] && gameState[y][x] === gameState[y - 1]?.[x - 1]) ||

    (gameState[y][x] === gameState[y - 1]?.[x + 1] && gameState[y][x] === gameState[y - 2]?.[x + 2]) ||
    (gameState[y][x] === gameState[y - 1]?.[x + 1] && gameState[y][x] === gameState[y + 1]?.[x - 1]) ||
    (gameState[y][x] === gameState[y + 1]?.[x - 1] && gameState[y][x] === gameState[y + 2]?.[x - 2]);

    return hasWinner ? moves[gameStep % 2] : null;
};

if (columns >= 2 && rows >= 2) {
    for (let y = 0; y < rows; y++) {
        const row = document.createElement('tr');
        const rows = [];

        for (let x = 0; x < columns; x++) {
            const column = document.createElement('td')
            column.className = "strokeTd";

            column.addEventListener("click", () => {
                if (gameState[y][x] != null) {
                    return
                }
                const currentPlayer = moves[gameStep % 2];

                gameState[y][x] = currentPlayer;
                column.textContent = currentPlayer.symbol;
                const winner = checkWinner(x, y);
                if (winner !== null) {
                    console.log(winner);
                    alert('Игрок ' + winner.player + ' победил!');
                    window.location.reload();
                }
                gameStep++;
            });
            row.append(column);
            rows.push(null);
        }
        gameState.push(rows);
        panel.append(row);
    }
} else { window.location.reload(); }