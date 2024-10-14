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