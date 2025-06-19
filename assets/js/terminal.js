// Terminal animation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Terminal script initialized');
    
    // Get terminal element
    const terminalContent = document.querySelector('.terminal-content');
    
    // Force scroll position to stay at 0
    terminalContent.addEventListener('scroll', () => {
        terminalContent.scrollTop = 1;
    });

    // Prevent scroll events
    terminalContent.addEventListener('wheel', (e) => {
        e.preventDefault();
    });

    if (!terminalContent) {
        console.error('Terminal content element not found');
        return;
    }
    
    // Clear any existing content
    terminalContent.innerHTML = '';
    
    // Define commands
    const commands = [
        { cmd: 'whoami', output: 'Umesh Khatiwada' },
        { cmd: 'get_role', output: 'DevOps Engineer & Cloud Architect' },
        { cmd: 'ls -l skills/', output: 'drwxr-xr-x DevOps\ndrwxr-xr-x Cloud-Architecture\ndrwxr-xr-x Infrastructure-as-Code\ndrwxr-xr-x CI-CD-Pipeline\ndrwxr-xr-x Container-Orchestration\n-rw-r--r-- AWS.yaml\n-rw-r--r-- Kubernetes.yaml\n-rw-r--r-- Docker.yaml\n-rw-r--r-- Terraform.yaml' },
        { cmd: 'cat experience.txt', output: '3.5+ years of experience in delivering impactful DevOps solutions\nSpecialized in AWS, Kubernetes, Docker, and Automation' },
        { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE                 STATUS          PORTS\nab123456789   nginx:latest          Up 24 hours     0.0.0.0:80->80/tcp\ncd987654321   redis:alpine          Up 15 days      0.0.0.0:6379->6379/tcp\nef567890ab   postgres:13-alpine   Up 3 days       0.0.0.0:5432->5432/tcp\ngh345678cd   grafana/grafana      Up 5 days       0.0.0.0:3000->3000/tcp' },
        { cmd: 'kubectl get pods', output: 'NAME                           READY   STATUS    RESTARTS   AGE\nfrontend-app-54d8c7b684-x9s8v   1/1     Running   0          12d\napi-service-69d4f98fc9-8kl1w    3/3     Running   2          23d\nredis-master-0                  1/1     Running   0          45d\nmongodbrs-0                     1/1     Running   1          32d' },
        { cmd: 'terraform plan', output: 'Terraform will perform the following actions:\n\n  # aws_eks_cluster.main will be created\n  + resource "aws_eks_cluster" "main" {\n      + name          = "production-cluster"\n      + role_arn      = "arn:aws:iam::123456789012:role/eks-cluster-role"\n      + version       = "1.27"\n      ...\n    }\n\nPlan: 14 to add, 0 to change, 0 to destroy.' }
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
