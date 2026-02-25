// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '16px 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Simplified mobile menu for now
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            headerActions.style.display = headerActions.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-header');

    accordionItems.forEach(item => {
        item.addEventListener('click', function () {
            const parent = this.parentElement;
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // If already active, just close it
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                content.style.display = 'none';
                icon.className = 'fa-solid fa-chevron-down';
            } else {
                // Close all others
                document.querySelectorAll('.accordion-item').forEach(acc => {
                    acc.classList.remove('active');
                    acc.querySelector('.accordion-content').style.display = 'none';
                    acc.querySelector('i').className = 'fa-solid fa-chevron-down';
                });

                // Open this one
                parent.classList.add('active');
                content.style.display = 'block';
                icon.className = 'fa-solid fa-chevron-up';
            }
        });
    });
});
