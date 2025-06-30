let tooltipTimer = null;

function showTooltip(message) {
  const tooltip = document.getElementById('tooltip');
  tooltip.textContent = message;

  if (tooltipTimer) {
    clearTimeout(tooltipTimer);
    tooltipTimer = null;
  }

  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
  tooltip.style.transform = 'translateX(-50%) scale(1.05)';

  setTimeout(() => {
    tooltip.style.transform = 'translateX(-50%) scale(1)';
  }, 100);

  tooltipTimer = setTimeout(() => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(-50%) scale(0.95)';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 300);
  }, 3000);
}