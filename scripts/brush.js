const canvas = document.getElementById('brush-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Store brush positions with timestamps
  let trail = [];
  let lastPoint = null;

  function drawTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    // Only keep points from the last 4 seconds
    trail = trail.filter(point => now - point.time < 4000);

    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      const age = now - point.time;
      const alpha = Math.max(0, 1 - age / 4000);

      // Create a radial gradient for soft edges
      const radius = 70;
      const grad = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      grad.addColorStop(0, `rgba(132,255,0,${alpha})`);      // Center: solid
      grad.addColorStop(0.7, `rgba(132,255,0,${alpha * 0.1})`); // Mid: semi
      grad.addColorStop(1, `rgba(132,255,0,0)`);             // Edge: transparent

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    drawTrail();
    requestAnimationFrame(animate);
  }
  animate();

  function addBrush(x, y) {
    const now = Date.now();
    if (lastPoint) {
      // Interpolate points between last and current position
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 6)); // 6px spacing
      for (let i = 1; i <= steps; i++) {
        const ix = lastPoint.x + (dx * i) / steps;
        const iy = lastPoint.y + (dy * i) / steps;
        trail.push({ x: ix, y: iy, time: now });
      }
    } else {
      trail.push({ x, y, time: now });
    }
    lastPoint = { x, y };
  }

  // Listen to mousemove on the whole window
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addBrush(x, y);
  });

  window.addEventListener('mouseleave', () => {
    lastPoint = null;
  });
}