// Seleciona o botão de tema e o body
const themeButton = document.querySelector(".theme-dark");
const body = document.body;

// Função para alternar entre os temas
themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Altera o ícone do botão 🌙/☀️
    if (body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️"; // Modo claro
    } else {
        themeButton.textContent = "🌙"; // Modo escuro
    }
});
