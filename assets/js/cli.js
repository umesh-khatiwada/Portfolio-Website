// Interactive Terminal CLI
document.addEventListener('DOMContentLoaded', function() {
    // Check if CLI container exists
    const cliContainer = document.getElementById('interactive-cli');
    if (!cliContainer) {
        console.error('CLI container not found');
        return;
    }
    
    // Create CLI interface
    const cliOutput = document.createElement('div');
    cliOutput.className = 'cli-output';
    cliOutput.setAttribute('aria-live', 'polite');
    
    const cliInput = document.createElement('div');
    cliInput.className = 'cli-input';
    cliInput.innerHTML = `
        <span class="cli-prompt">guest@umesh-portfolio:~$</span>
        <input type="text" class="cli-input-field" aria-label="Command input" autofocus>
    `;
    
    cliContainer.appendChild(cliOutput);
    cliContainer.appendChild(cliInput);
    
    const inputField = cliInput.querySelector('.cli-input-field');
    
    // Initial welcome message
    addMessage('Welcome to Umesh\'s interactive CLI! Type "help" for available commands.');
    
    // Command history
    const commandHistory = [];
    let historyIndex = -1;
    
    // Focus input field when container is clicked
    cliContainer.addEventListener('click', function() {
        inputField.focus();
    });
    
    // Process command when Enter is pressed
    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = inputField.value.trim();
            if (command) {
                processCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                inputField.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputField.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autocompleteCommand(inputField.value);
        }
    });
    
    // Add message to CLI output
    function addMessage(message, isCommand = false) {
        const messageElement = document.createElement('div');
        messageElement.className = isCommand ? 'cli-command' : 'cli-response';
        
        if (isCommand) {
            messageElement.innerHTML = `<span class="cli-prompt">guest@umesh-portfolio:~$</span> ${message}`;
        } else {
            messageElement.innerHTML = message;
        }
        
        cliOutput.appendChild(messageElement);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }
    
    // Process user command
    function processCommand(command) {
        addMessage(command, true);
        
        const cmd = command.toLowerCase().split(' ')[0];
        const args = command.split(' ').slice(1);
        
        switch (cmd) {
            case 'help':
                showHelp();
                break;
            case 'about':
                showAbout();
                break;
            case 'skills':
                showSkills();
                break;
            case 'projects':
                showProjects();
                break;
            case 'contact':
                showContact();
                break;
            case 'social':
                showSocial();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'echo':
                addMessage(args.join(' '));
                break;
            case 'date':
                addMessage(new Date().toString());
                break;
            case 'ls':
                listItems(args);
                break;
            case 'cat':
                catFile(args);
                break;
            default:
                addMessage(`Command not found: ${cmd}. Type 'help' to see available commands.`);
        }
    }
    
    // Command autocomplete
    function autocompleteCommand(partial) {
        const commands = ['help', 'about', 'skills', 'projects', 'contact', 'social', 'clear', 'echo', 'date', 'ls', 'cat'];
        const matches = commands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
        
        if (matches.length === 1) {
            inputField.value = matches[0];
        } else if (matches.length > 1) {
            addMessage('Available commands: ' + matches.join(', '));
        }
    }
    
    // Command implementations
    function showHelp() {
        addMessage(`
            <strong>Available commands:</strong><br>
            <span class="cmd">help</span> - Show this help message<br>
            <span class="cmd">about</span> - Learn about Umesh<br>
            <span class="cmd">skills</span> - List technical skills<br>
            <span class="cmd">projects</span> - View portfolio projects<br>
            <span class="cmd">contact</span> - Get contact information<br>
            <span class="cmd">social</span> - Display social media links<br>
            <span class="cmd">clear</span> - Clear the terminal<br>
            <span class="cmd">date</span> - Display current date and time<br>
            <span class="cmd">ls [directory]</span> - List content categories<br>
            <span class="cmd">cat [file]</span> - Display content details<br>
            <br>
            <em>Pro tip: Use Tab for command completion and Up/Down arrows for command history</em>
        `);
    }
    
    function showAbout() {
        addMessage(`
            <strong>Umesh Khatiwada</strong><br>
            DevOps Professional & Cloud Architect<br><br>
            
            A highly skilled IT professional with 3.5+ years of experience delivering impactful solutions.
            Specialized in AWS, Kubernetes, Docker, and automation. Dedicated to continuous learning
            and committed to driving improvement.<br><br>
            
            For more details, type <span class="cmd">cat resume</span>
        `);
    }
    
    function showSkills() {
        addMessage(`
            <strong>Technical Skills:</strong><br>
            <span class="skill-category">DevOps:</span> Jenkins, GitLab CI/CD, GitHub Actions<br>
            <span class="skill-category">Cloud:</span> AWS, Google Cloud Platform, Azure<br>
            <span class="skill-category">Containers:</span> Docker, Kubernetes, ECS<br>
            <span class="skill-category">IaC:</span> Terraform, CloudFormation, Ansible<br>
            <span class="skill-category">Monitoring:</span> Prometheus, Grafana, ELK Stack<br>
            <span class="skill-category">Languages:</span> Python, Bash, JavaScript, Java<br>
        `);
    }
    
    function showProjects() {
        addMessage(`
            <strong>Featured Projects:</strong><br>
            <span class="project">CI/CD Pipeline Automation</span> - Jenkins, Docker, Kubernetes<br>
            <span class="project">Cloud Infrastructure as Code</span> - Terraform, AWS<br>
            <span class="project">Monitoring & Alerting System</span> - Prometheus, Grafana<br>
            <span class="project">Microservices Architecture</span> - Kubernetes, Docker<br>
            <br>
            For more details, type <span class="cmd">cat project [name]</span>
        `);
    }
    
    function showContact() {
        addMessage(`
            <strong>Contact Information:</strong><br>
            <i class="bi bi-envelope"></i> Email: <a href="mailto:info@umeshkhatiwada.com.np">info@umeshkhatiwada.com.np</a><br>
            <i class="bi bi-geo-alt"></i> Location: Kathmandu, Nepal<br>
            <br>
            Feel free to reach out for professional opportunities or collaboration!
        `);
    }
    
    function showSocial() {
        addMessage(`
            <strong>Connect with me:</strong><br>
            <a href="https://www.linkedin.com/in/umesh-khatiwada/" target="_blank"><i class="bi bi-linkedin"></i> LinkedIn</a><br>
            <a href="https://x.com/The_khatiwada" target="_blank"><i class="bi bi-twitter"></i> Twitter</a><br>
            <a href="https://www.instagram.com/umesh__khatiwada/" target="_blank"><i class="bi bi-instagram"></i> Instagram</a><br>
            <a href="https://join.skype.com/invite/u9o9zpFsPsNU" target="_blank"><i class="bi bi-skype"></i> Skype</a><br>
        `);
    }
    
    function clearTerminal() {
        cliOutput.innerHTML = '';
        addMessage('Terminal cleared. Type "help" for available commands.');
    }
    
    function listItems(args) {
        const directory = args[0] || '';
        
        if (directory === '') {
            addMessage(`
                <span class="dir">about/</span><br>
                <span class="dir">skills/</span><br>
                <span class="dir">projects/</span><br>
                <span class="dir">contact/</span><br>
                resume.txt<br>
            `);
        } else if (directory === 'skills') {
            addMessage(`
                devops.txt<br>
                cloud.txt<br>
                containers.txt<br>
                iac.txt<br>
                monitoring.txt<br>
                languages.txt<br>
            `);
        } else if (directory === 'projects') {
            addMessage(`
                ci-cd-pipeline.txt<br>
                infrastructure-as-code.txt<br>
                monitoring-system.txt<br>
                microservices.txt<br>
            `);
        } else {
            addMessage(`Directory not found: ${directory}`);
        }
    }
    
    function catFile(args) {
        const file = args[0] || '';
        
        if (file === 'resume' || file === 'resume.txt') {
            addMessage(`
                <strong>Professional Experience:</strong><br>
                <strong>DevOps Engineer</strong> | Company XYZ<br>
                2021 - Present<br>
                • Implemented CI/CD pipelines with Jenkins and GitLab CI<br>
                • Managed Kubernetes clusters and containerized applications<br>
                • Automated infrastructure using Terraform and Ansible<br>
                <br>
                <strong>Education:</strong><br>
                Bachelor's Degree in Computer Science<br>
                <br>
                <strong>Certifications:</strong><br>
                • AWS Certified DevOps Engineer<br>
                • Certified Kubernetes Administrator<br>
            `);
        } else if (file.includes('project')) {
            const projectName = args[1] || '';
            
            if (projectName.includes('ci') || projectName.includes('pipeline')) {
                addMessage(`
                    <strong>CI/CD Pipeline Automation</strong><br>
                    Designed and implemented a robust CI/CD pipeline using Jenkins, Docker, and Kubernetes.<br>
                    Features:<br>
                    • Automated testing and deployment<br>
                    • Docker image building and versioning<br>
                    • Kubernetes deployment with rolling updates<br>
                    • Slack notifications for build status<br>
                `);
            } else {
                addMessage(`Project details not found. Try 'cat project ci-cd-pipeline'`);
            }
        } else {
            addMessage(`File not found: ${file}`);
        }
    }
});
