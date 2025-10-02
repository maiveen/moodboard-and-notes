// utils.js
function kawaiiConfirm(message) {
  return new Promise((resolve) => {
    // Buscar modal ya creado
    let modal = document.getElementById("__kawaii_confirm");
    let textEl, yesBtn, noBtn;

    if (!modal) {
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
        fontFamily: "Nunito, Arial, sans-serif",
        animation: "kawaiiPop 0.18s ease"
      });

      // mensaje
      textEl = document.createElement("p");
      textEl.id = "__kawaii_confirm_text";
      textEl.style.margin = "0 0 12px 0";

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
      });

      actions.appendChild(yesBtn);
      actions.appendChild(noBtn);

      const icon = document.createElement("div");
      icon.innerText = "💔";
      icon.style.fontSize = "28px";
      icon.style.marginBottom = "8px";

      content.appendChild(icon);
      content.appendChild(textEl);
      content.appendChild(actions);

      const styleTag = document.createElement("style");
      styleTag.textContent = `
        @keyframes kawaiiPop { 
          from { transform: scale(.92); opacity: 0 } 
          to { transform: scale(1); opacity: 1 } 
        }`;
      document.head.appendChild(styleTag);

      modal.appendChild(content);
      document.body.appendChild(modal);
    } else {
      textEl = document.getElementById("__kawaii_confirm_text");
      yesBtn = document.getElementById("__kawaii_confirm_yes");
      noBtn = document.getElementById("__kawaii_confirm_no");
    }

    textEl.textContent = message;
    modal.style.display = "flex";

    const cleanup = () => {
      modal.style.display = "none";
      yesBtn.removeEventListener("click", onYes);
      noBtn.removeEventListener("click", onNo);
      modal.removeEventListener("click", onOutside);
    };

    const onYes = () => { cleanup(); resolve(true); };
    const onNo = () => { cleanup(); resolve(false); };
    const onOutside = (ev) => {
      if (ev.target === modal) { cleanup(); resolve(false); }
    };

    yesBtn.addEventListener("click", onYes);
    noBtn.addEventListener("click", onNo);
    modal.addEventListener("click", onOutside);
  });
}
