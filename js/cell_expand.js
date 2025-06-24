// Cell expansion effect for 2x2 grids (project-grid and project-description)
document.querySelectorAll('.project-grid, .project-description').forEach(grid => {
  const cells = Array.from(grid.children);
  cells.forEach((cell, idx) => {
    cell.addEventListener('mouseenter', () => {
      // Remove expanded from all
      cells.forEach(c => c.classList.remove('expanded'));
      cell.classList.add('expanded');
      // Figure out which cell is hovered (0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right)
      let colSizes = ['1fr', '1fr'];
      let rowSizes = ['1fr', '1fr'];
      if (idx === 0) { // top-left
        colSizes = ['1.6fr', '0.4fr'];
        rowSizes = ['1.6fr', '0.4fr'];
      } else if (idx === 1) { // top-right
        colSizes = ['0.4fr', '1.6fr'];
        rowSizes = ['1.6fr', '0.4fr'];
      } else if (idx === 2) { // bottom-left
        colSizes = ['1.6fr', '0.4fr'];
        rowSizes = ['0.4fr', '1.6fr'];
      } else if (idx === 3) { // bottom-right
        colSizes = ['0.4fr', '1.6fr'];
        rowSizes = ['0.4fr', '1.6fr'];
      }
      grid.style.gridTemplateColumns = colSizes.join(' ');
      grid.style.gridTemplateRows = rowSizes.join(' ');
    });
    cell.addEventListener('mouseleave', () => {
      cell.classList.remove('expanded');
      grid.style.gridTemplateColumns = '1fr 1fr';
      grid.style.gridTemplateRows = '1fr 1fr';
    });
  });
});