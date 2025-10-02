// moodboard.js
const addImageBtn = document.getElementById("add-image");
const imageInput = document.getElementById("image-input");
const moodboardGrid = document.getElementById("moodboard-grid");

// Recuperar imágenes guardadas
let moodboardImages = JSON.parse(localStorage.getItem("moodboardImages")) || [];

// Renderizar moodboard
function renderMoodboard() {
  moodboardGrid.innerHTML = "";

  moodboardImages.forEach((imgSrc, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("moodboard-item");

    const img = document.createElement("img");
    img.src = imgSrc;

    // Botón de borrar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", async () => {
      const ok = await kawaiiConfirm("¿Eliminar esta fotito? 💔");
      if (ok) {
        moodboardImages.splice(index, 1);
        localStorage.setItem("moodboardImages", JSON.stringify(moodboardImages));
        renderMoodboard();
      }
    });

    wrapper.appendChild(img);
    wrapper.appendChild(deleteBtn);
    moodboardGrid.appendChild(wrapper);
  });
}

// Subir nueva imagen
addImageBtn.addEventListener("click", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      moodboardImages.push(reader.result);
      localStorage.setItem("moodboardImages", JSON.stringify(moodboardImages));
      renderMoodboard();
    };
    reader.readAsDataURL(file);
    imageInput.value = ""; // limpiar input
  } else {
    alert("Please choose an image 🌸");
  }
});

// Render inicial
renderMoodboard();
