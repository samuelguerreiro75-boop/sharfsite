/* =========================================
   PARTE 1: EFEITO DE MÁQUINA DE ESCREVER
========================================= */
const texto = "Quer começar a xitar no FiveM com nossos mod menu?, acesse noso discord logo abaixo 👇";
const elementoTexto = document.getElementById("texto-terminal");
let index = 0;

function digitarTexto() {
    if (index < texto.length) {
        elementoTexto.innerHTML += texto.charAt(index);
        index++;
        setTimeout(digitarTexto, 50); 
    }
}

/* =========================================
   PARTE 2: SISTEMA DE PARTÍCULAS FUTURISTA
========================================= */
const canvas = document.getElementById('canvas-particulas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let arrayParticulas = [];
const numeroDeParticulas = 100;

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; 
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = '#ffffff'; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

function initParticulas() {
    for (let i = 0; i < numeroDeParticulas; i++) {
        arrayParticulas.push(new Particula());
    }
}

function animarParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    for (let i = 0; i < arrayParticulas.length; i++) {
        arrayParticulas[i].update();
        arrayParticulas[i].draw();
    }
    requestAnimationFrame(animarParticulas);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* =========================================
   PARTE 3: EFEITO TILT 3D NA CAIXA
========================================= */
function initTilt() {
    const container = document.querySelector('.container');

    // Quando o mouse se move dentro da caixa
    container.addEventListener('mousemove', (e) => {
        // Pega as dimensões e posição da caixa
        const box = container.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        
        // Calcula a força da inclinação (ajuste o '15' para mais ou menos inclinação)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        // Aplica o 3D
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Quando o mouse sai da caixa, volta suavemente para o centro
    container.addEventListener('mouseleave', () => {
        container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        container.style.transition = 'transform 0.5s ease'; 
    });

    // Quando o mouse entra, tira a transição para seguir o mouse rápido
    container.addEventListener('mouseenter', () => {
        container.style.transition = 'none'; 
    });
}

/* =========================================
   INICIALIZAÇÃO GERAL
========================================= */
window.onload = function() {
    digitarTexto(); 
    initParticulas(); 
    animarParticulas(); 
    initTilt(); // Inicia o efeito 3D
};