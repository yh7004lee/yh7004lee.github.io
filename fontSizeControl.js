// 글자 크기 적용 로직 (16px ~ 30px, 1px 단위)
function applyFontSizeByIndex(index) {
  const fontSize = 16 + index;

  // .font-adjust 클래스가 붙은 요소에 글자 크기 적용
  document.querySelectorAll('.font-adjust').forEach(el => {
    el.style.fontSize = fontSize + 'px';
  });

  // 콤보박스(체크박스)의 크기도 폰트 비례로 조정
  const checkbox = document.getElementById('bookmark-checkbox');
  if (checkbox) {
    const scale = fontSize / 20; // 20px 기준으로 비율 계산
    checkbox.style.width = `${scale * 1.2}em`;
    checkbox.style.height = `${scale * 1.2}em`;
  }

  // 슬라이더 라벨에도 현재 크기 반영
  const label = document.querySelector('label[for="fontSlider"]');
  if (label) {
    label.textContent = `글자 크기 조절 (${fontSize}px)`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('fontSlider');
  const defaultIndex = 4; // 16 + 4 = 20px
  const savedIndex = parseInt(localStorage.getItem('fontSizeIndex'), 10);
  const indexToApply = isNaN(savedIndex) ? defaultIndex : savedIndex;

  applyFontSizeByIndex(indexToApply);

  if (slider) {
    slider.min = 0;
    slider.max = 14; // 16px ~ 30px
    slider.step = 1;
    slider.value = indexToApply;

    slider.addEventListener('input', () => {
      const index = parseInt(slider.value, 10);
      applyFontSizeByIndex(index);
      localStorage.setItem('fontSizeIndex', index);
    });
  }

  // 초기화 함수
  window.resetFontSize = function () {
    applyFontSizeByIndex(defaultIndex);
    localStorage.setItem('fontSizeIndex', defaultIndex);
    if (slider) slider.value = defaultIndex;
  };
});