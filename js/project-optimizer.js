document.addEventListener('DOMContentLoaded', function() {
  // Get all video elements
  const videos = document.querySelectorAll('.grid-video');
  
  // For each video
  videos.forEach(video => {
    // Pause initially
    video.pause();
    
    // Play on hover
    video.parentElement.addEventListener('mouseenter', function() {
      video.play().catch(e => console.log("Video play failed:", e));
    });
    
    // Pause when not hovering
    video.parentElement.addEventListener('mouseleave', function() {
      video.pause();
      video.currentTime = 0; // Optional: reset to start
    });
    
    // Handle touch devices
    video.parentElement.addEventListener('touchstart', function() {
      if (video.paused) {
        video.play().catch(e => console.log("Video play failed:", e));
      } else {
        video.pause();
      }
    });
  });
});