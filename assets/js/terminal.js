// Terminal animation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Terminal script initialized');
    
    // Get terminal element
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) {
        console.error('Terminal content element not found');
        return;
    }
    
    // Clear any existing content
    terminalContent.innerHTML = '';
    
    // Define commands
    const commands = [
        { cmd: 'whoami', output: 'Umesh Khatiwada' },
        { cmd: 'ls -l skills/', output: 'drwxr-xr-x DevOps\ndrwxr-xr-x Cloud-Architecture\ndrwxr-xr-x Infrastructure-as-Code\ndrwxr-xr-x CI-CD-Pipeline\ndrwxr-xr-x Container-Orchestration' },
        { cmd: 'cat experience.txt', output: '3.5+ years of experience in delivering impactful DevOps solutions\nSpecialized in AWS, Kubernetes, Docker, and Automation' },
        { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE          STATUS\nab123456789   nginx:latest   Up 24 hours\ncd987654321   redis:alpine   Up 15 days' }
    ];

    function typeCommand(text, element) {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        });
    }

    function showOutput(text) {
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.innerHTML = text;
        terminalContent.appendChild(output);
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                output.style.opacity = '1';
                setTimeout(resolve, 500);
            });
        });
    }

    async function displayCommands() {
        for (const cmd of commands) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = '<span class="terminal-prompt">$ </span><span class="terminal-text"></span>';
            terminalContent.appendChild(line);

            await typeCommand(cmd.cmd, line.querySelector('.terminal-text'));
            await new Promise(resolve => setTimeout(resolve, 500));
            await showOutput(cmd.output);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Run the sequence once
    displayCommands().then(() => {
        // Add final cursor after all commands are done
        const finalPrompt = document.createElement('div');
        finalPrompt.className = 'terminal-line';
        finalPrompt.innerHTML = '<span class="terminal-prompt">$ </span><span class="cursor"></span>';
        terminalContent.appendChild(finalPrompt);
    });
});
