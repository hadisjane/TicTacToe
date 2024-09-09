const themeToggleButton = document.getElementById("themeToggle");
const icon = themeToggleButton.querySelector("img");

themeToggleButton.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");
	icon.src = `icon-${document.body.classList.contains("dark-theme") ? "light" : "dark"}.svg`;
});
