// Glitch text effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if glitch text elements exist
    const glitchElements = document.querySelectorAll('.glitch-text');
    if (!glitchElements.length) {
        return;
    }
    
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        const glitchCharacters = "!<>-_\\/[]{}—=+*^?#________";
        
        // Create glitch layers
        element.innerHTML = `
            <div class="glitch-text-content">${originalText}</div>
            <div class="glitch-text-content glitch-layer-1" aria-hidden="true">${originalText}</div>
            <div class="glitch-text-content glitch-layer-2" aria-hidden="true">${originalText}</div>
        `;
        
        // Add glitch effect on hover or every few seconds
        function startGlitching() {
            let iteration = 0;
            const maxIterations = 12;
            
            // Save the original text
            const baseElement = element.querySelector('.glitch-text-content');
            const layer1 = element.querySelector('.glitch-layer-1');
            const layer2 = element.querySelector('.glitch-layer-2');
            
            const glitchInterval = setInterval(() => {
                // Apply glitch to main text
                if (iteration < maxIterations) {
                    baseElement.textContent = originalText
                        .split("")
                        .map((char, idx) => {
                            if (idx < iteration) return originalText[idx];
                            if (char === ' ') return ' ';
                            return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
                        })
                        .join("");
                    
                    // Apply different glitches to layers
                    layer1.textContent = originalText
                        .split("")
                        .map((char, idx) => {
                            if (char === ' ') return ' ';
                            return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
                        })
                        .join("");
                    
                    layer2.textContent = originalText
                        .split("")
                        .map((char, idx) => {
                            if (char === ' ') return ' ';
                            return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
                        })
                        .join("");
                    
                    iteration++;
                } else {
                    // Reset to original text
                    baseElement.textContent = originalText;
                    layer1.textContent = originalText;
                    layer2.textContent = originalText;
                    clearInterval(glitchInterval);
                    
                    // Add random chance of triggering again (only 10%)
                    if (element.matches(':hover') || Math.random() < 0.1) {
                        setTimeout(startGlitching, 2000 + Math.random() * 3000);
                    }
                }
            }, 70);
        }
        
        // Start glitching on hover
        element.addEventListener('mouseenter', function() {
            startGlitching();
        });
        
        // Random chance to start glitching
        if (Math.random() < 0.3) {
            setTimeout(() => {
                startGlitching();
            }, 1000 + Math.random() * 5000);
        }
    });
});
