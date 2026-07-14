(() => {
  const placeholder = document.querySelector('.mini-bottle');
  if (!placeholder) return;
  const photo = document.createElement('figure');
  photo.className = 'product-photo';
  photo.innerHTML = '<img src="assets/body-glue-product.png" alt="Body Glue skin adhesive tube and packaging">';
  placeholder.replaceWith(photo);
})();
