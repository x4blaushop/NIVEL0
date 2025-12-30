const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "X4C3DNA77701".split(""); 

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 1500; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.005,
            size: Math.random() * 14 + 10,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, w, h);
    const themeColor = getComputedStyle(document.body).color;

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.8; 
        if(p.r < 45) p.r = Math.max(w, h) * 0.9;
        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;
        ctx.fillStyle = themeColor;
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 12;
        ctx.shadowColor = themeColor;
        ctx.fillText(p.c, x, y);
    });

    ctx.beginPath();
    ctx.arc(w/2, h/2, 55, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 85;
    ctx.shadowColor = themeColor;
    ctx.stroke();
    requestAnimationFrame(draw);
}
window.addEventListener("resize", init);
init();
draw();
