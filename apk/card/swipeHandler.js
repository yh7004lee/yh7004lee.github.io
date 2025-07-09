let touchStartX = 0;
let touchEndX = 0;
let lastSwipeTime = 0;
let swipeCount = 0;
let swipeTimer = null;

const SWIPE_INTERVAL = 400; // 밀리초 기준. 연속 스와이프 간 허용 시간

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

  const now = Date.now();
  const direction = dist > 0 ? 'right' : 'left';

  if (now - lastSwipeTime < SWIPE_INTERVAL) {
    swipeCount++;
    clearTimeout(swipeTimer);
  } else {
    swipeCount = 1;
  }

  lastSwipeTime = now;

  swipeTimer = setTimeout(() => {
    swipeCount = 0;
  }, SWIPE_INTERVAL);

  let step = 1;
  if (swipeCount === 2) step = 9;
  else if (swipeCount >= 3) step = 40;

  if (favoriteFilter && favorites.size === 0) {
    showTooltip('즐겨찾기된 항목이 없습니다.');
    return;
  }

  if (dist > 0) {
    // 오른쪽 (이전 카드)
    if (randomMode) {
      shufflePointer = (shufflePointer - step + shuffledIndices.length) % shuffledIndices.length;
    } else {
      currentIndex = (currentIndex - step + getFilteredLength()) % getFilteredLength();
    }
  } else {
    // 왼쪽 (다음 카드)
    if (randomMode) {
      shufflePointer = (shufflePointer + step) % shuffledIndices.length;
    } else {
      currentIndex = (currentIndex + step) % getFilteredLength();
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
