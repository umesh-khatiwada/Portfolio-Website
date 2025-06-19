function toggleMaximize() {
    const cli = document.getElementById('interactive-cli');
    const mainContent = document.querySelector('main');
    
    cli.classList.toggle('cli-maximized');
    
    if (cli.classList.contains('cli-maximized')) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        cli.style.backgroundColor = '#000000';
        mainContent.style.filter = 'blur(5px)';
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        cli.style.backgroundColor = '';
        mainContent.style.filter = '';
    }
    
    const icon = document.querySelector('.maximize-btn i');
    icon.classList.toggle('bi-arrows-angle-expand');
    icon.classList.toggle('bi-arrows-angle-contract');
}

// Escape key to exit maximize mode
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const cli = document.getElementById('interactive-cli');
        if (cli.classList.contains('cli-maximized')) {
            toggleMaximize();
        }
    }
});
