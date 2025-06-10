// Terminal animation
document.addEventListener('DOMContentLoaded', function() {
    const commands = [
        { cmd: 'whoami', output: 'Umesh Khatiwada' },
        { cmd: 'ls skills/', output: '* DevOps\n* Cloud Architecture\n* Infrastructure as Code\n* CI/CD\n* Container Orchestration' },
        { cmd: 'cat experience.txt', output: '3.5+ years of experience in delivering impactful DevOps solutions\nSpecialized in AWS, Kubernetes, Docker, and Automation' },
        { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE          STATUS\nab123456789   nginx:latest   Up 24 hours\ncd987654321   redis:alpine   Up 15 days' }
    ];

    let currentCommand = 0;
    const terminalContent = document.querySelector('.terminal-content');

    function typeCommand(text, element, callback) {
        let i = 0;
        element.textContent = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 50);
    }

    function showOutput(text) {
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.innerHTML = text;
        output.style.opacity = '0';
        terminalContent.appendChild(output);
        
        setTimeout(() => {
            output.style.transition = 'opacity 0.5s';
            output.style.opacity = '1';
        }, 50);
    }

    function nextCommand() {
        if (currentCommand >= commands.length) {
            currentCommand = 0;
        }

        const cmd = commands[currentCommand];
        
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = '<span class="terminal-prompt">$ </span><span class="terminal-text"></span>';
        terminalContent.appendChild(line);

        typeCommand(cmd.cmd, line.querySelector('.terminal-text'), () => {
            setTimeout(() => {
                showOutput(cmd.output);
                setTimeout(() => {
                    currentCommand++;
                    nextCommand();
                }, 2000);
            }, 500);
        });
    }

    // Start the command sequence
    nextCommand();
});
