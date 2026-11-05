// 1. Logika Video Slider Latar Belakang (Mendukung 6 Video)
const videos = document.querySelectorAll('.slide-video');
const dots = document.querySelectorAll('.dot');
let currentVideoIndex = 0;

function switchVideo(index) {
  // Sembunyikan semua video & matikan status aktif titik
  videos.forEach(video => video.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Aktifkan video dan titik yang dipilih
  currentVideoIndex = index;
  if (videos[currentVideoIndex]) {
    videos[currentVideoIndex].classList.add('active');
  }
  if (dots[currentVideoIndex]) {
    dots[currentVideoIndex].classList.add('active');
  }
}

// Otomatis berpindah video setiap 5 detik
setInterval(() => {
  let nextIndex = (currentVideoIndex + 1) % videos.length;
  switchVideo(nextIndex);
}, 5000);

// 2. Switcher Mode Gelap / Terang
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
});

// 3. Pemutar Musik Latar
const musicToggleBtn = document.getElementById('musicToggleBtn');
const bgMusic = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');
let isPlaying = false;

musicToggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicText.textContent = 'Putar Musik';
  } else {
    bgMusic.play().then(() => {
      musicText.textContent = 'Hentikan Musik';
    }).catch(() => {
      alert("Pastikan berkas 'lagu.mp3' tersedia di folder proyek!");
    });
  }
  isPlaying = !isPlaying;
});

// 4. Modal Pop-up Gift Card
const giftModal = document.getElementById('giftModal');
const openGiftBtn = document.getElementById('openGiftBtn');
const floatingGiftTrigger = document.getElementById('floatingGiftTrigger');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal() {
  giftModal.style.display = 'flex';
  triggerFireworks();
}

openGiftBtn.addEventListener('click', openModal);
if (floatingGiftTrigger) {
  floatingGiftTrigger.addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', () => {
  giftModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === giftModal) giftModal.style.display = 'none';
});

// 5. Partikel Hati Melayang
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');
  
  const hearts = ['❤️', '💖', '🌸', '✨', '💕'];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 700);

// 6. Efek Kembang Api Canvas
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.015;
  }
}

function triggerFireworks() {
  const colors = ['#ff6b6b', '#fca311', '#4ecdc4', '#ffe66d', '#ff9aa2'];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
      particle.draw();
    }
  });
  requestAnimationFrame(animate);
}

animate();