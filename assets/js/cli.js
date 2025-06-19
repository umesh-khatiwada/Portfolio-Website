// Interactive Terminal CLI
class DevOpsCLI {
    constructor() {
        this.history = document.getElementById('cli-history');
        this.input = document.getElementById('cli-input');
        this.clearBtn = document.getElementById('clear-btn');
        this.helpBtn = document.getElementById('help-btn');

        if (!this.input || !this.history) {
            console.error('CLI elements not found');
            return;
        }

        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clearHistory(),
            ls: () => this.listFiles(),
            pwd: () => this.showCurrentDirectory(),
            whoami: () => this.showUser(),
            date: () => this.showDate(),
            docker: (args) => this.handleDocker(args),
            kubectl: (args) => this.handleKubernetes(args),
            skills: () => this.showSkills(),
            about: () => this.showAbout(),
            social: () => this.showSocial(),
            contact: () => this.showContact(),
            cat: (args) => this.catFile(args)
        };

        this.initEventListeners();
    }

    initEventListeners() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = e.target.value.trim();
                if (cmd) {
                    this.executeCommand(cmd);
                }
                e.target.value = '';
            }
        });

        this.clearBtn?.addEventListener('click', () => this.clearHistory());
        this.helpBtn?.addEventListener('click', () => this.showHelp());

        // Focus input when clicking anywhere in CLI
        document.querySelector('.advanced-cli')?.addEventListener('click', () => {
            this.input?.focus();
        });

        // Initial focus
        this.input?.focus();
    }

    addToHistory(content, type = 'output') {
        const entry = document.createElement('div');
        entry.className = `cli-${type}`;
        entry.innerHTML = content;
        this.history.appendChild(entry);
        this.history.scrollTop = this.history.scrollHeight;
    }

    executeCommand(input) {
        this.addToHistory(`<span class="cli-prompt">umesh@devops:~$</span> ${input}`, 'command');
        
        const [cmd, ...args] = input.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addToHistory(`<span class="cli-error">Command not found: ${cmd}</span>`);
        }
    }

    showHelp() {
        const help = `
            <div class="cli-help">
                <span class="cli-success">Available Commands:</span><br>
                help     - Show this help message<br>
                clear    - Clear terminal<br>
                ls      - List files and directories<br>
                pwd     - Show current directory<br>
                whoami  - Show current user<br>
                date    - Show current date/time<br>
                docker  - Docker commands<br>
                kubectl - Kubernetes commands<br>
                skills  - Show technical skills<br>
                about   - About Umesh Khatiwada<br>
                social  - Show social links<br>
                contact - Show contact information<br>
                cat    - Read file contents
            </div>
        `;
        this.addToHistory(help);
    }

    clearHistory() {
        while (this.history.firstChild) {
            this.history.removeChild(this.history.firstChild);
        }
    }

    listFiles() {
        this.addToHistory(`
            <span class="cli-file">assets/</span><br>
            <span class="cli-file">├── css/</span><br>
            <span class="cli-file">├── js/</span><br>
            <span class="cli-file">├── img/</span><br>
            <span class="cli-file">└── vendor/</span><br>
            <span class="cli-file">about.html</span><br>
            <span class="cli-file">contact.html</span><br>
            <span class="cli-file">index.html</span><br>
            <span class="cli-file">portfolio.html</span><br>
            <span class="cli-file">resume.html</span><br>
            <span class="cli-file">services.html</span>
        `);
    }

    showCurrentDirectory() {
        this.addToHistory('/home/umesh/portfolio');
    }

    showUser() {
        this.addToHistory('umesh (DevOps Engineer)');
    }

    showDate() {
        this.addToHistory(new Date().toLocaleString());
    }

    handleDocker(args) {
        if (!args.length) {
            this.addToHistory(`
                <div class="cli-help">
                    <span class="cli-success">Docker Commands:</span><br>
                    • docker ps      - List containers<br>
                    • docker images  - List images<br>
                    • docker version - Show Docker version<br>
                    • docker stats   - Show container stats<br>
                    • docker build   - Build an image<br>
                    • docker run     - Run a container<br>
                    Type 'docker [command]' to learn more
                </div>
            `);
            return;
        }
        
        const command = args[0];
        const helpMessages = {
            ps: `Lists running containers and their status.
                Example: docker ps [OPTIONS]
                Options:
                -a, --all     Show all containers
                -q, --quiet   Only show numeric IDs`,
            images: `Lists Docker images on your system.
                Example: docker images [OPTIONS]
                Options:
                -a, --all     Show all images
                --digests     Show digests`,
            version: `Shows Docker version information.
                Example: docker version [OPTIONS]
                Displays: Docker version, API version, Go version`,
            stats: `Display container resource usage statistics.
                Example: docker stats [OPTIONS]
                Shows: CPU%, Memory usage, Network I/O, etc.`,
            build: `Build an image from a Dockerfile.
                Example: docker build [OPTIONS] PATH
                Options:
                -t, --tag     Name and tag the image
                --no-cache    Do not use cache`,
            run: `Run a container from an image.
                Example: docker run [OPTIONS] IMAGE [COMMAND]
                Options:
                -d, --detach  Run in background
                -p, --publish Publish ports`
        };

        if (helpMessages[command]) {
            this.addToHistory(`<div class="cli-command-help">${helpMessages[command]}</div>`);
        } else {
            this.addToHistory(`<span class="cli-error">Unknown docker command: ${command}</span><br>Type 'docker' for available commands.`);
        }
    }

    handleKubernetes(args) {
        if (!args.length) {
            this.addToHistory(`
                <div class="cli-help">
                    <span class="cli-success">Kubernetes Commands:</span><br>
                    • kubectl get     - List resources<br>
                    • kubectl describe - Show details<br>
                    • kubectl create  - Create resource<br>
                    • kubectl delete  - Delete resource<br>
                    • kubectl apply   - Apply manifest<br>
                    • kubectl logs    - View logs<br>
                    Type 'kubectl [command]' to learn more
                </div>
            `);
            return;
        }

        const command = args[0];
        const helpMessages = {
            get: `Lists one or many resources.
                Example: kubectl get [resource]
                Common Resources:
                • pods       - List all pods
                • nodes     - List cluster nodes
                • services  - List all services
                • deployments - List deployments`,
            describe: `Show details of a specific resource.
                Example: kubectl describe [resource] [name]
                Shows detailed state, events, config`,
            create: `Create a resource from file or stdin.
                Example: kubectl create -f [filename]
                Creates: deployments, services, etc.`,
            delete: `Delete resources by name, file, label.
                Example: kubectl delete [resource] [name]
                Use --all to delete all resources`,
            apply: `Apply a configuration to a resource.
                Example: kubectl apply -f [filename]
                Declarative configuration management`,
            logs: `Print the logs for a container.
                Example: kubectl logs [pod] [options]
                Options: --follow, --tail=N, --previous`
        };

        if (helpMessages[command]) {
            this.addToHistory(`<div class="cli-command-help">${helpMessages[command]}</div>`);
        } else {
            this.addToHistory(`<span class="cli-error">Unknown kubectl command: ${command}</span><br>Type 'kubectl' for available commands.`);
        }
    }

    showAbout() {
        this.addToHistory(`
            <div class="cli-about">
                <span class="cli-success">About Umesh Khatiwada:</span><br>
                DevOps Engineer and Cloud Architect with 3.5+ years of experience<br>
                Specializing in cloud infrastructure, automation, and CI/CD pipelines<br>
                Based in Kathmandu, Nepal<br>
            </div>
        `);
    }

    showSkills() {
        this.addToHistory(`
            <div class="cli-skills">
                <span class="cli-success">Technical Skills:</span><br>
                • DevOps: Jenkins, GitLab CI/CD, GitHub Actions<br>
                • Cloud: AWS, GCP, Azure<br>
                • Containers: Docker, Kubernetes<br>
                • IaC: Terraform, Ansible<br>
                • Monitoring: Prometheus, Grafana, ELK<br>
            </div>
        `);
    }

    showContact() {
        this.addToHistory(`
            <div class="cli-contact">
                <span class="cli-success">Contact Information:</span><br>
                Email: info@umeshkhatiwada.com.np<br>
                Location: Kathmandu, Nepal<br>
                <br>
                Feel free to reach out for professional opportunities!
            </div>
        `);
    }

    showSocial() {
        this.addToHistory(`
            <div class="cli-social">
                <span class="cli-success">Connect with me:</span><br>
                • LinkedIn: <a href="https://linkedin.com/in/umesh-khatiwada" target="_blank" rel="noopener">linkedin.com/in/umesh-khatiwada</a><br>
                • Twitter: <a href="https://x.com/The_khatiwada" target="_blank" rel="noopener">x.com/The_khatiwada</a><br>
                • Instagram: <a href="https://instagram.com/umesh__khatiwada" target="_blank" rel="noopener">instagram.com/umesh__khatiwada</a><br>
                • Skype: <a href="https://join.skype.com/invite/u9o9zpFsPsNU" target="_blank" rel="noopener">join.skype.com/invite/u9o9zpFsPsNU</a>
            </div>
        `);
    }

    catFile(args) {
        if (!args || !args.length) {
            this.addToHistory('<span class="cli-error">Usage: cat [filename]</span>');
            return;
        }

        const filename = args[0];
        if (filename === 'readme.txt') {
            this.addToHistory(`
                <div class="cli-file-content">
                    Welcome to Umesh Khatiwada's portfolio website!<br>
                    Explore my work and experience in DevOps and cloud architecture.
                </div>
            `);
        } else {
            this.addToHistory(`<span class="cli-error">File not found: ${filename}</span>`);
        }
    }
}

// Initialize CLI when document is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.cli = new DevOpsCLI();
        console.log('CLI initialized successfully');
    } catch (error) {
        console.error('Failed to initialize CLI:', error);
    }
});
