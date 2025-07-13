function setupCellExpand(gridSelector) {
  document.querySelectorAll(gridSelector).forEach(grid => {
    const cells = Array.from(grid.children);
    cells.forEach((cell, idx) => {
      // Função para expandir
      function expandCell() {
        cells.forEach(c => c.classList.remove('expanded'));
        cell.classList.add('expanded');
        let colSizes = ['1fr', '1fr'];
        let rowSizes = ['1fr', '1fr'];
        if (idx === 0) {
          colSizes = ['1.6fr', '0.4fr'];
          rowSizes = ['1.6fr', '0.4fr'];
        } else if (idx === 1) {
          colSizes = ['0.4fr', '1.6fr'];
          rowSizes = ['1.6fr', '0.4fr'];
        } else if (idx === 2) {
          colSizes = ['1.6fr', '0.4fr'];
          rowSizes = ['0.4fr', '1.6fr'];
        } else if (idx === 3) {
          colSizes = ['0.4fr', '1.6fr'];
          rowSizes = ['0.4fr', '1.6fr'];
        }
        grid.style.gridTemplateColumns = colSizes.join(' ');
        grid.style.gridTemplateRows = rowSizes.join(' ');

        const vid = cell.querySelector('video');
        if (vid && !vid.paused) {
          const currentTime = vid.currentTime;
          vid.currentTime = currentTime;
          vid.play().catch(() => {});
        }
      }
      // Função para reset
      function resetGrid() {
        cell.classList.remove('expanded');
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.gridTemplateRows = '1fr 1fr';
      }
      // Desktop: hover
      cell.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) expandCell();
      });
      cell.addEventListener('mouseleave', () => {
        if (window.innerWidth > 900) resetGrid();
      });
      // Mobile: click/tap
      cell.addEventListener('click', e => {
        if (window.innerWidth <= 900) {
          if (cell.classList.contains('expanded')) {
            resetGrid();
          } else {
            expandCell();
          }
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && !grid.contains(e.target)) {
        cells.forEach(c => c.classList.remove('expanded'));
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.gridTemplateRows = '1fr 1fr';
      }
    });
  });
}

setupCellExpand('.project-grid');

document.querySelectorAll('.project-cell img, .project-cell video').forEach(media => {
  media.addEventListener('click', function(e) {
    // Pause all grid videos
    document.querySelectorAll('.project-cell video').forEach(v => v.pause());

    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Reset lightbox state
    lightboxDescription.innerHTML = ''; // Clear previous content
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';

    if (this.tagName === 'IMG') {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
      lightboxImg.src = this.src;
      lightboxImg.style.display = '';
    }
    else if (this.tagName === 'VIDEO') {
      this.pause();
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
      lightboxVideo.src = this.currentSrc || this.src;
      lightboxVideo.currentTime = 0;
      lightboxVideo.muted = false;
      lightboxVideo.controls = true;
      lightboxVideo.style.display = '';
      lightboxVideo.load();
      lightboxVideo.onloadeddata = function() {
        lightboxVideo.play();
      };
    }

    // Create description content
    const title = this.dataset.title;
    const subtitle = this.dataset.subtitle;
    const description = this.dataset.description;

    if (title || subtitle || description) {
      let descHTML = '';
      
      if (title) {
        descHTML += `<div class="lightbox-title">${title}</div>`;
      }
      
      if (subtitle) {
        descHTML += `<div class="lightbox-subtitle">${subtitle}</div>`;
      }
      
      if (description) {
        descHTML += `<div class="lightbox-description-text">${description}</div>`;
      }
      
      lightboxDescription.innerHTML = descHTML;
      lightboxDescription.style.display = 'block';
    } else {
      lightboxDescription.style.display = 'none';
    }

    overlay.style.display = 'flex';
    document.body.classList.add('lightbox-open');
  });
});

document.querySelectorAll('.project-cell video').forEach(video => {
  video.addEventListener('ended', function() {
    console.log('Grid video ended, looping');
    this.currentTime = 0;
    this.play();
  });
});

// Lightbox close logic
function closeLightbox() {
  console.log('Closing lightbox');
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxVideo = document.getElementById('lightbox-video');
  overlay.style.display = 'none';
  document.body.classList.remove('lightbox-open');
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.muted = true;

  // Volta a dar play a todos os vídeos da grid
  document.querySelectorAll('.project-cell video').forEach(video => {
    video.muted = true;
    video.play().catch(() => {});
  });
}

document.getElementById('lightbox-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    console.log('Clicked outside lightbox content, closing');
    closeLightbox();
  }
});
document.getElementById('lightbox-close').addEventListener('click', function() {
  console.log('Clicked close button');
  closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    console.log('Pressed Escape, closing lightbox');
    closeLightbox();
  }
});

// Pause all grid videos when opening the lightbox
document.querySelectorAll('.project-cell video').forEach(v => v.pause());