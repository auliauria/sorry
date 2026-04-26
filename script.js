const forgiveBtn = document.getElementById('forgiveBtn');
const noBtn = document.getElementById('noBtn');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

const messages = [
  "I promise I'll never test you again 🥺",
  "Te amo más que a nada en este mundo 💕",
  "You're my Mexican prince ✨",
  "My heart beats only for you ❤️",
  "Sorry for being silly... but I'm your silly 💗",
  "Forgive me? Pretty please with hearts on top? 🥹",
  "Te extraño mucho mi amor..."
];

// Canvas Confetti
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 16 + 10;
    this.speed = Math.random() * 3.5 + 2.5;
    this.color = ['#ff4d94', '#ff80ab', '#ff69b4', '#ffb6c1'][Math.floor(Math.random() * 4)];
  }
  
  update() {
    this.y += this.speed;
    if (this.y > confettiCanvas.height + 50) this.y = -50;
  }
  
  draw() {
    ctx.save();
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillText('💗', this.x, this.y);
    ctx.restore();
  }
}

function createConfetti() {
  for (let i = 0; i < 110; i++) {
    particles.push(new Particle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.y > confettiCanvas.height) particles.splice(i, 1);
  }
  requestAnimationFrame(animateConfetti);
}

// Floating Message yang lebih baik (tidak mudah tumpuk)
function createFloatingMessage() {
  const msg = document.createElement('div');
  msg.className = 'floating-msg';
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];

  // Posisi lebih acak dan responsive
  const leftPos = 10 + Math.random() * 75;
  msg.style.left = `${leftPos}vw`;
  msg.style.top = '105%';
  
  // Durasi berbeda agar tidak bertumpuk
  const duration = 7 + Math.random() * 6;
  msg.style.animationDuration = `${duration}s`;

  document.body.appendChild(msg);

  setTimeout(() => {
    if (msg.parentNode) msg.parentNode.removeChild(msg);
  }, duration * 1000 + 500);
}

// Tombol (dengan console log untuk debugging)
forgiveBtn.addEventListener('click', () => {
  console.log('Forgive button clicked!'); // untuk cek apakah event jalan
  createConfetti();
  
  for (let i = 0; i < 16; i++) {
    setTimeout(createFloatingMessage, i * 160);
  }

  alert("Yayyy! Thank you my love! 💖\nTe amo mucho Angel! Now come give me a virtual hug 🥰");
});

noBtn.addEventListener('click', () => {
  console.log('No button clicked!');
  const messagesNo = ["Please... 🥺", "I'm really sorryyy", "Don't be mad at me..."];
  noBtn.textContent = messagesNo[Math.floor(Math.random() * messagesNo.length)];
  noBtn.style.background = '#ff4d94';
  noBtn.style.color = 'white';
});

noBtn.addEventListener('mouseover', () => {
  const x = Math.random() * 140 - 70;
  const y = Math.random() * 70 - 35;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Start
animateConfetti();
setInterval(createFloatingMessage, 2500);   // interval lebih longgar

// Initial messages
setTimeout(() => {
  for (let i = 0; i < 7; i++) {
    setTimeout(createFloatingMessage, i * 400);
  }
}, 800);