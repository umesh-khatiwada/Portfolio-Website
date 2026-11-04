// Animates the AI on-call agent workflow on the home page.
document.addEventListener('DOMContentLoaded', function () {
  const flow = document.getElementById('agent-flow');
  const log = document.getElementById('agent-log');
  if (!flow || !log) return;

  const nodes = flow.querySelectorAll('.node');
  const scenarios = [
    [
      ['warn', 'ALERT', 'KubePodCrashLooping · ns=shop · pod=checkout-api-7d9f'],
      ['info', 'n8n', 'severity=critical → route to ai-oncall workflow'],
      ['ai', 'AGENT', 'tool: kubectl logs + events → exit 137, OOMKilled'],
      ['ai', 'AGENT', 'memory peak 410Mi vs limit 256Mi after v2.3 release'],
      ['ok', 'FIX', 'raise memory limit to 512Mi; open PR on helm values'],
      ['ok', 'SLACK', '#sre ← diagnosis + PR link sent to on-call engineer'],
    ],
    [
      ['warn', 'ALERT', 'Trivy: CRITICAL CVE in image payments:1.8.2'],
      ['info', 'n8n', 'security event → route to devsecops workflow'],
      ['ai', 'AGENT', 'tool: trivy report → openssl 3.0.7 affected'],
      ['ai', 'AGENT', 'patched base image available: alpine 3.20'],
      ['ok', 'FIX', 'bump base image, rebuild via GitHub Actions'],
      ['ok', 'EMAIL', 'owner team notified with remediation steps'],
    ],
    [
      ['warn', 'ALERT', 'HighLatency p95 > 900ms · api-gateway (KrakenD)'],
      ['info', 'n8n', 'severity=warning → route to ai-oncall workflow'],
      ['ai', 'AGENT', 'tool: Cortex query → upstream orders-svc saturated'],
      ['ai', 'AGENT', 'HPA at max replicas (6/6), CPU 94%'],
      ['ok', 'FIX', 'raise HPA maxReplicas to 10; add cache on /orders'],
      ['ok', 'SLACK', '#sre ← runbook + graphs attached'],
    ],
  ];

  // Which flow node each log line lights up
  const stepFor = [0, 1, 2, 2, 3, 4];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const stamp = () => new Date().toTimeString().slice(0, 8);

  function setActive(i) {
    nodes.forEach((n, idx) => n.classList.toggle('active', idx === i));
  }

  let started = false;
  async function loop() {
    let s = 0;
    while (true) {
      log.innerHTML = '';
      const lines = scenarios[s % scenarios.length];
      for (let i = 0; i < lines.length; i++) {
        const [cls, tag, msg] = lines[i];
        setActive(stepFor[i]);
        const row = document.createElement('div');
        row.innerHTML = `<span class="t">${stamp()}</span> <span class="${cls}">[${tag}]</span> ${msg}`;
        log.appendChild(row);
        await sleep(1300);
      }
      setActive(-1);
      await sleep(2600);
      s++;
    }
  }

  // Start once the section scrolls into view
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting) && !started) {
      started = true;
      loop();
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(flow);
});
