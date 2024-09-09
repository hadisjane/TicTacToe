document.addEventListener("DOMContentLoaded", () => {
	const singleplayerButton = document.getElementById("singleplayerButton");
	const multiplayerButton = document.getElementById("multiplayerButton");

	singleplayerButton.addEventListener("click", () => {
		window.location.href = "/pages/singleplayer/singleplayer.html";
	});
	multiplayerButton.addEventListener("click", () => {
		window.location.href = "/pages/multiplayer/multiplayer.html";
	});
});