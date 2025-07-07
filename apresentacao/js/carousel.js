const imagens_carousel = [
    "https://via.placeholder.com/400x200?text=Projeto+1",
  "https://via.placeholder.com/400x200?text=Projeto+2",
  "https://via.placeholder.com/400x200?text=Projeto+3"
];

let indice = 0;

const img = document.getElementById("carousel-img");

function apresentarImg() {
    img.src =imagens_carousel[indice];
}

function avancar() {
    indice = (indice + 1) % imagens_carousel.length;
    apresentarImg();
}

function voltar() {
    indice = (indice - 1 + imagens_carousel.length) % imagens_carousel.length;
    apresentarImg();
}

document.addEventListener("DOMContentLoaded", apresentarImg);