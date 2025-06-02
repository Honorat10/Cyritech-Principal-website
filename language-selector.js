
// Système de gestion des langues
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Navigation
                'nav.home': 'Accueil',
                'nav.about': 'À propos',
                'nav.services': 'Services',
                'nav.contact': 'Contact',
                'nav.audit': 'Audit Gratuit',
                
                // Services page
                'hero.title': 'Nos Services',
                'hero.subtitle': 'Solutions informatiques complètes pour transformer votre entreprise',
                'services.title': 'Nos Services',
                'service.audit.title': 'Audit Informatique',
                'service.audit.desc': 'Évaluation complète de votre infrastructure IT pour identifier les points d\'amélioration et optimiser vos performances.',
                'service.web.title': 'Développement Web',
                'service.web.desc': 'Création de sites web et applications web modernes, responsive et optimisées pour le référencement.',
                'service.digital.title': 'Transformation Digitale',
                'service.digital.desc': 'Accompagnement stratégique pour moderniser vos processus et adopter les technologies innovantes.',
                'service.security.title': 'Sécurité Informatique',
                'service.security.desc': 'Protection avancée de vos données et systèmes contre les menaces cybernétiques.',
                'service.cloud.title': 'Infrastructure Cloud',
                'service.cloud.desc': 'Migration et gestion d\'infrastructures cloud sécurisées pour optimiser vos coûts et performances.',
                'service.support.title': 'Support Technique',
                'service.support.desc': 'Assistance technique 24/7 pour maintenir vos systèmes opérationnels et résoudre rapidement les incidents.',
                
                // Footer
                'footer.company': 'CYRI GROUP',
                'footer.tagline': 'Votre partenaire technologique de confiance pour transformer votre entreprise.',
                'footer.services': 'Services',
                'footer.offices': 'Nos Bureaux',
                'footer.contact': 'Contact',
                'footer.copyright': '© 2024 CYRI GROUP. Tous droits réservés.'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.contact': 'Contact',
                'nav.audit': 'Free Audit',
                
                // Services page
                'hero.title': 'Our Services',
                'hero.subtitle': 'Complete IT solutions to transform your business',
                'services.title': 'Our Services',
                'service.audit.title': 'IT Audit',
                'service.audit.desc': 'Complete evaluation of your IT infrastructure to identify improvement points and optimize your performance.',
                'service.web.title': 'Web Development',
                'service.web.desc': 'Creation of modern, responsive websites and web applications optimized for SEO.',
                'service.digital.title': 'Digital Transformation',
                'service.digital.desc': 'Strategic support to modernize your processes and adopt innovative technologies.',
                'service.security.title': 'IT Security',
                'service.security.desc': 'Advanced protection of your data and systems against cyber threats.',
                'service.cloud.title': 'Cloud Infrastructure',
                'service.cloud.desc': 'Migration and management of secure cloud infrastructures to optimize your costs and performance.',
                'service.support.title': 'Technical Support',
                'service.support.desc': '24/7 technical assistance to keep your systems operational and quickly resolve incidents.',
                
                // Footer
                'footer.company': 'CYRI GROUP',
                'footer.tagline': 'Your trusted technology partner to transform your business.',
                'footer.services': 'Services',
                'footer.offices': 'Our Offices',
                'footer.contact': 'Contact',
                'footer.copyright': '© 2024 CYRI GROUP. All rights reserved.'
            },
            zh: {
                // Navigation
                'nav.home': '首页',
                'nav.about': '关于我们',
                'nav.services': '服务',
                'nav.contact': '联系我们',
                'nav.audit': '免费审计',
                
                // Services page
                'hero.title': '我们的服务',
                'hero.subtitle': '完整的IT解决方案，助力企业数字化转型',
                'services.title': '我们的服务',
                'service.audit.title': 'IT审计',
                'service.audit.desc': '全面评估您的IT基础设施，识别改进点并优化性能。',
                'service.web.title': '网站开发',
                'service.web.desc': '创建现代化、响应式网站和网络应用程序，优化SEO。',
                'service.digital.title': '数字化转型',
                'service.digital.desc': '战略性支持，帮助您现代化流程并采用创新技术。',
                'service.security.title': 'IT安全',
                'service.security.desc': '高级数据和系统保护，抵御网络威胁。',
                'service.cloud.title': '云基础设施',
                'service.cloud.desc': '迁移和管理安全的云基础设施，优化成本和性能。',
                'service.support.title': '技术支持',
                'service.support.desc': '24/7技术支持，保持系统运行并快速解决问题。',
                
                // Footer
                'footer.company': 'CYRI GROUP',
                'footer.tagline': '您值得信赖的技术合作伙伴，助力企业转型。',
                'footer.services': '服务',
                'footer.offices': '我们的办公室',
                'footer.contact': '联系方式',
                'footer.copyright': '© 2024 CYRI GROUP. 版权所有。'
            }
        };
        
        this.flags = {
            fr: '🇫🇷',
            en: '🇬🇧',
            zh: '🇨🇳'
        };
        
        this.languageNames = {
            fr: 'Français',
            en: 'English',
            zh: '中文'
        };
    }
    
    init() {
        this.createLanguageSelector();
        this.translatePage();
        this.bindEvents();
    }
    
    createLanguageSelector() {
        // Trouve tous les éléments avec la classe language-selector-placeholder
        const placeholders = document.querySelectorAll('.language-selector-placeholder');
        
        placeholders.forEach(placeholder => {
            const isDesktop = placeholder.classList.contains('desktop');
            
            if (isDesktop) {
                // Version desktop
                placeholder.innerHTML = `
                    <div class="relative">
                        <button id="language-dropdown-btn-${Math.random().toString(36).substr(2, 9)}" class="language-dropdown-btn navbar-link text-white hover:text-cyri-blue-light transition-colors flex items-center space-x-2">
                            <span class="text-lg">${this.flags[this.currentLanguage]}</span>
                            <span>${this.currentLanguage.toUpperCase()}</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="language-dropdown absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border hidden z-50">
                            <a href="#" class="language-option block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg flex items-center space-x-2" data-lang="fr">
                                <span class="text-sm">${this.flags.fr}</span>
                                <span class="text-sm">Français</span>
                            </a>
                            <a href="#" class="language-option block px-3 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2" data-lang="en">
                                <span class="text-sm">${this.flags.en}</span>
                                <span class="text-sm">English</span>
                            </a>
                            <a href="#" class="language-option block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg flex items-center space-x-2" data-lang="zh">
                                <span class="text-sm">${this.flags.zh}</span>
                                <span class="text-sm">中文</span>
                            </a>
                        </div>
                    </div>
                `;
            } else {
                // Version mobile
                placeholder.innerHTML = `
                    <div class="px-3 py-2 border-t border-gray-200">
                        <div class="text-sm text-gray-500 mb-2" data-translate="nav.language">Langue</div>
                        <div class="flex space-x-3">
                            <a href="#" class="language-option flex items-center space-x-1 ${this.currentLanguage === 'fr' ? 'text-cyri-blue-dark font-semibold' : 'text-gray-700 hover:text-cyri-blue-light'}" data-lang="fr">
                                <span>${this.flags.fr}</span>
                                <span class="text-sm">FR</span>
                            </a>
                            <a href="#" class="language-option flex items-center space-x-1 ${this.currentLanguage === 'en' ? 'text-cyri-blue-dark font-semibold' : 'text-gray-700 hover:text-cyri-blue-light'}" data-lang="en">
                                <span>${this.flags.en}</span>
                                <span class="text-sm">EN</span>
                            </a>
                            <a href="#" class="language-option flex items-center space-x-1 ${this.currentLanguage === 'zh' ? 'text-cyri-blue-dark font-semibold' : 'text-gray-700 hover:text-cyri-blue-light'}" data-lang="zh">
                                <span>${this.flags.zh}</span>
                                <span class="text-sm">中文</span>
                            </a>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    bindEvents() {
        // Événements pour les boutons dropdown desktop
        document.addEventListener('click', (e) => {
            // Toggle dropdown
            if (e.target.closest('.language-dropdown-btn')) {
                e.preventDefault();
                const dropdown = e.target.closest('.relative').querySelector('.language-dropdown');
                dropdown.classList.toggle('hidden');
            }
            // Fermer dropdown si on clique ailleurs
            else if (!e.target.closest('.language-dropdown')) {
                document.querySelectorAll('.language-dropdown').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
            }
            
            // Changement de langue
            if (e.target.closest('.language-option')) {
                e.preventDefault();
                const lang = e.target.closest('.language-option').getAttribute('data-lang');
                this.changeLanguage(lang);
            }
        });
    }
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.translatePage();
        this.updateLanguageSelector();
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });
    }
    
    updateLanguageSelector() {
        // Met à jour tous les sélecteurs de langue
        document.querySelectorAll('.language-dropdown-btn span:nth-child(2)').forEach(span => {
            span.textContent = this.currentLanguage.toUpperCase();
        });
        
        document.querySelectorAll('.language-dropdown-btn span:first-child').forEach(span => {
            span.textContent = this.flags[this.currentLanguage];
        });
        
        // Met à jour les styles pour la version mobile
        document.querySelectorAll('.language-option').forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.className = option.className.replace(/text-cyri-blue-dark font-semibold|text-gray-700 hover:text-cyri-blue-light/g, '');
            
            if (lang === this.currentLanguage) {
                option.classList.add('text-cyri-blue-dark', 'font-semibold');
            } else {
                option.classList.add('text-gray-700', 'hover:text-cyri-blue-light');
            }
        });
        
        // Ferme tous les dropdowns
        document.querySelectorAll('.language-dropdown').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();
    languageManager.init();
});
