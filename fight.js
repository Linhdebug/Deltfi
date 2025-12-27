const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let mode = null;
let keys = {};

const soulImg = new Image();
soulImg.src = "soul.png";

const soul = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 16,
    speed: 3
};

/* ---------- INICIO DEL JUEGO ---------- */
function startGame(selected) {
    mode = selected;
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";

    if (mode === "mobile") {
        document.getElementById("controls").style.display = "block";
    }

    requestAnimationFrame(loop);
}

/* ---------- CONTROLES PC ---------- */
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

/* ---------- CONTROLES MÓVIL ---------- */
function press(dir) {
    keys[dir] = true;
}

function release(dir) {
    keys[dir] = false;
}

/* ---------- LOOP PRINCIPAL ---------- */
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys["ArrowUp"] || keys["up"]) soul.y -= soul.speed;
    if (keys["ArrowDown"] || keys["down"]) soul.y += soul.speed;
    if (keys["ArrowLeft"] || keys["left"]) soul.x -= soul.speed;
    if (keys["ArrowRight"] || keys["right"]) soul.x += soul.speed;

    ctx.drawImage(
        soulImg,
        soul.x - soul.size / 2,
        soul.y - soul.size / 2,
        soul.size,
        soul.size
    );

    requestAnimationFrame(loop);
}
