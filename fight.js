const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let keys = {};

const soulImg = new Image();
soulImg.src = "soul.png";

/* ---------- CAJA DE COMBATE (MÁS GRANDE) ---------- */
const box = {
    width: 320,
    height: 260,
    x: (canvas.width - 320) / 2,
    y: (canvas.height - 260) / 2
};

/* ---------- ALMA (MÁS GRANDE) ---------- */
const soul = {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
    size: 28,     // antes 16
    speed: 4      // un poco más rápida
};

/* ---------- CONTROLES ---------- */
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function press(dir) { keys[dir] = true; }
function release(dir) { keys[dir] = false; }

/* ---------- LÍMITES ---------- */
function limitarAlma() {
    const h = soul.size / 2;

    if (soul.x - h < box.x) soul.x = box.x + h;
    if (soul.x + h > box.x + box.width) soul.x = box.x + box.width - h;
    if (soul.y - h < box.y) soul.y = box.y + h;
    if (soul.y + h > box.y + box.height) soul.y = box.y + box.height - h;
}

/* ---------- LOOP ---------- */
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys["ArrowUp"] || keys["up"]) soul.y -= soul.speed;
    if (keys["ArrowDown"] || keys["down"]) soul.y += soul.speed;
    if (keys["ArrowLeft"] || keys["left"]) soul.x -= soul.speed;
    if (keys["ArrowRight"] || keys["right"]) soul.x += soul.speed;

    limitarAlma();

    /* Caja blanca */
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    /* Alma */
    ctx.drawImage(
        soulImg,
        soul.x - soul.size / 2,
        soul.y - soul.size / 2,
        soul.size,
        soul.size
    );

    requestAnimationFrame(loop);
}

/* ---------- ARRANQUE ---------- */
function startGame() {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";
    requestAnimationFrame(loop);
}
