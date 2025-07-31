// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeFloatingHearts();
    initializeScrollAnimations();
});

// ===== FUNCIÓN PARA MOSTRAR MENSAJE SECRETO =====
function showMessage() {
    const secretMessage = document.getElementById('secretMessage');
    secretMessage.style.display = 'flex';
    
    // Crear más corazones flotantes al hacer clic
    createHeartBurst();
    
    // Cerrar mensaje al hacer clic fuera del contenido
    secretMessage.addEventListener('click', function(e) {
        if (e.target === secretMessage) {
            secretMessage.style.display = 'none';
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            secretMessage.style.display = 'none';
        }
    });
}

// ===== SISTEMA DE PARTÍCULAS =====
function initializeParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Duración de animación aleatoria
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Recrear partícula cuando termine la animación
    particle.addEventListener('animationiteration', () => {
        particle.style.left = Math.random() * 100 + '%';
    });
}

// ===== CORAZONES FLOTANTES =====
function initializeFloatingHearts() {
    setInterval(createFloatingHeart, 3000);
}

function createFloatingHeart() {
    const container = document.getElementById('floating-hearts');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    
    // Posición inicial aleatoria en el eje X
    heart.style.left = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 15 + 15;
    heart.style.fontSize = size + 'px';
    
    // Duración aleatoria
    const duration = Math.random() * 4 + 6;
    heart.style.animationDuration = duration + 's';
    
    container.appendChild(heart);
    
    // Eliminar corazón después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, duration * 1000);
}

// ===== EXPLOSIÓN DE CORAZONES =====
function createHeartBurst() {
    const burstCount = 15;
    const container = document.getElementById('floating-hearts');
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            
            const angle = (360 / burstCount) * i;
            const distance = 200;
            const radian = (angle * Math.PI) / 180;
            
            heart.style.animation = `heartBurst 2s ease-out forwards`;
            heart.style.setProperty('--angle', angle + 'deg');
            heart.style.setProperty('--distance', distance + 'px');
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// ===== FUNCIONES DE LA GALERÍA =====
function openModal(imageSrc) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos del timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = (index * 0.2) + 's';
        observer.observe(item);
    });
    
    // Observar elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(item);
    });
}

// ===== EFECTOS DEL CURSOR =====
document.addEventListener('mousemove', function(e) {
    // Crear pequeñas partículas que sigan el cursor ocasionalmente
    if (Math.random() < 0.1) {
        createCursorParticle(e.clientX, e.clientY);
    }
});

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#ff69b4';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.animation = 'cursorParticle 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

// ===== EVENTOS DEL TECLADO =====
document.addEventListener('keydown', function(e) {
    // Easter egg: presionar 'L' para crear corazones
    if (e.key.toLowerCase() === 'l') {
        createHeartBurst();
    }
    
    // Presionar 'H' para crear más corazones flotantes
    if (e.key.toLowerCase() === 'h') {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFloatingHeart(), i * 200);
        }
    }
});

// ===== ESTILOS CSS DINÁMICOS =====
const dynamicStyles = `
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + var(--distance) * cos(var(--angle))), 
                calc(-50% + var(--distance) * sin(var(--angle)))
            ) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes cursorParticle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;

// Agregar estilos dinámicos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ===== FUNCIONES DE UTILIDAD =====

// Función para generar colores aleatorios en el tema rosa
function getRandomPinkColor() {
    const pinkColors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6347', '#ffc0cb'];
    return pinkColors[Math.floor(Math.random() * pinkColors.length)];
}

// Función para suavizar el scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle para eventos que se ejecutan frecuentemente
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Aplicar throttle a eventos costosos
const throttledMouseMove = throttle(function(e) {
    if (Math.random() < 0.05) {
        createCursorParticle(e.clientX, e.clientY);
    }
}, 100);

document.addEventListener('mousemove', throttledMouseMove);
