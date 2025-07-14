document.addEventListener('DOMContentLoaded', function() {
  // Get all video elements in the grid
  const gridVideos = document.querySelectorAll('.project-cell video');
  
  // Initialize all videos
  gridVideos.forEach(video => {
    // Ensure these attributes are set
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = false;
    
    // Force pause and reset to beginning
    video.pause();
    video.currentTime = 0;
    
    // Set initial state
    video.dataset.videoState = 'paused';
    
    // Preload metadata for smoother playback
    video.preload = 'metadata';
  });

  // Add hover event listeners with improved reliability
  gridVideos.forEach(video => {
    const parentCell = video.closest('.project-cell');
    let hoverTimeout;
    
    // Mouse Enter - play with slight delay to prevent accidental triggers
    parentCell.addEventListener('mouseenter', function() {
      if (video.dataset.videoState === 'paused') {
        hoverTimeout = setTimeout(() => {
          video.play()
            .then(() => {
              video.dataset.videoState = 'playing';
            })
            .catch(e => {
              console.log('Video play failed:', e);
              // Fallback for browsers that block playback
              video.muted = true;
              video.play().then(() => {
                video.dataset.videoState = 'playing';
              });
            });
        }, 100); // 100ms delay
      }
    });

    // Mouse Leave - pause immediately
    parentCell.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimeout);
      if (video.dataset.videoState === 'playing') {
        video.pause();
        video.dataset.videoState = 'paused';
      }
    });
    
    // Touch support for mobile devices
    parentCell.addEventListener('click', function() {
      if (video.dataset.videoState === 'paused') {
        video.play()
          .then(() => {
            video.dataset.videoState = 'playing';
          })
          .catch(e => {
            console.log('Video play failed:', e);
            video.muted = true;
            video.play().then(() => {
              video.dataset.videoState = 'playing';
            });
          });
      } else {
        video.pause();
        video.dataset.videoState = 'paused';
      }
    });
  });
});