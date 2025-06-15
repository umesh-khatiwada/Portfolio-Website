// DevOps Network Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Check if network container exists
    const networkContainer = document.getElementById('network-container');
    if (!networkContainer) {
        console.error('Network container not found');
        return;
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    networkContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = networkContainer.clientWidth;
        canvas.height = networkContainer.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // DevOps service node class
    class Node {
        constructor(type) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 4 + Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.type = type; // server, container, database, etc.
            this.color = this.getColorByType();
            this.connections = [];
            this.isHovered = false;
            this.pulse = 0;
        }
        
        getColorByType() {
            const colors = {
                'server': '#18d26e', // Green
                'container': '#0dcaf0', // Blue
                'database': '#ffc107', // Yellow
                'client': '#dc3545', // Red
                'service': '#6f42c1', // Purple
                'loadbalancer': '#fd7e14' // Orange
            };
            return colors[this.type] || '#ffffff';
        }
        
        getLabel() {
            return this.type.charAt(0).toUpperCase() + this.type.slice(1);
        }
        
        update() {
            // Move node
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            // Pulse effect when hovered
            if (this.isHovered) {
                this.pulse += 0.1;
                if (this.pulse > 1) this.pulse = 0;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + (this.isHovered ? 3 * Math.sin(this.pulse * Math.PI) : 0), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Draw label when hovered
            if (this.isHovered) {
                ctx.font = '12px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText(this.getLabel(), this.x, this.y - 15);
            }
        }
    }

    // Generate nodes
    const nodeTypes = ['server', 'container', 'database', 'client', 'service', 'loadbalancer'];
    const nodes = [];
    
    for (let i = 0; i < 24; i++) {
        const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        nodes.push(new Node(type));
    }
    
    // Create connections between nodes (simulating network topology)
    nodes.forEach(node => {
        const numConnections = 1 + Math.floor(Math.random() * 3); // 1-3 connections per node
        for (let i = 0; i < numConnections; i++) {
            const targetIndex = Math.floor(Math.random() * nodes.length);
            if (nodes[targetIndex] !== node) {
                node.connections.push(nodes[targetIndex]);
            }
        }
    });
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    networkContainer.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Check if mouse is hovering over any node
        nodes.forEach(node => {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            node.isHovered = distance < node.size + 5;
        });
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.globalAlpha = 0.5;
        nodes.forEach(node => {
            node.connections.forEach(targetNode => {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(targetNode.x, targetNode.y);
                
                // Gradient based on node types
                const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y);
                gradient.addColorStop(0, node.color);
                gradient.addColorStop(1, targetNode.color);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            });
        });
        
        // Draw nodes
        ctx.globalAlpha = 1;
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
