
        class LogosCarousel {
            constructor() {
                this.carousel = document.getElementById('logos-carousel');
                this.indicators = document.querySelectorAll('.indicator');
                this.prevBtn = document.getElementById('prev-logos');
                this.nextBtn = document.getElementById('next-logos');
                this.currentSlide = 0;
                this.totalSlides = 3;
                this.autoSlideInterval = null;
                
                this.init();
            }
            
            init() {
                // Event listeners pour les boutons
                this.prevBtn.addEventListener('click', () => {
                    this.stopAutoSlide();
                    this.previousSlide();
                    this.startAutoSlide();
                });
                
                this.nextBtn.addEventListener('click', () => {
                    this.stopAutoSlide();
                    this.nextSlide();
                    this.startAutoSlide();
                });
                
                // Event listeners pour les indicateurs
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        this.stopAutoSlide();
                        this.goToSlide(index);
                        this.startAutoSlide();
                    });
                });
                
                // Démarrer le défilement automatique
                this.startAutoSlide();
                
                // Pause au survol
                this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
            }
            
            updateCarousel() {
                const translateX = -this.currentSlide * 100;
                this.carousel.style.transform = `translateX(${translateX}%)`;
                
                // Mettre à jour les indicateurs
                this.indicators.forEach((indicator, index) => {
                    if (index === this.currentSlide) {
                        indicator.classList.add('active', 'bg-cyri-blue-light');
                        indicator.classList.remove('bg-gray-300');
                    } else {
                        indicator.classList.remove('active', 'bg-cyri-blue-light');
                        indicator.classList.add('bg-gray-300');
                    }
                });
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }
            
            previousSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }
            
            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }
            
            startAutoSlide() {
                this.stopAutoSlide();
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000); // Change toutes les 4 secondes
            }
            
            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
        }
        
        // Initialiser le carousel
        document.addEventListener('DOMContentLoaded', () => {
            new LogosCarousel();
        });
