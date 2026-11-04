// Interactive profile CLI on the home page.
class DevOpsCLI {
  constructor() {
    this.history = document.getElementById('cli-history');
    this.input = document.getElementById('cli-input');
    this.root = document.getElementById('interactive-cli');
    if (!this.input || !this.history) return;

    this.past = [];
    this.pos = 0;

    this.commands = {
      help: () => this.help(),
      clear: () => this.clear(),
      whoami: () => this.print('umesh-khatiwada — DevOps / Platform / Golang engineer'),
      neofetch: () => this.neofetch(),
      about: () => this.about(),
      skills: () => this.skills(),
      experience: () => this.experience(),
      projects: () => this.projects(),
      agent: (a) => this.agent(a),
      kubectl: (a) => this.kubectl(a),
      docker: (a) => this.docker(a),
      contact: () => this.contact(),
      social: () => this.social(),
      resume: () => { this.print('Opening CV...'); window.open('assets/file/cv.pdf', '_blank'); },
      date: () => this.print(new Date().toLocaleString()),
      pwd: () => this.print('/home/umesh/portfolio'),
      ls: () => this.print('about.html  contact.html  index.html  portfolio.html  resume.html  services.html  cv.pdf'),
      sudo: () => this.print('<span class="cli-error">umesh is not in the sudoers file. This incident will be reported.</span>'),
    };

    this.bind();
  }

