// Hero terminal: types a looping sequence of commands with real profile data.
document.addEventListener('DOMContentLoaded', function () {
  const term = document.querySelector('.terminal-content');
  if (!term) return;

  const commands = [
    { cmd: 'whoami', out: 'umesh-khatiwada  # DevOps · Platform · Go · AI automation' },
    { cmd: 'cat profile.yaml', out:
`experience: 4+ years
current:
  - Software Engineer (Go) @ Perizer
  - DevOps Engineer @ BerryBytes
focus: [kubernetes, gitops, observability, ai-agents]` },
    { cmd: 'kubectl get pods -n platform', out:
`NAME                         READY   STATUS    AGE
api-gateway-krakend-7d9f     1/1     Running   42d
deploy-svc-go-5c8b           3/3     Running   18d
cortex-ingester-0            1/1     Running   61d
n8n-ai-agent-6f4d            1/1     Running   9d` },
    { cmd: 'terraform apply -auto-approve', out:
`aws_eks_cluster.prod: Creation complete
module.vpc: 14 resources ready
<span style="color:var(--green)">Apply complete! Resources: 23 added, 0 changed, 0 destroyed.</span>` },
    { cmd: 'n8n run ai-oncall --alert PodCrashLoop', out:
`<span style="color:var(--violet)">[agent]</span> fetching logs + events for checkout-api...
<span style="color:var(--violet)">[agent]</span> cause: OOMKilled (limit 256Mi, peak 410Mi)
<span style="color:var(--green)">[agent]</span> fix: raise limit to 512Mi, sent to #sre` },
  ];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const scroll = () => { term.scrollTop = term.scrollHeight; };

  async function type(el, text) {
    for (const ch of text) {
      el.textContent += ch;
      scroll();
      await sleep(38);
    }
  }

  async function run() {
    while (true) {
      term.innerHTML = '';
      for (const c of commands) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = '<span class="terminal-prompt">❯ </span><span class="terminal-text"></span>';
        term.appendChild(line);
        await type(line.querySelector('.terminal-text'), c.cmd);
        await sleep(350);
        const out = document.createElement('div');
        out.className = 'terminal-output';
        out.innerHTML = c.out;
        term.appendChild(out);
        scroll();
        await sleep(1400);
      }
      const end = document.createElement('div');
      end.className = 'terminal-line';
      end.innerHTML = '<span class="terminal-prompt">❯ </span><span class="cursor"></span>';
      term.appendChild(end);
      scroll();
      await sleep(5000);
    }
  }

  run();
});
