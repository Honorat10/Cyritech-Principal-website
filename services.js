
        // Fonction pour mettre à jour l'état actif de la navigation
        function updateActiveNavigation() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            
            // Trouve la section actuellement visible
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const navHeight = 120; // Hauteur approximative de la nav fixe
                
                if (rect.top <= navHeight && rect.bottom >= navHeight) {
                    currentSection = section.id;
                }
            });
            
            // Met à jour les classes des liens de navigation
            navLinks.forEach(link => {
                const sectionId = link.getAttribute('data-section');
                
                if (sectionId === currentSection) {
                    // État actif
                    link.classList.remove('bg-white');
                    link.classList.add('bg-cyri-blue-light', 'text-white');
                } else {
                    // État normal
                    link.classList.remove('bg-cyri-blue-light', 'text-white');
                    link.classList.add('bg-white');
                }
            });
        }
        
        // Écoute le scroll pour mettre à jour la navigation
        window.addEventListener('scroll', updateActiveNavigation);
        
        // Met à jour au chargement de la page
        document.addEventListener('DOMContentLoaded', function() {
            updateActiveNavigation();
            
            // Gestion du clic sur les liens pour un scroll smooth
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const navHeight = 120;
                        const targetPosition = targetSection.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
            const navbar = document.getElementById("navbar");
    
            window.addEventListener("scroll", function () {
                if (window.scrollY > 50) {
                    navbar.classList.remove("bg-transparent");
                    navbar.classList.add("bg-cyri-blue-dark", "text-white");
                } else {
                    navbar.classList.add("bg-transparent");
                    navbar.classList.remove("bg-cyri-blue-dark", "text-white");
                }
            });
        });

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});
