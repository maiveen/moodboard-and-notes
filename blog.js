// blog.js (reemplaza tu archivo actual)
// Modal de confirmación kawaii integrado + funcionalidad completa de blog
document.addEventListener("DOMContentLoaded", () => {
  const addEntryBtn = document.getElementById("add-entry");
  const blogContainer = document.getElementById("blog-container");
  const titleInput = document.getElementById("blog-title");
  const textInput = document.getElementById("blog-text");

  if (!addEntryBtn || !blogContainer || !titleInput || !textInput) {
    console.error("Faltan elementos HTML requeridos: revisa IDs (add-entry, blog-container, blog-title, blog-text).");
    return;
  }

  // cargar/guardar
  let blogEntries = JSON.parse(localStorage.getItem("blogEntries")) || [];
  const saveEntries = () => localStorage.setItem("blogEntries", JSON.stringify(blogEntries));

  /****************************************************************
   * kawaiiConfirm(message) -> Promise<boolean>
   * Crea (si es necesario) y muestra un modal kawaii con el mensaje.
   * Resuelve true si el usuario acepta, false si cancela.
   ****************************************************************/
  function kawaiiConfirm(message) {
    return new Promise((resolve) => {
      // Buscar modal ya creado
      let modal = document.getElementById("__kawaii_confirm");
      let textEl, yesBtn, noBtn;

      if (!modal) {
        // Crear estructura del modal con estilos inline para que funcione siempre
        modal = document.createElement("div");
        modal.id = "__kawaii_confirm";
        Object.assign(modal.style, {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.35)",
          zIndex: "9999",
        });

        const content = document.createElement("div");
        Object.assign(content.style, {
          width: "min(420px, 90%)",
          background: "#fff",
          borderRadius: "18px",
          padding: "18px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          transform: "translateY(0)",
          animation: "kawaiiPop 0.18s ease",
          fontFamily: "Nunito, Arial, sans-serif",
        });

        // mensaje
        textEl = document.createElement("p");
        textEl.id = "__kawaii_confirm_text";
        textEl.style.margin = "0 0 12px 0";
        textEl.style.fontSize = "16px";
        textEl.style.color = "#333";

        // acciones
        const actions = document.createElement("div");
        Object.assign(actions.style, {
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        });

        yesBtn = document.createElement("button");
        yesBtn.id = "__kawaii_confirm_yes";
        yesBtn.innerText = "Sí";
        Object.assign(yesBtn.style, {
          background: "#ff6b81",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "10px",
          cursor: "pointer",
          fontFamily: "Fredoka, Arial, sans-serif",
        });

        noBtn = document.createElement("button");
        noBtn.id = "__kawaii_confirm_no";
        noBtn.innerText = "No";
        Object.assign(noBtn.style, {
          background: "#97a085",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "10px",
          cursor: "pointer",
          fontFamily: "Fredoka, Arial, sans-serif",
        });

        actions.appendChild(yesBtn);
        actions.appendChild(noBtn);

        // Añadir un pequeño iconito kawaii encima (opcional)
        const icon = document.createElement("div");
        icon.innerText = "💔";
        Object.assign(icon.style, {
          fontSize: "28px",
          marginBottom: "8px",
        });

        content.appendChild(icon);
        content.appendChild(textEl);
        content.appendChild(actions);

        // añadir keyframes simples (inserto style temporal)
        const styleTag = document.createElement("style");
        styleTag.textContent = `@keyframes kawaiiPop { from { transform: scale(.92); opacity: 0 } to { transform: scale(1); opacity: 1 } }`;
        document.head.appendChild(styleTag);

        modal.appendChild(content);
        document.body.appendChild(modal);
      } else {
        textEl = document.getElementById("__kawaii_confirm_text");
        yesBtn = document.getElementById("__kawaii_confirm_yes");
        noBtn = document.getElementById("__kawaii_confirm_no");
      }

      // mostrar
      textEl.textContent = message;
      modal.style.display = "flex";

      // handlers
      const cleanup = () => {
        modal.style.display = "none";
        yesBtn.removeEventListener("click", onYes);
        noBtn.removeEventListener("click", onNo);
        // también cerrar si hacen click fuera del content
        modal.removeEventListener("click", onOutside);
      };

      const onYes = () => {
        cleanup();
        resolve(true);
      };
      const onNo = () => {
        cleanup();
        resolve(false);
      };

      const onOutside = (ev) => {
        // si hacen click fuera del content, cerramos como 'No'
        if (ev.target === modal) {
          cleanup();
          resolve(false);
        }
      };

      yesBtn.addEventListener("click", onYes);
      noBtn.addEventListener("click", onNo);
      modal.addEventListener("click", onOutside);
    });
  }

  // render
  function renderEntries() {
    blogContainer.innerHTML = "";

    blogEntries.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.style.position = "relative"; // necesario para sticker pos absolute

      // 🎨 Colores pastel kawaii (elige 1 aleatorio)
      const palette = ["#FFE5EC","#E2F0CB","#B5EAD7","#C7CEEA","#FFF1C1"];
      const bgColor = palette[Math.floor(Math.random() * palette.length)];
      card.style.backgroundColor = bgColor;

      // 🌸 Sticker kawaii fijo (esquina superior izquierda)
      const sticker = document.createElement("span");
      sticker.className = "note-sticker";
      const stickers = ["🌸","🌟","🌼","🍓","💌"];
      sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];
      Object.assign(sticker.style, {
        position: "absolute",
        top: "8px",
        left: "8px",
        fontSize: "18px",
        pointerEvents: "none"
      });
      card.appendChild(sticker);

      // boton borrar (usa kawaiiConfirm en vez de confirm())
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn blog-delete";
      deleteBtn.type = "button";
      deleteBtn.innerText = "❌";
      Object.assign(deleteBtn.style, {
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "28px",
        height: "28px",
        cursor: "pointer"
      });

      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const ok = await kawaiiConfirm("¿Eliminar esta notita? 💔");
        if (!ok) return;
        blogEntries.splice(index, 1);
        saveEntries();
        renderEntries();
      });

      // título (click = toggle preview/full, dblclick = editar título)
      const titleEl = document.createElement("h3");
      titleEl.className = "blog-title";
      titleEl.textContent = entry.title || "Untitled";
      titleEl.style.cursor = "pointer";
      Object.assign(titleEl.style, {
        margin: "12px 12px 8px 12px",
        paddingRight: "36px"
      });

      // texto (preview/full)
      const textEl = document.createElement("p");
      textEl.className = "blog-text";
      const fullText = entry.text || "";
      const previewText = fullText.length > 100 ? fullText.substring(0, 100) + "..." : fullText;
      textEl.textContent = previewText;
      textEl.dataset.expanded = "false";
      Object.assign(textEl.style, {
        margin: "0 12px 12px 12px",
        whiteSpace: "pre-wrap"
      });

      // Toggle expand/contract al hacer click en título
      titleEl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (textEl.dataset.expanded === "true") {
          textEl.textContent = previewText;
          textEl.dataset.expanded = "false";
        } else {
          textEl.textContent = fullText;
          textEl.dataset.expanded = "true";
        }
      });

      // Doble click en texto para editar in-place
      textEl.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        const textarea = document.createElement("textarea");
        textarea.className = "blog-edit-textarea";
        textarea.value = fullText;
        textarea.style.width = "calc(100% - 24px)";
        textarea.style.minHeight = "80px";
        textarea.style.margin = "0 12px 12px 12px";

        card.replaceChild(textarea, textEl);
        textarea.focus();

        const saveFromTextarea = () => {
          const newText = textarea.value.trim();
          if (newText.length === 0) {
            // si queda vacío preguntamos con kawaiiConfirm
            kawaiiConfirm("El texto quedó vacío. ¿Eliminar la entrada? 💔").then((shouldDelete) => {
              if (shouldDelete) {
                blogEntries.splice(index, 1);
                saveEntries();
                renderEntries();
              } else {
                renderEntries(); // restaurar original
              }
            });
            return;
          }
          blogEntries[index].text = newText;
          saveEntries();
          renderEntries();
        };

        textarea.addEventListener("blur", saveFromTextarea, { once: true });
        textarea.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            saveFromTextarea();
          }
        });
      });

      // Doble click en título para editar título in-place
      titleEl.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "blog-edit-title";
        input.value = entry.title || "";
        input.style.width = "calc(100% - 24px)";
        input.style.margin = "0 12px 8px 12px";
        card.replaceChild(input, titleEl);
        input.focus();

        const saveTitle = () => {
          const newTitle = input.value.trim() || "Untitled";
          blogEntries[index].title = newTitle;
          saveEntries();
          renderEntries();
        };

        input.addEventListener("blur", saveTitle, { once: true });
        input.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            saveTitle();
          }
        });
      });

      // armar tarjeta
      card.appendChild(deleteBtn);
      card.appendChild(titleEl);
      card.appendChild(textEl);

      // insertar al inicio
      blogContainer.prepend(card);
    });
  }

  // render inicial
  renderEntries();

  // añadir nueva entrada
  addEntryBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    if (!title || !text) {
      alert("Please write a title and a message 💌");
      return;
    }
    blogEntries.push({ title, text, createdAt: Date.now() });
    saveEntries();
    renderEntries();
    titleInput.value = "";
    textInput.value = "";
  });
});
