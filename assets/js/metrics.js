// Live DevOps metrics visualization
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('metrics-container')) {
        return; // Exit if the container doesn't exist
    }
    
    // Initialize metrics 
    const metrics = [
        { name: 'CPU Load', value: 0, max: 100, unit: '%', color: '#18d26e' },
        { name: 'Memory Usage', value: 0, max: 100, unit: '%', color: '#0dcaf0' },
        { name: 'Network Traffic', value: 0, max: 100, unit: 'MB/s', color: '#ffc107' },
        { name: 'Uptime', value: 0, max: 365, unit: 'days', color: '#6f42c1' }
    ];
    
    // Create the metrics gauges
    function createMetricsGauges() {
        const container = document.getElementById('metrics-container');
        
        metrics.forEach(metric => {
            const metricEl = document.createElement('div');
            metricEl.className = 'metric-gauge';
            metricEl.innerHTML = `
                <div class="metric-title">${metric.name}</div>
                <div class="metric-visual">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle class="metric-bg" cx="60" cy="60" r="54" fill="none" stroke="#2e3438" stroke-width="12"/>
                        <circle class="metric-progress" cx="60" cy="60" r="54" fill="none" stroke="${metric.color}" 
                                stroke-width="12" stroke-dasharray="339.292" stroke-dashoffset="339.292"
                                transform="rotate(-90, 60, 60)"/>
                    </svg>
                    <div class="metric-value">${metric.value}${metric.unit}</div>
                </div>
            `;
            container.appendChild(metricEl);
            
            // Store reference to progress circle
            metric.element = metricEl.querySelector('.metric-progress');
            metric.valueDisplay = metricEl.querySelector('.metric-value');
        });
    }
    
    // Update metrics with random values
    function updateMetrics() {
        metrics.forEach(metric => {
            // Generate realistic looking values that change gradually
            let change = (Math.random() - 0.5) * 10; // Random change between -5 and 5
            metric.value = Math.min(Math.max(metric.value + change, 0), metric.max);
            
            // Special case for uptime - always increases
            if (metric.name === 'Uptime') {
                metric.value = (metric.value + 0.01) % metric.max;
            }
            
            // Format the display value
            let displayValue;
            if (metric.name === 'Uptime') {
                displayValue = Math.floor(metric.value) + metric.unit;
            } else if (metric.name === 'Network Traffic') {
                displayValue = metric.value.toFixed(2) + metric.unit;
            } else {
                displayValue = Math.floor(metric.value) + metric.unit;
            }
            
            // Update the visual elements
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (metric.value / metric.max * circumference);
            
            metric.element.style.strokeDashoffset = offset;
            metric.valueDisplay.textContent = displayValue;
        });
    }
    
    createMetricsGauges();
    updateMetrics();
    
    // Update metrics every 2 seconds
    setInterval(updateMetrics, 2000);
});
