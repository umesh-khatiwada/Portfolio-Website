// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let animationFrameId;
let isRunning = true;
const isMobile = window.innerWidth <= 768;

// Set canvas size with mobile optimization
function setCanvasSize() {
    const scale = isMobile ? window.devicePixelRatio : 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(scale, scale);
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Characters to use
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$>_";
const charSize = 14;
const columns = canvas.width/charSize;
const drops = [];

// Initialize drops
for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Draw matrix rain
function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Matrix green
    ctx.font = charSize + 'px monospace';

    // Loop over drops
    for(let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(text, i * charSize, drops[i] * charSize);

        // Reset drop when it reaches bottom
        if(drops[i] * charSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animate
setInterval(draw, 35);
