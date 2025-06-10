// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
