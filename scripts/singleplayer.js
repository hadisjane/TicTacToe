document.addEventListener("DOMContentLoaded", () => {
	const cells = document.querySelectorAll(".cell");
	const restartButton = document.getElementById("restartButton");
	const statsTable = document.querySelector("table");
	const backButton = document.getElementById("backButton");
	let currentPlayer = "X";
	let gameState = Array(9).fill("");
	let gameStats = {
		playerXWins: 0,
		computerWins: 0,
		draws: 0,
	};

	// Возможные победные комбинации
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],       // горизонтальные линии
		[0, 3, 6], [1, 4, 7], [2, 5, 8],       // вертикальные линии
		[0, 4, 8], [2, 4, 6]                   // диагональные линии
	];

	function handleCellClick(event) {
		const clickedCell = event.target;
		const clickedCellIndex = +clickedCell.getAttribute("data-index");

		if (gameState[clickedCellIndex] !== "" || checkWinner() || checkDraw()) {
			return;
		}

		gameState[clickedCellIndex] = currentPlayer;
		clickedCell.textContent = currentPlayer;

		if (checkWinner()) {
			gameStats[currentPlayer === "X" ? "playerXWins" : "computerWins"]++;
			updateStats();
			alert(`Поздравляем, ${currentPlayer === "X" ? "вы" : "компьютер"} победил!`);
			return;
		}

		if (checkDraw()) {
			gameStats.draws++;
			updateStats();
			alert("Ничья!");
			return;
		}

		currentPlayer = currentPlayer === "X" ? "O" : "X";
		computerMove();
	}

	function checkWinner() {
		return winningCombinations.some(combination => {
			return combination.every(index => gameState[index] === currentPlayer);
		});
	}

	function checkDraw() {
		return gameState.every(cell => cell !== "");
	}

	function restartGame() {
		gameState = Array(9).fill("");
		cells.forEach(cell => (cell.textContent = ""));
		currentPlayer = "X";
	}

	function updateStats() {
		statsTable.rows[1].cells[0].textContent = gameStats.playerXWins;
		statsTable.rows[1].cells[1].textContent = gameStats.computerWins;
		statsTable.rows[1].cells[2].textContent = gameStats.draws;
	}

	function computerMove() {
		setTimeout(() => {
			const winningMove = findWinningMove("O");
			if (winningMove !== null) {
				gameState[winningMove] = "O";
				cells[winningMove].textContent = "O";
			} else {
				const immediateBlock = findImmediateBlock();
				if (immediateBlock !== null) {
					gameState[immediateBlock] = "O";
					cells[immediateBlock].textContent = "O";
				} else {
					const bestMove = findBestMove();
					if (bestMove !== null) {
						gameState[bestMove] = "O";
						cells[bestMove].textContent = "O";
					}
				}
			}

			if (checkWinner()) {
				gameStats.computerWins++;
				updateStats();
				alert("Компьютер победил!");
				return;
			}

			if (checkDraw()) {
				gameStats.draws++;
				updateStats();
				alert("Ничья!");
				return;
			}

			currentPlayer = "X";
		}, 500);
	}

	function findWinningMove(player) {
		for (let i = 0; i < winningCombinations.length; i++) {
			const [a, b, c] = winningCombinations[i];
			if (gameState[a] === player && gameState[b] === player && gameState[c] === "") return c;
			if (gameState[a] === player && gameState[c] === player && gameState[b] === "") return b;
			if (gameState[b] === player && gameState[c] === player && gameState[a] === "") return a;
		}
		return null;
	}

	function findImmediateBlock() {
		return findWinningMove("X"); // Используем ту же логику, чтобы найти возможный выигрышный ход игрока
	}

	function findBestMove() {
		let bestScore = -Infinity;
		let move = null;

		for (let i = 0; i < gameState.length; i++) {
			if (gameState[i] === "") {
				gameState[i] = "O";
				let score = minimax(gameState, 0, false);
				gameState[i] = "";
				if (score > bestScore) {
					bestScore = score;
					move = i;
				}
			}
		}

		return move;
	}

	function minimax(board, depth, isMaximizing) {
		if (checkWinnerForMinimax(board, "O")) {
			return 10 - depth; // Более высокое значение для победного хода бота
		} else if (checkWinnerForMinimax(board, "X")) {
			return depth - 10; // Низкое значение, если игрок выигрывает
		} else if (checkDrawForMinimax(board)) {
			return 0; // Ничья
		}

		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < board.length; i++) {
				if (board[i] === "") {
					board[i] = "O"; // Бот делает ход
					let score = minimax(board, depth + 1, false);
					board[i] = "";
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < board.length; i++) {
				if (board[i] === "") {
					board[i] = "X"; // Игрок делает ход
					let score = minimax(board, depth + 1, true);
					board[i] = "";
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	}

	function checkWinnerForMinimax(board, player) {
		return winningCombinations.some(combination => {
			return combination.every(index => board[index] === player);
		});
	}

	function checkDrawForMinimax(board) {
		return board.every(cell => cell !== "");
	}

	// Привязка событий
	cells.forEach(cell => cell.addEventListener("click", handleCellClick));
	restartButton.addEventListener("click", restartGame);
	backButton.addEventListener("click", () => {
		window.location.href = "/index.html";
	});

	// Обновление статистики
	updateStats();
});