document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animación de entrada para los elementos
    const animatedElements = document.querySelectorAll('.project, #about, #portfolio h2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // Efecto de brillo en los botones sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = icon.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            icon.style.setProperty('--x', `${x * 100}%`);
            icon.style.setProperty('--y', `${y * 100}%`);
        });
    });

    // Efecto de parallax suave en el scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.body.style.backgroundPositionY = `-${scrolled * 0.1}px`;
    });

    // Variables para el manejo de certificados
    const toggleCertificatesBtn = document.getElementById('toggle-certificates');
    const certificatesContent = document.getElementById('certificates-content');
    let certificatesVisible = false;
    let currentLanguage = 'es';

    // Manejo de imágenes de certificados en lightbox
    const certificateLinks = document.querySelectorAll('.certificate .buttonc');
    const imageLightbox = document.getElementById('image-lightbox');
    const imageLightboxContent = document.querySelector('#image-lightbox .lightbox-content');
    const imageContainer = document.getElementById('image-container');
    const imageClose = document.querySelector('#image-lightbox .close');
    const loader = document.getElementById('loader');

    // Función para cerrar el lightbox de imágenes
    function closeImageLightbox() {
        imageLightbox.style.display = 'none';
        imageContainer.style.backgroundImage = '';
        document.body.style.overflow = 'auto';
    }

    // Función para abrir el lightbox de imágenes
    function openImageLightbox(imageUrl) {
        if (loader) {
            loader.style.display = 'block';
        }
        
        const img = new Image();
        img.onload = function() {
            imageContainer.style.backgroundImage = `url('${imageUrl}')`;
            imageLightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (loader) {
                loader.style.display = 'none';
            }
        };
        img.onerror = function() {
            console.error('Error al cargar la imagen');
            if (loader) {
                loader.style.display = 'none';
            }
        };
        img.src = imageUrl;
    }

    // Función para actualizar el texto del botón de certificados
    function updateCertificateButtonText() {
        if (certificatesVisible) {
            toggleCertificatesBtn.textContent = currentLanguage === 'es' ? 'Ocultar Certificados' : 'Hide Certificates';
        } else {
            toggleCertificatesBtn.textContent = currentLanguage === 'es' ? 'Mostrar Certificados' : 'Show Certificates';
        }
    }

    // Event listeners para certificados
    if (toggleCertificatesBtn && certificatesContent) {
        toggleCertificatesBtn.addEventListener('click', () => {
            certificatesVisible = !certificatesVisible;
            certificatesContent.style.display = certificatesVisible ? 'grid' : 'none';
            updateCertificateButtonText();
        });
    }

    // Event listeners para el lightbox
    certificateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = link.getAttribute('data-image');
            openImageLightbox(imageUrl);
        });
    });

    if (imageClose) {
        imageClose.addEventListener('click', closeImageLightbox);
    }

    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeImageLightbox();
        }
    });

    if (imageLightboxContent) {
        imageLightboxContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Cerrar lightbox con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageLightbox.style.display === 'flex') {
            closeImageLightbox();
        }
    });

    // Sistema de traducción
    const languageButton = document.getElementById('language-button');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('#language-dropdown button');

    // Cargar idioma guardado o usar español por defecto
    currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(currentLanguage);

    // Eventos del selector de idioma
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
    });

    // Manejar selección de idioma
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            currentLanguage = lang;
            changeLanguage(lang);
            languageDropdown.classList.remove('show');
            updateCertificateButtonText();
        });
    });

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Actualizar botón de idioma
        const currentLanguage = document.getElementById('current-language');
        const flagUrl = lang === 'es' 
            ? 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/es.svg'
            : 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg';
        
        currentLanguage.innerHTML = `<img src="${flagUrl}" alt="${lang === 'es' ? 'Español' : 'English'}" class="language-flag" />`;

        // Guardar preferencia
        localStorage.setItem('preferredLanguage', lang);
    }

    // Inicialización de animaciones para nuevos elementos
    function initializeAnimations() {
        const newAnimatedElements = document.querySelectorAll('.certificate');
        newAnimatedElements.forEach(el => {
            el.classList.add('fade-in-up');
        });
    }
});