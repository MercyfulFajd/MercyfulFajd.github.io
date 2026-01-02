function sendToVoid() {
    const text = document.getElementById("voidInput").value;
    if (!text.trim()) return;

    fetch("https://fajd.hu/api/addVoid.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
        .then(res => res.json())
        .then(() => {
            document.getElementById("voidInput").value = "";
            loadVoid();
        });
}

function loadVoid() {
    const container = document.getElementById("voidContainer");
    container.innerHTML = "";

    const width = window.innerWidth;
    const height = container.getBoundingClientRect().height;
    const padding = 0.05 * Math.min(width, height); // 5% padding

    fetch("https://fajd.hu/api/getVoid.php")
        .then(res => res.json())
        .then(entries => {
            entries.forEach((entry, index) => {
                const div = document.createElement("div");
                div.classList.add("echo");
                div.textContent = entry.text;

                const ageFactor = index / entries.length;

                const x = padding + Math.random() * (width - 2 * padding);
                const y = padding + Math.random() * (height - 2 * padding);

                const scale = Math.max(0.4, 1 - ageFactor * 0.5);
                const rotation = (Math.random() * 60) - 30;
                const opacity = Math.max(0.2, 1 - ageFactor * 0.6);

                const dx = (Math.random() - 0.5) * 20 + "px";
                const dy = (Math.random() - 0.5) * 20 + "px";

                div.style.position = "absolute";
                div.style.left = `${x}px`;
                div.style.top = `${y}px`;
                div.style.opacity = "0";
                div.style.zIndex = entries.length - index;

                div.style.setProperty("--scale", scale);
                div.style.setProperty("--rotation", `${rotation}deg`);
                div.style.setProperty("--dx", dx);
                div.style.setProperty("--dy", dy);

                if (index === 0) div.classList.add("freshest");

                container.appendChild(div);

                requestAnimationFrame(() => {
                    div.style.opacity = opacity;
                });
            });
        });
}

function injectGlowStyles() {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
                transform: scale(calc(var(--scale) * 1.1)) rotate(var(--rotation));
            }
            50% {
                box-shadow: 0 0 45px rgba(255, 255, 255, 1);
                transform: scale(calc(var(--scale) * 1.2)) rotate(calc(var(--rotation) + 1deg));
            }
        }

        .freshest { background-color: #fff8dc; box-shadow: 0 0 25px rgba(255, 255, 255, 0.9); animation: pulseGlow 2.5s ease-in-out infinite; z-index: 9999; font-weight: bold; padding: 8px 12px; border-radius: 8px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, calc(-50% + 5vh)) scale(var(--scale)) rotate(var(--rotation)); }  `;

    document.head.appendChild(style);
}

window.onload = () => {
    injectGlowStyles();

    const input = document.getElementById("voidInput");
    if (input) {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") sendToVoid();
        });
    }
    loadVoid();
};
