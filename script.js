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

    // Manejo de videos en lightbox
    const videoLinks = document.querySelectorAll('.project .button');
    const lightbox = document.getElementById('video-lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const iframe = document.getElementById('video');
    const close = document.querySelector('.close');
    const loader = document.getElementById('loader');

    // Función para cerrar el lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        if (iframe) {
            iframe.src = '';
        }
        document.body.style.overflow = 'auto';
    }

    // Función para abrir el lightbox
    function openLightbox(videoUrl) {
        if (iframe) {
            iframe.src = videoUrl;
        }
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = link.getAttribute('data-video');
            if (loader) {
                loader.style.display = 'block';
            }
            openLightbox(videoUrl);
        });
    });

    // Asegurarse de que el botón de cierre existe antes de agregar el evento
    if (close) {
        close.addEventListener('click', closeLightbox);
    }

    // Cerrar lightbox al hacer clic fuera del contenido
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Evitar que los clics dentro del contenido del lightbox lo cierren
    if (lightboxContent) {
        lightboxContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Cerrar lightbox al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // Manejo de imágenes de certificados en lightbox
    const certificateLinks = document.querySelectorAll('.certificate .buttonc');
    const imageLightbox = document.getElementById('image-lightbox');
    const imageLightboxContent = document.querySelector('#image-lightbox .lightbox-content');
    const imageContainer = document.getElementById('image-container');
    const imageClose = document.querySelector('#image-lightbox .close');
    

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

    certificateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = link.getAttribute('data-image');
            openImageLightbox(imageUrl);
        });
    });

    // Asegurarse de que el botón de cierre existe antes de agregar el evento
    if (imageClose) {
        imageClose.addEventListener('click', closeImageLightbox);
    }

    // Cerrar lightbox de imágenes al hacer clic fuera del contenido
    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeImageLightbox();
        }
    });

    // Evitar que los clics dentro del contenido del lightbox lo cierren
    if (imageLightboxContent) {
        imageLightboxContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Cerrar lightbox de imágenes al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageLightbox.style.display === 'flex') {
            closeImageLightbox();
        }
    });
    // Ocultar el loader cuando el video se haya cargado
    if (iframe) {
        iframe.addEventListener('load', () => {
            if (loader) {
                loader.style.display = 'none';
            }
        });
    }

    // Manejo de la sección de certificados
    const toggleCertificatesBtn = document.getElementById('toggle-certificates');
    const certificatesContent = document.getElementById('certificates-content');
    let certificatesVisible = false;

    if (toggleCertificatesBtn && certificatesContent) {
        toggleCertificatesBtn.addEventListener('click', () => {
            certificatesVisible = !certificatesVisible;
            if (certificatesVisible) {
                certificatesContent.style.display = 'grid';
                toggleCertificatesBtn.textContent = 'Ocultar Certificados';
                initializeAnimations();
            } else {
                certificatesContent.style.display = 'none';
                toggleCertificatesBtn.textContent = 'Mostrar Certificados';
            }
        });
    }

    // Inicialización de la animación para los nuevos elementos
    function initializeAnimations() {
        const newAnimatedElements = document.querySelectorAll('.certificate');
        newAnimatedElements.forEach(el => {
            el.classList.add('fade-in-up');
        });
    }
});