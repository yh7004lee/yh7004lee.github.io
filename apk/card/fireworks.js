// fireworks.js

function launchSmallFireworks() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ff3e3e', '#ffd93d', '#4fddc6', '#3b9cff', '#ff9ff3', '#ffffff'];

  function createParticle() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.8; // 상단에서만 발생
    const count = 20 + Math.random() * 30;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      p.alpha -= 0.015;

      ctx.beginPath();
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // 알파가 0 이하인 입자는 제거
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    if (Date.now() - startTime < 3000 || particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  const startTime = Date.now();

  // 3초 동안 반복해서 입자 생성
  const generator = setInterval(() => {
    createParticle();
  }, 150);

  // 3초 후 폭죽 생성 중단
  setTimeout(() => {
    clearInterval(generator);
  }, 3000);

  animate();
}
