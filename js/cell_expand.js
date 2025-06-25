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
    // Fecha expansão ao clicar fora no mobile
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

document.querySelectorAll('.project-cell img').forEach(img => {
  img.addEventListener('click', function(e) {
    e.stopPropagation();
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = this.src;
    overlay.style.display = 'flex';
    document.body.classList.add('lightbox-open');
  });
});

document.getElementById('lightbox-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.body.classList.remove('lightbox-open');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('lightbox-overlay');
    overlay.style.display = 'none';
    document.body.classList.remove('lightbox-open');
  }
});

document.getElementById('lightbox-close').addEventListener('click', function() {
  const overlay = document.getElementById('lightbox-overlay');
  overlay.style.display = 'none';
  document.body.classList.remove('lightbox-open');
});