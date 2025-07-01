function pauseVideosOutOfView() {
  // Não faz nada se a lightbox estiver aberta
  if (document.body.classList.contains('lightbox-open')) return;

  document.querySelectorAll('.project-cell video').forEach(video => {
    const rect = video.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
    if (!inView && !video.paused) {
      video.pause();
    } else if (inView && video.paused) {
      video.muted = true;
      video.play().catch(() => {});
    }
  });
}
window.addEventListener('scroll', pauseVideosOutOfView);
window.addEventListener('resize', pauseVideosOutOfView);
window.addEventListener('DOMContentLoaded', pauseVideosOutOfView);