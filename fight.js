const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let keys = {};

const soulImg = new Image();
soulImg.src = "soul.png";

/* ---------- CAJA DE COMBATE ---------- */
const box = {
    x: 80,
    y: 80,
    width: 240,
    height: 240
};

/* ---------- ALMA ---------- */
const soul = {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
    size: 16,
    speed: 3
};

/* ---------- INICIO ---------- */
function startGame() {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";
    requestAnimationFrame(loop);
}

/* ---------- CONTROLES PC ---------- */
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

/* ---------- CONTROLES MÓVIL ---------- */
function press(dir) { keys[dir] = true; }
function release(dir) { keys[dir] = false; }

/* ---------- LIMITES CAJA ---------- */
function limitarAlma() {
    const half = soul.size / 2;

    if (soul.x - half < box.x) soul.x = box.x + half;
    if (soul.x + half > box.x + box.width) soul.x = box.x + box.width - half;
    if (soul.y - half < box.y) soul.y = box.y + half;
    if (soul.y + half > box.y + box.height) soul.y = box.y + box.height - half;
}

/* ---------- LOOP ---------- */
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Movimiento */
    if (keys["ArrowUp"] || keys["up"]) soul.y -= soul.speed;
    if (keys["ArrowDown"] || keys["down"]) soul.y += soul.speed;
    if (keys["ArrowLeft"] || keys["left"]) soul.x -= soul.speed;
    if (keys["ArrowRight"] || keys["right"]) soul.x += soul.speed;

    limitarAlma();

    /* Dibujar caja */
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    /* Dibujar alma */
    ctx.drawImage(
        soulImg,
        soul.x - soul.size / 2,
        soul.y - soul.size / 2,
        soul.size,
        soul.size
    );

    requestAnimationFrame(loop);
}
