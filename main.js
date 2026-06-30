import './card-feactured.js';
import './product-single.js';

document.addEventListener('DOMContentLoaded', () => {
  let mainimg = document.querySelector('.main');

  function setMainImage(src) {
    if (!mainimg) return;
    mainimg.innerHTML = `<img src="${src}" id="picture" srcset="">`;
  }

  function setupDelegation() {
    // mouseover bubbles (mouseenter does not), so use it for hover
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target || target.tagName !== 'IMG') return;
      if (target.closest('.group')) setMainImage(target.src);
    });

    // also support click/tap for touch devices
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target || target.tagName !== 'IMG') return;
      if (target.closest('.group')) setMainImage(target.src);
    });
  }

  if (mainimg) {
    setupDelegation();
  } else {
    const observer = new MutationObserver((mutations, obs) => {
      mainimg = document.querySelector('.main');
      if (mainimg) {
        obs.disconnect();
        setupDelegation();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});



