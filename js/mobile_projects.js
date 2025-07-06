// Enhanced mobile video support
    document.addEventListener('DOMContentLoaded', function() {
      const videos = document.querySelectorAll('video');
      
      videos.forEach(video => {
        // Ensure videos are muted for autoplay
        video.muted = true;
        
        // Handle loading errors
        video.addEventListener('error', function() {
          console.log('Video failed to load:', this.src);
          // Show fallback image if video fails
          const fallbackImg = this.querySelector('img');
          if (fallbackImg) {
            this.style.display = 'none';
            fallbackImg.style.display = 'block';
          }
        });
        
        // Mobile-specific optimizations
        if (window.innerWidth <= 768) {
          video.preload = 'none'; // Don't preload on mobile to save bandwidth
          
          // Intersection Observer for lazy loading videos
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const video = entry.target;
                if (video.preload === 'none') {
                  video.preload = 'metadata';
                  video.load();
                }
              }
            });
          });
          
          observer.observe(video);
        }
      });
    });