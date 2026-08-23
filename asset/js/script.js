const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

const productCards = document.querySelectorAll("#product-card");
const productModal = document.getElementById("product-modal");
const productModalCloseBtn = document.getElementById("product-modal-close");

const openCartBtn = document.getElementById("open-cart-btn");
const shoppingCartModal = document.getElementById("shopping-cart-modal");
const shoppingCartContent = document.getElementById("shopping-cart-content");
const shoppingCartCloseBtn = document.getElementById("shopping-cart-close-btn");

const currentOrderBtn = document.getElementById("current-order-btn");
const pastOrdersBtn = document.getElementById("past-orders-btn");
const pastOrdersContent = document.getElementById("past-orders-content");
const currentOrderContent = document.getElementById("current-order-content");

function showMenu() {
  if (mobileNav.className.includes("opacity-0")) {
    mobileNav.classList.remove("opacity-0");
    mobileNav.classList.add("opacity-100");
    mobileNav.classList.remove("h-0");
    mobileNav.classList.add("h-[180px]");
    mobileNav.classList.remove("-translate-y-52");
    mobileNav.classList.add("-translate-x-0");

    menuToggle.innerHTML = "";
    menuToggle.innerHTML = `<i data-lucide="x" class="w-4 h-4"></i>`;

    // For convert icons to SVG
    lucide.createIcons();
  } else {
    mobileNav.classList.add("opacity-0");
    mobileNav.classList.remove("opacity-100");
    mobileNav.classList.remove("h-[180px]");
    mobileNav.classList.add("h-0");
    mobileNav.classList.add("-translate-y-52");

    menuToggle.innerHTML = "";
    menuToggle.innerHTML = `<i data-lucide="menu" class="w-4 h-4"></i> `;

    // For convert icons to SVG
    lucide.createIcons();
  }
}

function showProductModal() {
  productModal.classList.remove("hidden");
}

function hideProductModal() {
  productModal.classList.add("hidden");
}

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
  currentOrderBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-background";
  pastOrdersBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-cards text-secondary-text";
}

function showPastOrders() {
  pastOrdersContent.classList.remove("hidden");
  currentOrderContent.classList.add("hidden");
  pastOrdersBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-background";
  currentOrderBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-cards text-secondary-text";
}

menuToggle.addEventListener("click", showMenu);
productCards.forEach(function (productCard) {
  productCard.addEventListener("click", showProductModal);
});
productModalCloseBtn.addEventListener("click", hideProductModal);
openCartBtn.addEventListener("click", showShoppingCartModal);
shoppingCartCloseBtn.addEventListener("click", hideShoppingCartModal);

currentOrderBtn.addEventListener("click", showCurrentOrder);
pastOrdersBtn.addEventListener("click", showPastOrders);
