// Tech icons interaction script
document.addEventListener('DOMContentLoaded', function() {
  const techIcons = document.querySelectorAll('.tech-icon');
  const tooltip = document.getElementById('tooltip');
  
  if (!techIcons.length || !tooltip) {
    console.log("Tech icons or tooltip not found");
    return;
  }
  
  // Click animation for tech icons
  techIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      if (!this.classList.contains('animating')) {
        // Get all icons and reset them
        techIcons.forEach(i => {
          i.style.filter = "";
          i.style.transform = "";
          i.classList.remove('active-icon');
        });
        
        // Highlight this icon
        this.classList.add('animating', 'active-icon');
        this.style.transform = 'scale(1.8) rotate(360deg)';
        
        // Dim other icons
        techIcons.forEach(i => {
          if (i !== this) {
            i.style.filter = "brightness(0.5)";
          }
        });
        
        // Reset after animation
        setTimeout(() => {
          this.style.transform = 'scale(1.2)';
          
          // After a longer delay, fully reset
          setTimeout(() => {
            techIcons.forEach(i => {
              i.style.filter = "";
              if (i !== this) {
                i.style.transform = "";
              }
            });
            this.classList.remove('animating');
          }, 2000);
        }, 700);
      }
    });
    
    // Tooltip behavior
    icon.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      const description = this.getAttribute('data-tooltip');
      tooltip.textContent = `${title} - ${description}`;
      tooltip.style.opacity = '1';
    });
    
    icon.addEventListener('mouseleave', function() {
      tooltip.style.opacity = '0';
    });
    
    // Interactive connection visualization
    icon.addEventListener('mouseover', function() {
      // Create a connection effect between related icons
      const thisIcon = this;
      const iconType = this.className;
      
      // Find related icons based on DevOps categories
      let relatedIcons = [];
      
      if (iconType.includes('jenkins') || iconType.includes('github') || iconType.includes('cicd')) {
        // CI/CD related
        relatedIcons = Array.from(techIcons).filter(i => 
          i.className.includes('jenkins') || 
          i.className.includes('github') || 
          i.className.includes('cicd') ||
          i.className.includes('git'));
      } else if (iconType.includes('kubernetes') || iconType.includes('docker') || iconType.includes('aws')) {
        // Infrastructure related
        relatedIcons = Array.from(techIcons).filter(i => 
          i.className.includes('kubernetes') || 
          i.className.includes('docker') || 
          i.className.includes('aws') ||
          i.className.includes('infra'));
      } else if (iconType.includes('python') || iconType.includes('shell')) {
        // Code related
        relatedIcons = Array.from(techIcons).filter(i => 
          i.className.includes('python') || 
          i.className.includes('shell') || 
          i.className.includes('git'));
      }
      
      // Highlight related icons
      relatedIcons.forEach(icon => {
        if (icon !== thisIcon) {
          icon.style.filter = "brightness(1.2) drop-shadow(0 0 8px currentColor)";
          icon.style.transform = "scale(1.1)";
        }
      });
    });
    
    icon.addEventListener('mouseout', function() {
      // Reset all icons to normal
      techIcons.forEach(icon => {
        if (!icon.classList.contains('active-icon')) {
          icon.style.filter = "";
          icon.style.transform = "";
        }
      });
    });
  });
  
  // Simulate a click on a random icon every few seconds
  function randomIconEffect() {
    if (document.visibilityState === 'visible') {
      const icons = Array.from(techIcons);
      if (icons.length > 0) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        // Only animate if no icon is currently being animated
        if (!document.querySelector('.tech-icon.animating')) {
          randomIcon.style.transform = 'scale(1.3)';
          randomIcon.style.filter = 'brightness(1.3) drop-shadow(0 0 5px currentColor)';
          
          setTimeout(() => {
            randomIcon.style.transform = '';
            randomIcon.style.filter = '';
          }, 1000);
        }
      }
    }
    
    // Schedule next animation
    setTimeout(randomIconEffect, 5000 + Math.random() * 5000);
  }
  
  // Start the random highlighting after a delay
  setTimeout(randomIconEffect, 3000);
});
