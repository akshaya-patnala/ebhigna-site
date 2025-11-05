// ------ ANIMATED BACKGROUND (Gold Sparkles) ------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h, particles;
function init(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];

    for(let i = 0; i < 120; i++){  // Number of sparkles
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.8, // horizontal speed
            vy: (Math.random() - 0.5) * 0.8, // vertical speed
            r: Math.random() * 2 + 1,       // radius
            alpha: Math.random() * 0.7 + 0.3 // opacity
        });
    }
}

function animate(){
    ctx.clearRect(0, 0, w, h);

    for(let p of particles){
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if(p.x < 0 || p.x > w) p.vx *= -1;
        if(p.y < 0 || p.y > h) p.vy *= -1;

        // Draw sparkle
        let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*4);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${p.alpha})`); // bright gold
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');          // transparent edge

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

window.addEventListener("resize", init);

init();
animate();
