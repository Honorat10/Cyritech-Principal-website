tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'jetbrains': ['JetBrains Mono', 'monospace'],
            },
            colors: {
                'cyri-blue-dark': '#1F2A44',
                'cyri-blue-light': '#3A8BCD',
                'cyri-red': '#B03031',
                'cyri-black': '#111111',
            }
        }
    }
}

        // 3D Server Animation with Three.js
        function init3DScene() {
            const container = document.getElementById('server-3d-container');
            const fallback = document.getElementById('server-fallback');
            
            // Check for mobile device and WebGL support
            const isMobile = window.innerWidth < 768;
            const hasWebGL = (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
                } catch (e) {
                    return false;
                }
            })();
            
            if (isMobile || !hasWebGL) {
                container.style.display = 'none';
                fallback.classList.remove('hidden');
                return;
            }
            
            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(400, 400);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            const pointLight = new THREE.PointLight(0x3A8BCD, 0.5);
            pointLight.position.set(0, 0, 5);
            scene.add(pointLight);
            
            // Create server rack
            const serverGroup = new THREE.Group();
            
            // Server rack frame
            const rackGeometry = new THREE.BoxGeometry(3, 4, 1.5);
            const rackMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x2a2a2a,
                transparent: true,
                opacity: 0.9
            });
            const rack = new THREE.Mesh(rackGeometry, rackMaterial);
            serverGroup.add(rack);
            
            // Server units (3 servers stacked)
            for (let i = 0; i < 3; i++) {
                const serverGeometry = new THREE.BoxGeometry(2.8, 0.8, 1.4);
                const serverMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x3A8BCD,
                    transparent: true,
                    opacity: 0.8
                });
                const server = new THREE.Mesh(serverGeometry, serverMaterial);
                server.position.y = 1.2 - (i * 1.2);
                serverGroup.add(server);
                
                // LED indicators
                for (let j = 0; j < 4; j++) {
                    const ledGeometry = new THREE.SphereGeometry(0.05);
                    const ledMaterial = new THREE.MeshBasicMaterial({ 
                        color: Math.random() > 0.5 ? 0x00ff00 : 0xff0000,
                        transparent: true,
                        opacity: 0.8
                    });
                    const led = new THREE.Mesh(ledGeometry, ledMaterial);
                    led.position.set(-1.2 + (j * 0.3), 1.2 - (i * 1.2), 0.75);
                    serverGroup.add(led);
                }
            }
            
            // Network cables
            for (let i = 0; i < 5; i++) {
                const cableGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1);
                const cableMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x333333
                });
                const cable = new THREE.Mesh(cableGeometry, cableMaterial);
                cable.position.set(1.2, -1.5, 0.5 - (i * 0.2));
                cable.rotation.x = Math.PI / 2;
                serverGroup.add(cable);
            }
            
            scene.add(serverGroup);
            camera.position.z = 8;
            
            // Animation variables
            let time = 0;
            let isHovered = false;
            
            // Mouse interaction
            container.addEventListener('mouseenter', () => {
                isHovered = true;
            });
            
            container.addEventListener('mouseleave', () => {
                isHovered = false;
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                time += 0.01;
                
                // Rotation
                serverGroup.rotation.y = Math.sin(time * 0.3) * 0.2;
                serverGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
                
                // Floating
                serverGroup.position.y = Math.sin(time) * 0.2;
                
                // Hover scale effect
                const targetScale = isHovered ? 1.1 : 1;
                serverGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
                
                // Animate LED lights
                serverGroup.children.forEach((child, index) => {
                    if (child.material && child.material.color && index > 3) {
                        child.material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3;
                    }
                });
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Resize handler
            window.addEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    container.style.display = 'none';
                    fallback.classList.remove('hidden');
                }
            });
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const navbarLinks = document.querySelectorAll('.navbar-link');
            const mobileBtn = document.querySelector('.navbar-mobile-btn');
            
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
                // Change links to white when scrolled
                navbarLinks.forEach(link => {
                    link.classList.remove('text-black');
                    link.classList.add('text-white');
                });
                if (mobileBtn) {
                    mobileBtn.classList.remove('text-black');
                    mobileBtn.classList.add('text-white');
                }
            } else {
                navbar.classList.remove('navbar-scrolled');
                // Change links to black when at top
                navbarLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-black');
                });
                if (mobileBtn) {
                    mobileBtn.classList.remove('text-white');
                    mobileBtn.classList.add('text-black');
                }
            }
        });
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
        
        // Testimonial carousel
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('#testimonial-track > div');
        const track = document.getElementById('testimonial-track');
        
        function updateTestimonial() {
            track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }
        
        document.getElementById('next-testimonial').addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });
        
        document.getElementById('prev-testimonial').addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
        
        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
        
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
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            init3DScene();
        });
