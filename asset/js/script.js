

const productCards = document.querySelectorAll("#product-card");


productCards.forEach(function (productCard) {
  productCard.addEventListener("click", showProductModal);
});
