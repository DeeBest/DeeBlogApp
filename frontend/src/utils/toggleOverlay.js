const toggleOverlay = () => {
  const overlay = document.querySelector('.overlay');
  if (
    overlay.style.top === '-100%' &&
    overlay.style.transform === 'translateY(-100%)'
  ) {
    overlay.style.top = 0;
    overlay.style.transform = 'translateY(0%)';
  } else {
    overlay.style.top = '-100%';
    overlay.style.transform = 'translateY(-100%)';
  }
};

export default toggleOverlay;
