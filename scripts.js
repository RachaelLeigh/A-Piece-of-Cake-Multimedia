document.addEventListener("DOMContentLoaded", function () {
  const cakeCanvas = document.getElementById("cakeCanvas");
  const ctx = cakeCanvas.getContext("2d");
  const toppingBar = document.getElementById("toppingBar");
  let selectedTopping = null;

  // Set canvas dimensions
  cakeCanvas.width = 600;
  cakeCanvas.height = 400;

  // Center the cake
  const cakeX = cakeCanvas.width / 2 - 100;
  const cakeY = cakeCanvas.height / 2 - 50;

  // Draw the initial cake
  function drawCake() {
    ctx.clearRect(0, 0, cakeCanvas.width, cakeCanvas.height);
    ctx.fillStyle = "#d87a7a";
    ctx.fillRect(cakeX, cakeY + 50, 200, 50);
    ctx.fillStyle = "#f4c2c2";
    ctx.fillRect(cakeX, cakeY + 20, 200, 30);
  }

  drawCake();

  // Function to draw toppings
  function drawTopping(x, y, type) {
    if (type === "chocolate") {
      ctx.fillStyle = "#8B4513"; // Brown for chocolate
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "strawberry") {
      ctx.fillStyle = "#FF0000"; // Red for strawberry
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#00FF00"; // Green for stem
      ctx.fillRect(x - 2, y - 15, 4, 10); // Stem rectangle
    } else if (type === "cherry") {
      ctx.fillStyle = "#FF0000"; // Red for cherry
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#00FF00"; // Green for cherry stem
      ctx.beginPath();
      ctx.moveTo(x, y - 10); // Stem start
      ctx.lineTo(x, y - 25); // Stem end
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00FF00";
      ctx.stroke();
    } else if (type === "sprinkles") {
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.fillRect(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10, 5, 5);
      }
    }
  }

  // Topping selection
  toppingBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("topping")) {
      selectedTopping = e.target.dataset.type;
      document.querySelectorAll(".topping").forEach((topping) => topping.classList.remove("selected"));
      e.target.classList.add("selected");
    }
  });

  // Add toppings to the cake
  cakeCanvas.addEventListener("click", (e) => {
    if (selectedTopping) {
      const rect = cakeCanvas.getBoundingClientRect();
      drawTopping(e.clientX - rect.left, e.clientY - rect.top, selectedTopping);
    }
  });

  // Reset cake
  document.getElementById("resetCake").addEventListener("click", () => {
    drawCake();
  });

  // Save cake
  document.getElementById("saveCake").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = cakeCanvas.toDataURL();
    link.download = "my-cake.png";
    link.click();
  });

  // Sprinkle trail
  document.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  });
});
