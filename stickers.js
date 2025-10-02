const stickersContainer = document.getElementById("stickers-container");

// Array con imágenes de stickers (pueden ser todas estrellitas o mezcladas)
const stickerImages = [
  "assets/sticker.png",
  "assets/sticker.png",
  "assets/sticker.png",
  "assets/heart.png",
  "assets/flower.png"
];

function createSticker() {
  const img = document.createElement("img");
  img.src = stickerImages[Math.floor(Math.random() * stickerImages.length)];
  img.classList.add("sticker");

  // Posición aleatoria en la pantalla
  img.style.left = Math.random() * 100 + "vw";
  img.style.top = "-50px";

  // Tamaño aleatorio
  const size = 20 + Math.random() * 40;
  img.style.width = size + "px";

  // Velocidad diferente para cada sticker
  const duration = 6 + Math.random() * 6;
  img.style.animationDuration = duration + "s";

  stickersContainer.appendChild(img);

  // Eliminar sticker cuando termine animación
  setTimeout(() => {
    img.remove();
  }, duration * 1000);
}

// Generar un nuevo sticker cada 700ms
setInterval(createSticker, 300);
