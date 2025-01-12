/// Crear el lienzo (canvas) dentro del div de fondo
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.space-background').appendChild(canvas);

// Configuración inicial del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array para las partículas
let particles = [];

// Función para generar partículas
function createParticles() {
    particles = []; // Reiniciar partículas existentes
    for (let i = 0; i < 150; i++) { // Número de partículas
        particles.push({
            x: Math.random() * canvas.width,  // Posición inicial X
            y: Math.random() * canvas.height, // Posición inicial Y
            radius: Math.random() * 2 + 1,    // Tamaño de la partícula
            speedX: Math.random() * 0.2 - 0.1, // Velocidad horizontal
            speedY: Math.random() * 0.2 - 0.1, // Velocidad vertical
            opacity: Math.random() * 0.5 + 0.5, // Opacidad inicial
        });
    }
}

// Dibujar las partículas
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    particles.forEach(particle => {
        ctx.fillStyle = `rgba(40, 40, 95, ${particle.opacity})`; // Color blanco translúcido
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); // Crear partícula
        ctx.fill();
    });
}

// Animar las partículas
function animateParticles() {
    particles.forEach(particle => {
        // Mover partículas
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Oscilar la opacidad para simular brillo
        particle.opacity += Math.random() * 0.02 - 0.01;
        if (particle.opacity > 1) particle.opacity = 1;
        if (particle.opacity < 0.5) particle.opacity = 0.5;

        // Reposicionar partículas si salen de los bordes
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
    });

    drawParticles(); // Redibujar partículas
    requestAnimationFrame(animateParticles); // Llamada recursiva
}
// Copiar Email
function copyEmail(event) {
    // Evitar el comportamiento predeterminado del enlace
    event.preventDefault();

    // El texto que deseas copiar
    const email = "mauchamps33@gmail.com";

    // Usar el API de portapapeles para copiar el texto
    navigator.clipboard.writeText(email).then(() => {
        alert("¡Correo copiado al portapapeles!");
    }).catch(err => {
        console.error("Error al copiar el correo: ", err);
        alert("Hubo un problema al copiar el correo. Por favor, intenta de nuevo.");
    });
}

// Ajustar el tamaño del lienzo al redimensionar la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles(); // Regenerar partículas
});

// Detectar el idioma del navegador
const language = userLanguage.startsWith('es') ? 'es' : 'en';

// Inicializar la animación
createParticles();
animateParticles();
