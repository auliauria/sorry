const forgiveBtn = document.getElementById('forgiveBtn');
const noBtn = document.getElementById('noBtn');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

const messages = [
  "Sorry for being silly 🥺",
  "Te amo, incluso cuando soy torpe 💕",
  "No more silly questions, only hugs 😊",
  "Eres mi favorito, siempre 💗",
  "Can we trade my silly question for extra cuddles? Deal? 💗",
  "I miss you already. Come back to me?",
  "Perdón mi amor... ¿me perdonas? 😘",
  "You're my Mexican prince ✨",
  "Solo quiero hacerte sonreír 💖",
  "Te extraño mucho... ven aquí 🥰",
  "Clumsy me loves you very much 😅❤️"
];

// Canvas Confetti (tetap sama)
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
  update() { this.y += this.speed; if (this.y > confettiCanvas.height + 50) this.y = -50; }
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
  for (let i = 0; i < 110; i++) particles.push(new Particle());
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

// === FLOATING MESSAGE BARU - ANTI TUMPUK ===
let lastPositions = []; // untuk menghindari posisi terlalu dekat

function createFloatingMessage() {
  const msg = document.createElement('div');
  msg.className = 'floating-msg';
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];

  // Pilih zona posisi (kiri, tengah, kanan) agar tidak tumpuk
  const zones = [12, 38, 62, 85]; // persentase left
  let leftPos = zones[Math.floor(Math.random() * zones.length)];

  // Hindari terlalu dekat dengan pesan sebelumnya
  if (lastPositions.length > 0) {
    let attempts = 0;
    while (attempts < 5 && Math.abs(leftPos - lastPositions[lastPositions.length-1]) < 25) {
      leftPos = zones[Math.floor(Math.random() * zones.length)];
      attempts++;
    }
  }
  lastPositions.push(leftPos);
  if (lastPositions.length > 4) lastPositions.shift();

  msg.style.left = `${leftPos}vw`;
  msg.style.top = '105%';

  // Durasi acak agar tidak sinkron
  const duration = 8 + Math.random() * 7;
  msg.style.animationDuration = `${duration}s`;

  document.body.appendChild(msg);

  setTimeout(() => {
    if (msg.parentNode) msg.parentNode.removeChild(msg);
  }, duration * 1000 + 1000);
}

// Tombol
forgiveBtn.addEventListener('click', () => {
  createConfetti();
  for (let i = 0; i < 12; i++) {   // kurangi jumlah sekaligus
    setTimeout(createFloatingMessage, i * 220);
  }
  alert("Yayyy! Thank you my love! 💖\nTe amo mucho Angel! 🥰");
});

// === TOMBOL NO - BERPINDAH SAAT DIKLIK (Mobile Friendly) ===
function moveNoButton() {
  const maxX = window.innerWidth * 0.6;   // batas gerak
  const maxY = window.innerHeight * 0.4;

  const randomX = Math.random() * maxX - (maxX / 2);
  const randomY = Math.random() * maxY - (maxY / 2);

  noBtn.style.transition = 'transform 0.4s ease';
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Event untuk tombol No
noBtn.addEventListener('click', () => {
  moveNoButton();                    // Pindah saat diklik (penting untuk mobile)
  
  const messagesNo = ["Please... 🥺", "I'm sorryyy", "Don't be mad...", "Otra vez? 🥹"];
  noBtn.textContent = messagesNo[Math.floor(Math.random() * messagesNo.length)];
  noBtn.style.background = '#ff4d94';
  noBtn.style.color = 'white';
});

noBtn.addEventListener('mouseover', () => {
  if (window.innerWidth > 768) {     // Hanya hover di desktop
    moveNoButton();
  }
});

// noBtn.addEventListener('mouseover', () => {
//   const x = Math.random() * 140 - 70;
//   const y = Math.random() * 70 - 35;
//   noBtn.style.transform = `translate(${x}px, ${y}px)`;
// });

// Start animations
animateConfetti();

// Mulai floating message dengan interval lebih longgar
setInterval(createFloatingMessage, 2800);

// Initial messages (sedikit dan tersebar)
setTimeout(() => {
  for (let i = 0; i < 6; i++) {
    setTimeout(createFloatingMessage, i * 450);
  }
}, 600);