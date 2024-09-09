const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");

setTimeout(() => {
  loadingScreen.style.opacity = "0"; // Плавное исчезновение экрана загрузки
  setTimeout(() => {
	 loadingScreen.style.display = "none"; // Полностью скрыть экран загрузки
	 mainContent.style.display = "block"; // Показать основной контент страницы
  }, 300); // Время совпадает с transition в CSS (0.3s)
}, 1000); // Даем небольшую задержку для отображения спиннера, можно изменить по необходимости
