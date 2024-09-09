// script.js

document.addEventListener("DOMContentLoaded", () => {
	const cells = document.querySelectorAll(".cell");
	const restartButton = document.getElementById("restartButton");
	const statsTable = document.querySelector("table");
	const backButton = document.getElementById("backButton");
	let currentPlayer = "X";
	let gameState = ["", "", "", "", "", "", "", "", ""];
	let gameStats = {
		playerXWins: 0,
		playerOWins: 0,
		draws: 0,
	};

	// Возможные победные комбинации
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],		 // горизонтальные линии
		[0, 3, 6], [1, 4, 7], [2, 5, 8], 	// вертикальные линии
		[0, 4, 8], [2, 4, 6] 				  // диагональные линии
	];

	function handleCellClick(event) {
		const clickedCell = event.target;
		const clickedCellIndex = clickedCell.getAttribute("data-index");

		if (gameState[clickedCellIndex] !== "" || checkWinner() || checkDraw()) {
			return;
		}

		gameState[clickedCellIndex] = currentPlayer;
		clickedCell.textContent = currentPlayer;

		if (checkWinner()) {
			gameStats[currentPlayer === "X" ? "playerXWins" : "playerOWins"]++;
			updateStats();
			alert(`Поздравляем, игрок ${currentPlayer} победил!`);
			return;
		}

		if (checkDraw()) {
			gameStats.draws++;
			updateStats();
			alert("Ничья!");
			return;
		}

		currentPlayer = currentPlayer === "X" ? "O" : "X";
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
		gameState = ["", "", "", "", "", "", "", "", ""];
		cells.forEach(cell => (cell.textContent = ""));
		currentPlayer = "X";
	}

	function updateStats() {
		statsTable.rows[1].cells[0].textContent = gameStats.playerXWins;
		statsTable.rows[1].cells[1].textContent = gameStats.playerOWins;
		statsTable.rows[1].cells[2].textContent = gameStats.draws;
	}

	// Привязка событий
	cells.forEach(cell => cell.addEventListener("click", handleCellClick));
	restartButton.addEventListener("click", restartGame);
	backButton.addEventListener("click", () => {
		window.location.href = "/index.html";
	})

	// Обновление статистики
	updateStats();
});