  bind() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) this.run(cmd);
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (this.pos > 0) this.input.value = this.past[--this.pos];
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.pos < this.past.length - 1) this.input.value = this.past[++this.pos];
        else { this.pos = this.past.length; this.input.value = ''; }
        e.preventDefault();
      } else if (e.key === 'Tab') {
        const v = this.input.value;
        const hit = Object.keys(this.commands).find((c) => c.startsWith(v));
        if (v && hit) this.input.value = hit + ' ';
        e.preventDefault();
      }
    });

    document.getElementById('clear-btn')?.addEventListener('click', () => this.clear());
    document.getElementById('help-btn')?.addEventListener('click', () => this.run('help'));
    document.getElementById('max-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.root.classList.toggle('maximized');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.root.classList.remove('maximized');
    });

    this.history.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cmd]');
      if (b) this.run(b.dataset.cmd);
    });
    this.root?.addEventListener('click', (e) => {
      if (!e.target.closest('a,button')) this.input.focus({ preventScroll: true });
    });
  }

  print(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    this.history.appendChild(el);
    this.history.parentElement.scrollTop = this.history.parentElement.scrollHeight;
  }

  esc(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  run(raw) {
    this.past.push(raw);
    this.pos = this.past.length;
    this.print(`<span class="cli-prompt">umesh@devops:~$</span> ${this.esc(raw)}`);
    const [cmd, ...args] = raw.split(/\s+/);
    const fn = this.commands[cmd.toLowerCase()];
    if (fn) fn(args);
    else this.print(`<span class="cli-error">command not found: ${this.esc(cmd)}</span> — try <b>help</b>`);
  }

  clear() { this.history.innerHTML = ''; }

  help() {
    const rows = [
      ['neofetch', 'profile summary'],
      ['about', 'who I am'],
      ['skills', 'tech stack by category'],
      ['experience', 'work history'],
      ['projects', 'featured projects'],
      ['agent run', 'simulate the AI on-call agent'],
      ['kubectl get pods|nodes', 'peek at the cluster'],
      ['docker ps', 'running containers'],
      ['contact / social', 'reach me'],
      ['resume', 'open CV (PDF)'],
      ['clear', 'clear screen'],
    ];
    this.print('<span class="cli-success">Available commands</span><br>' +
      rows.map(([c, d]) => `&nbsp;&nbsp;<span style="color:var(--heading)">${c.padEnd(24, ' ').replace(/ /g, '&nbsp;')}</span>${d}`).join('<br>'));
  }

  neofetch() {
    this.print(`<pre style="margin:0;color:var(--text);font:inherit">
<span class="cli-success">     ☸  ☸  ☸</span>      <b style="color:var(--heading)">umesh</b>@<b style="color:var(--heading)">devops</b>
<span class="cli-success">   ☸  ⎈⎈⎈  ☸</span>     ------------------------
<span class="cli-success">  ☸  ⎈   ⎈  ☸</span>    <span class="cli-success">Role</span>:     DevOps · Platform · Go
<span class="cli-success">   ☸  ⎈⎈⎈  ☸</span>     <span class="cli-success">Uptime</span>:   4+ years in production
<span class="cli-success">     ☸  ☸  ☸</span>      <span class="cli-success">Clouds</span>:   AWS, GCP, Azure, OVH, Linode
                 <span class="cli-success">Runtime</span>:  Kubernetes, Docker, Helm
                 <span class="cli-success">Lang</span>:     Go, Python, TypeScript, Bash
                 <span class="cli-success">AI</span>:       n8n agents, LLM alert triage
                 <span class="cli-success">Location</span>: Kathmandu, Nepal (UTC+5:45)</pre>`);
  }

  about() {
    this.print(`<span class="cli-success">About</span><br>
DevOps and Golang engineer with 4+ years building cloud platforms, CI/CD and observability.<br>
Currently Software Engineer (Go) at Perizer and DevOps Engineer at BerryBytes.<br>
I also build AI-agent workflows (n8n + LLMs) that triage alerts and suggest fixes for SREs.`);
  }

  skills() {
    const g = {
      'cloud': 'AWS, GCP, Azure, OVH, Linode, Lambda, Step Functions',
      'containers': 'Kubernetes, Docker, Helm, vcluster, Operators, KubeVela, Cilium, Calico',
      'ci-cd / iac': 'ArgoCD, Tekton, Jenkins, GitHub Actions, GitLab CI, Terraform, Terragrunt, Ansible',
      'observability': 'Prometheus, Grafana, Cortex, Loki, OpenTelemetry, ELK, Datadog, New Relic',
      'languages': 'Go, Python, TypeScript, JavaScript, Bash, Java, Dart',
      'gateways / mq': 'Nginx, Envoy, Traefik, Kong, APISIX, KrakenD, Dapr, Kafka, RabbitMQ',
      'ai & security': 'n8n agents, LLM tool-calling, Trivy, SonarQube, Keycloak, Auth0',
    };
    this.print('<span class="cli-success">Skills</span><br>' +
      Object.entries(g).map(([k, v]) => `&nbsp;&nbsp;<span style="color:var(--violet)">${k}/</span> ${v}`).join('<br>'));
  }

  experience() {
    this.print(`<span class="cli-success">Experience</span><br>
&nbsp;&nbsp;2024 → now&nbsp;&nbsp;Software Engineer (Go) · Perizer (US, remote)<br>
&nbsp;&nbsp;2023 → now&nbsp;&nbsp;DevOps Engineer · BerryBytes — AWS migration (-30% cost), K8s (2× faster deploys)<br>
&nbsp;&nbsp;2023&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DevOps Engineer · RPA Nepal (remote)<br>
&nbsp;&nbsp;2022 → 2023&nbsp;DevOps / Software Engineer · Supreme IT Solutions, Intopros<br>
&nbsp;&nbsp;2021&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software Developer · Aavaa Technologies`);
  }

  projects() {
    this.print(`<span class="cli-success">Projects</span><br>
&nbsp;&nbsp;• <b>ComputeSphere</b> — Render-style PaaS: apps, DBs, functions, cron, alerts<br>
&nbsp;&nbsp;• <b>01Cloud</b> — cloud deploy platform + monitoring/alert microservices<br>
&nbsp;&nbsp;• <b>ClusterManager</b> — on-demand virtual Kubernetes clusters (vcluster)<br>
&nbsp;&nbsp;• <b>AI On-call Agent</b> — n8n + LLM alert triage and fix suggestions<br>
&nbsp;&nbsp;• <b>Horyzon Pictures</b> — serverless ABR video pipeline on AWS<br>
&nbsp;&nbsp;See more: <a href="portfolio.html">portfolio.html</a>`);
  }

  async agent(args) {
    if (args[0] !== 'run') {
      this.print('usage: <b>agent run</b> — simulate the AI on-call agent');
      return;
    }
    const steps = [
      ['var(--amber)', 'ALERT', 'KubePodCrashLooping checkout-api'],
      ['var(--cyan)', 'n8n', 'routing to ai-oncall workflow'],
      ['var(--violet)', 'AGENT', 'reading logs/events... OOMKilled (410Mi > 256Mi)'],
      ['var(--green)', 'FIX', 'raise memory limit → 512Mi, PR opened'],
      ['var(--green)', 'SLACK', 'on-call engineer notified ✓'],
    ];
    for (const [c, t, m] of steps) {
      this.print(`<span style="color:${c}">[${t}]</span> ${m}`);
      await new Promise((r) => setTimeout(r, 650));
    }
  }

  kubectl(args) {
    const what = args[1] || '';
    if (args[0] === 'get' && /^nodes?$/.test(what)) {
      this.print(`<pre style="margin:0;font:inherit">NAME              STATUS   ROLES           VERSION
ip-10-0-1-21      Ready    control-plane   v1.30.2
ip-10-0-2-47      Ready    worker          v1.30.2
ip-10-0-3-88      Ready    worker          v1.30.2</pre>`);
    } else if (args[0] === 'get' && /^(pods?|po)$/.test(what)) {
      this.print(`<pre style="margin:0;font:inherit">NAME                       READY   STATUS    AGE
api-gateway-krakend-7d9f   1/1     Running   42d
deploy-svc-go-5c8b         3/3     Running   18d
cortex-ingester-0          1/1     Running   61d
n8n-ai-agent-6f4d          1/1     Running   9d
argocd-server-74b6         1/1     Running   88d</pre>`);
    } else {
      this.print('try: <b>kubectl get pods</b> or <b>kubectl get nodes</b>');
    }
  }

  docker(args) {
    if (args[0] === 'ps') {
      this.print(`<pre style="margin:0;font:inherit">CONTAINER ID   IMAGE                    STATUS
a1b2c3d4e5f6   grafana/grafana:11       Up 12 days
b2c3d4e5f6a7   prom/prometheus:v2.53    Up 12 days
c3d4e5f6a7b8   n8nio/n8n:latest         Up 9 days
d4e5f6a7b8c9   postgres:16-alpine       Up 30 days</pre>`);
    } else {
      this.print('try: <b>docker ps</b>');
    }
  }

  contact() {
    this.print(`<span class="cli-success">Contact</span><br>
&nbsp;&nbsp;Email:&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:contact.khatiwada@gmail.com">contact.khatiwada@gmail.com</a><br>
&nbsp;&nbsp;Location: Kathmandu, Nepal — open to remote<br>
&nbsp;&nbsp;Form:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="contact.html">contact.html</a>`);
  }

  social() {
    this.print(`<span class="cli-success">Social</span><br>
&nbsp;&nbsp;GitHub:&nbsp;&nbsp;&nbsp;<a href="https://github.com/umesh-khatiwada" target="_blank" rel="noopener">github.com/umesh-khatiwada</a><br>
&nbsp;&nbsp;LinkedIn: <a href="https://www.linkedin.com/in/umesh-khatiwada/" target="_blank" rel="noopener">linkedin.com/in/umesh-khatiwada</a><br>
&nbsp;&nbsp;Medium:&nbsp;&nbsp;&nbsp;<a href="https://medium.com/@contact.khatiwada" target="_blank" rel="noopener">medium.com/@contact.khatiwada</a><br>
&nbsp;&nbsp;Blog:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://blog.umeshkhatiwada.com.np/article/" target="_blank" rel="noopener">blog.umeshkhatiwada.com.np</a>`);
  }
}

document.addEventListener('DOMContentLoaded', () => { window.cli = new DevOpsCLI(); });
