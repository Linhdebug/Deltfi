const canvas = document.getElementById("battle");
const ctx = canvas.getContext("2d");

// Alma
let soul = { x: 190, y: 140, size: 10, speed: 3 };
let bullets = [];
let hp = 20;

// Teclas
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Crear balas
setInterval(() => {
    bullets.push({ x: Math.random() * 390, y: 0, size: 6, speed: 2 });
}, 800);

function update() {
    // Movimiento
    if (keys["ArrowUp"]) soul.y -= soul.speed;
    if (keys["ArrowDown"]) soul.y += soul.speed;
    if (keys["ArrowLeft"]) soul.x -= soul.speed;
    if (keys["ArrowRight"]) soul.x += soul.speed;

    // Límites
    soul.x = Math.max(0, Math.min(390, soul.x));
    soul.y = Math.max(0, Math.min(290, soul.y));

    // Balas
    bullets.forEach(b => b.y += b.speed);

    // Colisiones
    bullets.forEach(b => {
        if (
            soul.x < b.x + b.size &&
            soul.x + soul.size > b.x &&
            soul.y < b.y + b.size &&
            soul.y + soul.size > b.y
        ) {
            hp--;
            b.y = 400; // quitar bala
        }
    });

    bullets = bullets.filter(b => b.y < 300);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Alma
    ctx.fillStyle = "red";
    ctx.fillRect(soul.x, soul.y, soul.size, soul.size);

    // Balas
    ctx.fillStyle = "white";
    bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.size, b.size);
    });

    // HP
    ctx.fillStyle = "white";
    ctx.fillText("HP: " + hp, 10, 20);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
