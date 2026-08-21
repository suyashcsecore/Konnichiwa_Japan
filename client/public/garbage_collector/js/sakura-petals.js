// Sakura Petals Canvas Animation Engine

export class SakuraEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.numPetals = 36;
    this.mouseX = 0;
    this.mouseY = 0;
    this.wind = 0.5;
    this.animId = null;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.wind = ((e.clientX / window.innerWidth) - 0.5) * 1.8;
    });

    for (let i = 0; i < this.numPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    return {
      x: Math.random() * (width + 200) - 100,
      y: randomY ? Math.random() * height : -20,
      size: Math.random() * 9 + 6,
      speedX: Math.random() * 1.5 - 0.5,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2.5,
      flip: Math.random() * 360,
      flipSpeed: Math.random() * 2 + 1,
      colorVariant: Math.random() > 0.4 ? 'rgba(255, 179, 198, ' : 'rgba(255, 143, 163, ',
      opacity: Math.random() * 0.45 + 0.35
    };
  }

  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.scale(Math.cos((p.flip * Math.PI) / 180), 1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 1.5, p.size * 0.3, 0, p.size * 1.6);
    ctx.bezierCurveTo(-p.size * 1.5, p.size * 0.3, -p.size * 0.8, -p.size * 0.8, 0, 0);
    ctx.fillStyle = `${p.colorVariant}${p.opacity})`;
    ctx.fill();

    // Gentle inner notch for Sakura leaf realism
    ctx.beginPath();
    ctx.moveTo(0, p.size * 1.6);
    ctx.lineTo(0, p.size * 1.3);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.x += p.speedX + this.wind;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      if (p.y > this.canvas.height + 30 || p.x < -120 || p.x > this.canvas.width + 120) {
        this.petals[i] = this.createPetal(false);
      }

      this.drawPetal(p);
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  burst(count = 20) {
    for (let i = 0; i < count; i++) {
      const p = this.createPetal(false);
      p.x = this.canvas.width / 2 + (Math.random() - 0.5) * 300;
      p.y = this.canvas.height / 2 + (Math.random() - 0.5) * 200;
      p.speedX = (Math.random() - 0.5) * 6;
      p.speedY = (Math.random() - 0.5) * 6 - 2;
      p.size = Math.random() * 12 + 8;
      this.petals.push(p);
    }
  }
}
