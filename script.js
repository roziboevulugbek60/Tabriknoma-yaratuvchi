
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

const typeInput = document.getElementById("type");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const customColor = document.getElementById("customColor");
const styleSelect = document.getElementById("styleSelect");

let accent = "#8b5cf6";

const templates = {
  birthday: {
    title: "TUG‘ILGAN KUNINGIZ",
    subtitle: "Muborak bo‘lsin!",
    message: "Sizga mustahkam sog‘liq, cheksiz baxt,\nquvonch va omad tilaymiz!",
    emoji: "🎂"
  },
  mother: {
    title: "AZIZ ONAJONIM",
    subtitle: "Sizga mehrimiz cheksiz!",
    message: "Doimo sog‘-salomat bo‘ling.\nMehringiz va duolaringiz uchun rahmat!",
    emoji: "💐"
  },
  wedding: {
    title: "BAХTLI OILA",
    subtitle: "To‘yingiz muborak!",
    message: "Bir-biringizga mehribon bo‘ling.\nOilaviy baxt va totuvlik tilaymiz!",
    emoji: "💍"
  },
  holiday: {
    title: "BAYRAMINGIZ",
    subtitle: "Muborak bo‘lsin!",
    message: "Hayotingiz quvonch va baxtga,\nqalbingiz ezgu tilaklarga to‘lsin!",
    emoji: "🎉"
  }
};

function roundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawDecoration(style) {
  const symbols = {
    stars: ["✦", "✧", "★", "✨"],
    hearts: ["♥", "♡", "💖", "💕"],
    flowers: ["✿", "❀", "🌸", "❁"],
    confetti: ["✦", "●", "◆", "🎊"]
  };

  const items = symbols[style] || symbols.stars;

  for (let i = 0; i < 35; i++) {
    const x = 65 + Math.random() * 870;
    const y = 45 + Math.random() * 610;

    ctx.globalAlpha = 0.2 + Math.random() * 0.55;
    ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#ffe6a7";
    ctx.font = `${16 + Math.random() * 20}px Arial`;
    ctx.fillText(items[i % items.length], x, y);
  }

  ctx.globalAlpha = 1;
}

function drawCard() {
  const type = typeInput.value;
  const data = templates[type];

  const name = nameInput.value.trim() || "Aziz inson!";
  const message = messageInput.value.trim() || data.message;
  const decoration = styleSelect.value;

  const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(1, "#17132f");

  ctx.clearRect(0, 0, 1000, 700);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1000, 700);

  // Ichki bezak ramkasi
  ctx.strokeStyle = "#ffffffaa";
  ctx.lineWidth = 4;
  roundedRect(25, 25, 950, 650, 28);
  ctx.stroke();

  ctx.strokeStyle = "#ffffff55";
  ctx.lineWidth = 2;
  roundedRect(42, 42, 916, 616, 22);
  ctx.stroke();

  drawDecoration(decoration);

  // Markaziy karta
  ctx.save();
  ctx.shadowColor = "#00000055";
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 12;

  ctx.fillStyle = "rgba(255,255,255,0.13)";
  roundedRect(115, 90, 770, 520, 35);
  ctx.fill();
  ctx.restore();

  // Emoji
  ctx.textAlign = "center";
  ctx.font = "90px Arial";
  ctx.fillText(data.emoji, 500, 210);

  // Sarlavha
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px Arial";
  ctx.fillText(data.title, 500, 285, 700);

  ctx.fillStyle = "#ffe9b5";
  ctx.font = "bold 34px Arial";
  ctx.fillText(data.subtitle, 500, 345, 700);

  // Ism
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 37px Arial";
  ctx.fillText(name, 500, 420, 700);

  // Tabrik matni
  ctx.fillStyle = "#ffffff";
  ctx.font = "25px Arial";

  const lines = message.split("\n");
  const maxLines = 4;
  const shownLines = lines.slice(0, maxLines);

  shownLines.forEach((line, index) => {
    ctx.fillText(line, 500, 475 + index * 38, 700);
  });

  // Pastki bezak
  ctx.fillStyle = "#ffe9b5";
  ctx.font = "26px Arial";
  ctx.fillText("♥  ENG EZGU TILAKLAR BILAN  ♥", 500, 570);

  ctx.fillStyle = "#ffffffaa";
  ctx.font = "17px Arial";
  ctx.fillText("TABRIKNOMA YARATUVCHI", 500, 640);
}

function updateColor(color) {
  accent = color;
  document.documentElement.style.setProperty("--accent", color);
  drawCard();
}

document.querySelectorAll(".color-choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".color-choice").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    customColor.value = button.dataset.color;
    updateColor(button.dataset.color);
  });
});

customColor.addEventListener("input", () => {
  document.querySelectorAll(".color-choice").forEach(item => {
    item.classList.remove("active");
  });

  updateColor(customColor.value);
});

document.getElementById("updateBtn").addEventListener("click", drawCard);

[typeInput, nameInput, messageInput, styleSelect].forEach(element => {
  element.addEventListener("input", drawCard);
  element.addEventListener("change", drawCard);
});

typeInput.addEventListener("change", () => {
  const data = templates[typeInput.value];
  if (!messageInput.value.trim()) {
    messageInput.placeholder = data.message;
  }
  drawCard();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  drawCard();

  const link = document.createElement("a");
  link.download = "tabriknoma.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

drawCard();
