const forgiveBtn = document.getElementById('forgiveBtn');
const noBtn = document.getElementById('noBtn');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
const loveMessages = document.getElementById('loveMessages');

const messages = [
  "I promise I'll never test you again 🥺",
  "Te amo más que a nada en este mundo 💕",
  "You're my Mexican prince ✨",
  "My heart beats only for you ❤️",
  "Sorry for being silly... but I'm your silly 💗",
  "Forgive me? Pretty please with hearts on top? 🥹"
];

// Confetti setup
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 12 + 8;
    this.speed = Math.random() * 3 + 2;
    this.color = ['#ff4d94', '#ff80ab', '#ff69b4', '#ffb6c1'][Math.floor(Math.random()*4)];
    this.shape = 'heart';
  }
  
  update() {
    this.y += this.speed;
    if (this.y > confettiCanvas.height) this.y = -20;
  }
  
  draw() {
    ctx.save();
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillText('💗', this.x, this.y);
    ctx.restore();
  }
}

function createConfetti() {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.y > confettiCanvas.height) particles.splice(i, 1);
  });
  requestAnimationFrame(animateConfetti);
}

// Floating love messages
function createFloatingMessage() {
  const msg = document.createElement('div');
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
  msg.style.position = 'absolute';
  msg.style.left = Math.random() * 80 + 10 + '%';
  msg.style.top = '100%';
  msg.style.color = '#ff4d94';
  msg.style.fontSize = '1.1rem';
  msg.style.opacity = '0.9';
  msg.style.fontWeight = '600';
  msg.style.whiteSpace = 'nowrap';
  msg.style.animation = 'floatUp 8s linear forwards';
  loveMessages.appendChild(msg);

  setTimeout(() => msg.remove(), 9000);
}

// Button interactions
forgiveBtn.addEventListener('click', () => {
  createConfetti();
  alert("Yayyy! Thank you my love! 💖 Te amo mucho Angel! Now come give me a virtual hug 🥰");
  
  // Extra floating messages
  for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingMessage, i * 300);
  }
});

noBtn.addEventListener('click', () => {
  const messagesNo = ["Please... 🥺", "I'm really sorryyy", "Don't be mad at me..."];
  noBtn.textContent = messagesNo[Math.floor(Math.random() * messagesNo.length)];
  noBtn.style.background = '#ff4d94';
  noBtn.style.color = 'white';
});

// Make "No" button move a little (lucu)
noBtn.addEventListener('mouseover', () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 100 - 50;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// Start animations
animateConfetti();
setInterval(createFloatingMessage, 1800);

// Initial floating hearts
setTimeout(() => {
  for (let i = 0; i < 6; i++) createFloatingMessage();
}, 800);