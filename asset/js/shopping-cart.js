const openCartBtn = document.getElementById("open-cart-btn");
const shoppingCartModal = document.getElementById("shopping-cart-modal");
const shoppingCartContent = document.getElementById("shopping-cart-content");
const shoppingCartCloseBtn = document.getElementById("shopping-cart-close-btn");

const currentOrderBtn = document.getElementById("current-order-btn");
const pastOrdersBtn = document.getElementById("past-orders-btn");
const pastOrdersContent = document.getElementById("past-orders-content");
const currentOrderContent = document.getElementById("current-order-content");
const priceTotalContent = document.getElementById("price-total-content");
const shoppingCartBg = document.getElementById("shopping-cart-bg");

function showShoppingCartModal() {
  shoppingCartModal.classList.remove("invisible");
  shoppingCartModal.classList.remove("pointer-events-none");
  shoppingCartContent.classList.remove("translate-x-full");
  shoppingCartContent.classList.add("translate-x-0");
}

function hideShoppingCartModal() {
  shoppingCartModal.classList.add("invisible");
  shoppingCartModal.classList.add("pointer-events-none");
  shoppingCartContent.classList.remove("translate-x-0");
  shoppingCartContent.classList.add("translate-x-full");
}

function showCurrentOrder() {
  pastOrdersContent.classList.add("hidden");
  currentOrderContent.classList.remove("hidden");
  priceTotalContent.classList.remove("hidden");
  currentOrderBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-background";
  pastOrdersBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-cards text-secondary-text";
}

function showPastOrders() {
  pastOrdersContent.classList.remove("hidden");
  currentOrderContent.classList.add("hidden");
  priceTotalContent.classList.add("hidden");
  pastOrdersBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-background";
  currentOrderBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-cards text-secondary-text";
}

openCartBtn.addEventListener("click", showShoppingCartModal);
shoppingCartCloseBtn.addEventListener("click", hideShoppingCartModal);
shoppingCartBg.addEventListener("click", hideShoppingCartModal);

currentOrderBtn.addEventListener("click", showCurrentOrder);
pastOrdersBtn.addEventListener("click", showPastOrders);
