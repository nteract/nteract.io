CSS.paintWorklet.addModule('https://googlechromelabs.github.io/css-paint-polyfill/ripple-worklet.js');

if (!window.performance) window.performance = { now: Date.now.bind(Date) };

function ripple(evt) {
  let button = this,
    rect = button.getBoundingClientRect(),
    x = evt.clientX - rect.left,
    y = evt.clientY - rect.top,
    start = performance.now();
  button.classList.add('animating');
  requestAnimationFrame(function raf(now) {
    let count = Math.floor(now - start);
    button.style.cssText =
      '--ripple-x: ' +
      x +
      '; --ripple-y: ' +
      y +
      '; --animation-tick: ' +
      count +
      ';';
    if (count > 1200) {
      button.classList.remove('animating');
      button.style.cssText = '--animation-tick: 0;';
      return;
    }
    requestAnimationFrame(raf);
  });
}
[].forEach.call(document.querySelectorAll('.ripple'), function(el) {
  el.addEventListener('click', ripple);
});
