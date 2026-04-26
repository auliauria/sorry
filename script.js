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

// Canvas setup
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
    if (this.y > confettiCanvas.height) this.y = -30;
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
  for (let i = 0; i < 100; i++) {
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

// Floating messages (diperbaiki agar tidak tumpuk)
function createFloatingMessage() {
  const msg = document.createElement('div');
  msg.className = 'floating-msg';
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
  
  // Posisi acak yang lebih baik
  msg.style.left = Math.random() * 85 + 7 + 'vw';
  msg.style.top = '100%';
  msg.style.animationDuration = (Math.random() * 4 + 8) + 's';
  
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 12000);
}

// Button interactions
forgiveBtn.addEventListener('click', () => {
  createConfetti();
  
  // Banjir pesan menggemaskan
  for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingMessage, i * 180);
  }

  alert("Yayyy! Thank you my love! 💖\nTe amo mucho Angel! Now come give me a virtual hug 🥰");
});

noBtn.addEventListener('click', () => {
  const messagesNo = ["Please... 🥺", "I'm really sorryyy", "Don't be mad at me..."];
  noBtn.textContent = messagesNo[Math.floor(Math.random() * messagesNo.length)];
  noBtn.style.background = '#ff4d94';
  noBtn.style.color = 'white';
});

noBtn.addEventListener('mouseover', () => {
  const x = Math.random() * 160 - 80;
  const y = Math.random() * 80 - 40;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Start everything
animateConfetti();
setInterval(createFloatingMessage, 2200);

// Initial messages
setTimeout(() => {
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingMessage, i * 350);
  }
}, 600);