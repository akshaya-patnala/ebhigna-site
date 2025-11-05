// ------ ANIMATED BACKGROUND (Realistic Gold Sparkles) ------
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
            vx: random(-0.3, 0.3),  // slow drift
            vy: random(-0.5, 0.5),
            size: Math.random() < 0.7 ? random(2, 4) : random(6, 12),
            alpha: random(0.3, 0.8),
            alphaChange: random(0.002, 0.008), // twinkle speed
            shape: Math.floor(Math.random() * 3) // 0=blob,1=star,2=triangle
        });
    }
}

function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = p.alpha;

    // Glow
    let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 4);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradient;

    // Different shapes
    if (p.shape === 0) {
        // blob-like
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * random(0.6,1.2), Math.random()*Math.PI, 0, 2*Math.PI);
        ctx.fill();
    } else if (p.shape === 1) {
        // tiny star
        ctx.beginPath();
        for(let i=0;i<5;i++){
            let angle = i * (Math.PI * 2 / 5);
            let radius = p.size * random(0.8,1.2);
            ctx.lineTo(Math.cos(angle)*radius, Math.sin(angle)*radius);
        }
        ctx.closePath();
        ctx.fill();
    } else {
        // small triangle
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size*0.8, p.size);
        ctx.lineTo(-p.size*0.8, p.size);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Twinkle effect
        p.alpha += p.alphaChange;
        if (p.alpha > 0.8 || p.alpha < 0.2) p.alphaChange *= -1;

        drawParticle(p);
    }

    requestAnimationFrame(animate);
}

window.addEventListener("resize", init);

init();
animate();
