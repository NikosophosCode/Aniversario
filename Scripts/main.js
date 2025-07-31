// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeFloatingHearts();
    initializeScrollAnimations();
    initializeHiddenMessages();
    initializeKeyboardSecrets();
    initializeMusicControls();
    initializeVideoControls();
});

// ===== CONTROL DE VIDEOS =====
function initializeVideoControls() {
    const videos = document.querySelectorAll('.video-container video');
    
    videos.forEach((video, index) => {
        // Configurar video para autoplay silencioso
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Agregar eventos para controlar reproducción
        video.addEventListener('click', function(e) {
            e.preventDefault();
            toggleVideoPlay(this);
        });
        
        // Reproducir automáticamente cuando esté visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(e => console.log('Autoplay prevented'));
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
        
        // Agregar efectos de hover
        const container = video.closest('.video-container');
        const playOverlay = container.querySelector('.video-play-overlay');
        
        video.addEventListener('mouseenter', () => {
            if (video.paused) {
                playOverlay.style.opacity = '1';
            }
        });
        
        video.addEventListener('mouseleave', () => {
            playOverlay.style.opacity = '0';
        });
        
        // Cambiar ícono según estado de reproducción
        video.addEventListener('play', () => {
            playOverlay.innerHTML = '<i class="fas fa-pause"></i>';
            container.classList.add('playing');
        });
        
        video.addEventListener('pause', () => {
            playOverlay.innerHTML = '<i class="fas fa-play"></i>';
            container.classList.remove('playing');
        });
    });
}

function toggleVideoPlay(video) {
    const container = video.closest('.video-container');
    const playOverlay = container.querySelector('.video-play-overlay');
    
    if (video.paused) {
        // Pausar otros videos que puedan estar reproduciéndose
        document.querySelectorAll('.video-container video').forEach(v => {
            if (v !== video && !v.paused) {
                v.pause();
            }
        });
        
        video.play().then(() => {
            playOverlay.innerHTML = '<i class="fas fa-pause"></i>';
            
            // Reducir volumen de música de fondo si está sonando
            if (isPlaying && backgroundMusic) {
                backgroundMusic.volume = 0.1;
            }
        }).catch(e => {
            console.log('Error reproduciendo video:', e);
        });
    } else {
        video.pause();
        playOverlay.innerHTML = '<i class="fas fa-play"></i>';
        
        // Restaurar volumen de música de fondo
        if (isPlaying && backgroundMusic) {
            backgroundMusic.volume = 0.3;
        }
    }
}

// ===== CONTROL DE MÚSICA =====
let isPlaying = false;
let backgroundMusic = null;

function initializeMusicControls() {
    backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicStatus = document.getElementById('music-status');
    
    // Configurar volumen inicial
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
        
        // Eventos del reproductor
        backgroundMusic.addEventListener('loadstart', () => {
            musicStatus.textContent = 'Cargando canción...';
        });
        
        backgroundMusic.addEventListener('canplay', () => {
            musicStatus.textContent = 'Haz clic para escuchar nuestra canción ♪';
        });
        
        backgroundMusic.addEventListener('error', () => {
            musicStatus.textContent = 'Agrega tu canción favorita en assets/audio/love-song.mp3';
        });
    }
}

function toggleMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const musicStatus = document.getElementById('music-status');
    
    if (!backgroundMusic) return;
    
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.remove('playing');
        musicStatus.textContent = 'Música pausada - Haz clic para continuar';
        isPlaying = false;
    } else {
        // Intentar reproducir música
        backgroundMusic.play().then(() => {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            musicStatus.textContent = '♪ Sonando nuestra canción ♪';
            isPlaying = true;
        }).catch(error => {
            console.log('Error al reproducir música:', error);
            musicStatus.textContent = 'Haz clic para permitir reproducción';
        });
    }
}

// ===== MENSAJES OCULTOS =====
function initializeHiddenMessages() {
    // Mensajes que aparecen al hacer clic en el título
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', () => {
            showHiddenMessage('¡Sorpresa! 💕', '¡Cada vez que veo tu sonrisa, mi corazón late más fuerte! 💖', mainTitle);
        });
        mainTitle.style.cursor = 'pointer';
    }
    
    // Mensajes que aparecen al hacer hover en items del timeline
    // const timelineItems = document.querySelectorAll('.timeline-item');
    // timelineItems.forEach((item, index) => {
    //     const messages = [
    //         'Cada momento contigo es un tesoro que guardo en mi corazón ✨',
    //         'Quiero crear millones de recuerdos más contigo 💕',
    //         'Eres mi compañero de aventuras favorito 🌟',
    //         'Cada día a tu lado es mejor que el anterior ❤️'
    //     ];
        
    //     item.addEventListener('mouseenter', () => {
    //         showHiddenMessage('Mensaje secreto 💖', messages[index] || messages[0], item);
    //     });
    // });
    
    // Mensajes que aparecen al hacer doble clic en fotos
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const messages = [
            'Las fotos no capturan toda la felicidad que siento contigo 😊',
            'Cada imagen cuenta una historia de amor única 📸',
            'Eres la razón por la que sonrío todos los días ☀️',
            'Nuestros recuerdos son mi tesoro más preciado 💎',
            'En cada foto veo lo perfectos que somos juntos 💑',
            'Quiero llenar mil álbumes más con nuestras aventuras 📚'
        ];
        
        item.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showHiddenMessage('¡Sorpresa! 🎉', messages[index] || messages[0], item);
        });
    });
}

