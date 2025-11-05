// ---------- ANIMATED BACKGROUND ----------
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let w, h, particles;

function init(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];

    for(let i=0; i<150; i++){
        particles.push({
            x: Math.random()*w,
            y: Math.random()*h,
            vx: (Math.random()-0.5)*1.5,
            vy: (Math.random()-0.5)*1.5,
            r: Math.random()*2 + 1
        });
    }
}

function animate(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0||p.x>w) p.vx*=-1;
        if(p.y<0||p.y>h) p.vy*=-1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

// ---------- EVENT MODAL ----------
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close');
const events = document.querySelectorAll('.event');

events.forEach(event => {
    event.addEventListener('click', () => {
        modalText.textContent = event.dataset.description;
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target == modal){
        modal.style.display = 'none';
    }
});
