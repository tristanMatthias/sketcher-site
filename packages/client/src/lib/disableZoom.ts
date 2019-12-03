(() => {
  // window.addEventListener('touchmove', e => {
  //   e.preventDefault();
  //   return false;
  // });
  // window.document.body.addEventListener('touchmove', e => {
  //   e.preventDefault();
  //   return false;
  // });
  document.querySelector('#app')!.addEventListener('touchmove', e => {
    e.preventDefault();
    return false;
  });
})();
