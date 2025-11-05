// ------ POPUP SYSTEM ------
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");
const eventTitle = document.getElementById("event-title");
const eventDesc = document.getElementById("event-desc");

// Event data (descriptions can be added later)
const eventInfo = {
    jiggle: {
        title: "Code Jiggle",
        desc: "Description will be updated soon..."
    },
    golf: {
        title: "Code Golf",
        desc: "Description will be updated soon..."
    },
    prompt: {
        title: "Promptopia",
        desc: "Description will be updated soon..."
    },
    escape: {
        title: "Escape the Lab",
        desc: "Description will be updated soon..."
    }
};

// Add click events to all event buttons
document.querySelectorAll(".event-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let key = btn.getAttribute("data-event");
        eventTitle.textContent = eventInfo[key].title;
        eventDesc.textContent = eventInfo[key].desc;
        popup.style.display = "flex";
    });
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Close popup when clicking outside box
popup.addEventListener("click", (e) => {
    if(e.target === popup){
        popup.style.display = "none";
    }
});


// ------ ANIMATED BACKGROUND ------
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
