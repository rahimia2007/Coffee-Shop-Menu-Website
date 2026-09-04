const productModal = document.getElementById("product-modal");
const productModalCloseBtn = document.getElementById("product-modal-close");
const productPageBg = document.getElementById("product-page-bg");
const productPageImg = document.getElementById("product-page-img");
const productPageTitle = document.getElementById("product-page-title");
const productPagePrice = document.getElementById("product-page-price");
const productPageDescription = document.getElementById(
  "product-page-description",
);
const productPageIncreaseBtn = document.getElementById(
  "product-page-increase-btn",
);
const productPageReductionBtn = document.getElementById(
  "product-page-reduction-btn",
);
const productPageNumber = document.getElementById("product-page-number");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const addToCartTotalPrice = document.getElementById("add-to-cart-total-price");

function showProductModal(productId) {
  productModal.classList.remove("hidden");
  const findProduct = products.find((product) => {
    return product.id == productId;
  });

  productPageImg.setAttribute(
    "src",
    `../asset/img/product-img/${findProduct.image_url}`,
  );
  productPageTitle.textContent = findProduct.name;
  productPageDescription.textContent = findProduct.description;
  productPagePrice.textContent = findProduct.price;
  addToCartBtn.setAttribute(
    "onclick",
    `addToCart(${JSON.stringify(findProduct)})`,
  );
  addToCartTotalPrice.textContent = findProduct.price;
  productPageNumber.textContent = 1;
}

function hideProductModal() {
  productModal.classList.add("hidden");
}

const increaseNumberProductPage = () => {
  const productPrice = Number(productPagePrice.textContent);
  if (productPageNumber.textContent != 1) {
    productPageNumber.textContent = Number(productPageNumber.textContent) - 1;
    addToCartTotalPrice.textContent =
      productPrice * Number(productPageNumber.textContent);
  }
};

const reductionNumberProductPage = () => {
  const productPrice = Number(productPagePrice.textContent);
  if (productPageNumber.textContent <= 9) {
    productPageNumber.textContent = Number(productPageNumber.textContent) + 1;
    addToCartTotalPrice.textContent =
      productPrice * Number(productPageNumber.textContent);
  }
};

productModalCloseBtn.addEventListener("click", hideProductModal);
productPageBg.addEventListener("click", hideProductModal);
productPageIncreaseBtn.addEventListener("click", increaseNumberProductPage);
productPageReductionBtn.addEventListener("click", reductionNumberProductPage);
