let touchStartX = 0;
let touchEndX = 0;

content.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});
content.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});
content.addEventListener('mousedown', e => {
  touchStartX = e.screenX;
});
content.addEventListener('mouseup', e => {
  touchEndX = e.screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const dist = touchEndX - touchStartX;
  if (Math.abs(dist) < swipeThreshold) return;

  const direction = dist > 0 ? 'right' : 'left';

  if (favoriteFilter && favorites.size === 0) {
    showTooltip('즐겨찾기된 항목이 없습니다.');
    return;
  }

  if (dist > 0) {
    if (randomMode) {
      shufflePointer--;
      if (shufflePointer < 0) shufflePointer = shuffledIndices.length - 1;
    } else {
      currentIndex--;
      if (currentIndex < 0) currentIndex = getFilteredLength() - 1;
    }
  } else {
    if (randomMode) {
      shufflePointer++;
      if (shufflePointer >= shuffledIndices.length) initShuffledIndices();
    } else {
      currentIndex++;
      if (currentIndex >= getFilteredLength()) currentIndex = 0;
    }
  }

  animateCardSlide(direction);
  renderCard();
}

function animateCardSlide(direction) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('slide-left', 'slide-right');
    void card.offsetWidth;
    card.classList.add(direction === 'left' ? 'slide-left' : 'slide-right');
  });
}