function showHiddenMessage(title, message, element) {
    // Crear mensaje temporal
    const hiddenMessage = document.createElement('div');
    hiddenMessage.className = 'hidden-message';
    hiddenMessage.innerHTML = `
        <h4 style="margin: 0 0 10px 0; font-size: 1.1rem;">${title}</h4>
        <p class="message-text">${message}</p>
    `;
    
    // Posicionar cerca del elemento
    const rect = element.getBoundingClientRect();
    hiddenMessage.style.left = Math.min(rect.left, window.innerWidth - 320) + 'px';
    hiddenMessage.style.top = (rect.top - 100) + 'px';
    
    document.body.appendChild(hiddenMessage);
    
    // Mostrar mensaje
    setTimeout(() => {
        hiddenMessage.classList.add('show');
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        hiddenMessage.classList.remove('show');
        setTimeout(() => {
            if (hiddenMessage.parentNode) {
                hiddenMessage.parentNode.removeChild(hiddenMessage);
            }
        }, 500);
    }, 4000);
}

// ===== MENSAJES SECRETOS POR TECLADO =====
let keySequence = '';
const secretCodes = {
    'amor': '¡Has encontrado el código del amor! 💕 Eres la persona más especial en mi vida y cada día me enamoro más de ti.',
    'beso': '💋 Un beso virtual para ti, mi amor. Que este mensaje te llegue con todo el cariño que siento por ti.',
    'forever': '♾️ Para siempre y un día más. Esa es la promesa que te hago hoy y todos los días de mi vida.',
    'corazon': '❤️ Mi corazón te pertenece completamente. Cada latido lleva tu nombre grabado.',
    'estrella': '⭐ Eres mi estrella guía, la luz que ilumina mis días más oscuros y la razón de mi felicidad.',
    'luna': '🌙 Como la luna y las estrellas, nuestro amor brillará por toda la eternidad.',
    'sol': '☀️ Eres mi sol, traes luz y calor a cada rincón de mi mundo.',
    'cielo': '☁️ Contigo he tocado el cielo y he descubierto que el paraíso existe.',
    'angel': '👼 Eres mi ángel guardián, mi protector y mi mayor bendición.',
    'bombon': 'Quiero crear millones de recuerdos más contigo ✨'
};

function initializeKeyboardSecrets() {
    document.addEventListener('keydown', function(e) {
        // Ignorar si hay un modal abierto
        if (document.getElementById('secretMessage').style.display === 'flex' ||
            document.getElementById('secret-keyboard-message').style.display === 'flex') {
            return;
        }
        
        keySequence += e.key.toLowerCase();
        
        // Mantener solo los últimos 10 caracteres
        if (keySequence.length > 10) {
            keySequence = keySequence.slice(-10);
        }
        
        // Verificar códigos secretos
        for (const [code, message] of Object.entries(secretCodes)) {
            if (keySequence.includes(code)) {
                showKeyboardMessage(message);
                keySequence = '';
                break;
            }
        }
        
        // Limpiar secuencia después de 3 segundos sin teclear
        setTimeout(() => {
            keySequence = '';
        }, 3000);
    });
}

function showKeyboardMessage(message) {
    const messageEl = document.getElementById('secret-keyboard-message');
    const textEl = document.getElementById('keyboard-message-text');
    
    textEl.textContent = message;
    messageEl.style.display = 'flex';
    
    // Crear explosión de corazones
    createHeartBurst();
    
    // Cambiar música si está sonando
    if (isPlaying && backgroundMusic) {
        backgroundMusic.volume = 0.1;
        setTimeout(() => {
            if (backgroundMusic) backgroundMusic.volume = 0.3;
        }, 3000);
    }
}

function closeKeyboardMessage() {
    const messageEl = document.getElementById('secret-keyboard-message');
    messageEl.style.display = 'none';
}

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
