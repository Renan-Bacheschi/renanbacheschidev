// Seleciona o botão de tema e o body
const themeButton = document.querySelector(".theme-dark");
const body = document.body;

// Função para alternar entre os temas
themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    
    if (body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️"; 
    } else {
        themeButton.textContent = "🌙"; 
    }
});
