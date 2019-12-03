(() => {
  // Prevent zooming
  document.querySelector('#app')!.addEventListener('touchmove', e => {
    e.preventDefault();
    return false;
  });

  // Fix for h 100vh
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

})();
