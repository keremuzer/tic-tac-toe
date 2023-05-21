let gameStatus = document.querySelector("#gameStatus");

const gameboard = (function () {
  const board = [
    "", "", "",
    "", "", "",
    "", "", ""];
  function checkWinner() {
    for (let i = 0; i <= 6; i += 3) {
      if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
        return board[i];
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
        return board[i];
      }
    }
    if (board[0] === board[4] && board[4] === board[8]) {
      return board[0];
    }
    if (board[2] === board[4] && board[4] === board[6]) {
      return board[2];
    }
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        return "";
      }
    }
    return "Tie";
  }
  return {board , checkWinner};
})();
  
const game = (function () {
  const Player = (mark) => {
    return { mark };
  };
  const player1 = Player("X");
  const player2 = Player("O");
  let turn = 1;
  const cells = document.querySelectorAll(".cell");
  const displayBoard = function () {
    gameboard.board.forEach((cell, i) => {
      cells[i].textContent = cell;
    });
  };
  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      if (gameboard.board[i] === "" && game.turn === 1) {
        gameboard.board[i] = player1.mark;
        console.log(gameboard.checkWinner());
        displayBoard();
        if (gameboard.checkWinner() === "X") {
          gameStatus.textContent = "Player X wins!";
          return;
        } else if (gameboard.checkWinner() === "Tie") {
          gameStatus.textContent = "It's a tie!";
          return;
        }
        game.turn = 2;
        gameStatus.textContent = "Player O's turn";
      } else if (gameboard.board[i] === "" && game.turn === 2) {
        gameboard.board[i] = player2.mark;
        console.log(gameboard.checkWinner());
        displayBoard();
        if (gameboard.checkWinner() === "O") {
          gameStatus.textContent = "Player O wins!";
          return;
        } else if (gameboard.checkWinner() === "Tie") {
          gameStatus.textContent = "It's a tie!";
          return;
        }
        game.turn = 1;
        gameStatus.textContent = "Player X's turn";
      }
    });
  });
  return { player1, player2, turn, displayBoard};
})();

game.displayBoard();