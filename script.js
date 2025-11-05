// ------ ANIMATED BACKGROUND (Chat-Style Gold Sparkles) ------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h, particles;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];

    for (let i = 0; i < 160; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: random(-0.2, 0.2),  // slow horizontal drift
            vy: random(-0.3, 0.3),  // slow vertical drift
            size: random(2, 8),     // small and medium sparkles
            alpha: random(0.3, 0.8),
            alphaChange: random(0.002, 0.008) // twinkle speed
        });
    }
}

function drawParticle(p) {
    let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size*4);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${p.alpha})`); // bright gold center
    gradient.addColorStop(0.5, `rgba(255, 215, 0, ${p.alpha*0.4})`);
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)'); // fade to transparent

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2*Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Twinkle effect
        p.alpha += p.alphaChange;
        if (p.alpha > 0.8 || p.alpha < 0.3) p.alphaChange *= -1;

        drawParticle(p);
    }

    requestAnimationFrame(animate);
}

window.addEventListener("resize", init);

init();
animate();
