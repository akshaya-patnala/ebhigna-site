// Blue bubbles background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h, particles;

function init(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];

    for(let i=0; i<100; i++){
        particles.push({
            x: Math.random()*w,
            y: Math.random()*h,
            vx: (Math.random()-0.5)*1,
            vy: (Math.random()-0.5)*1,
            r: Math.random()*2 + 1
        });
    }
}

function animate(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < 0 || p.x > w) p.vx *= -1;
        if(p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

window.addEventListener("resize", init);

init();
animate();

// Anywhere click → open EBHIGNA main page
document.body.addEventListener("click", () => {
    window.location.href = "ebhigna.html"; // Your main EBHIGNA page
});
