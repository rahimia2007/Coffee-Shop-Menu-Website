const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

const productCarts = document.querySelectorAll("#product-cart");
const productModal = document.getElementById("product-modal");
const productModalCloseBtn = document.getElementById("product-modal-close");
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

menuToggle.addEventListener("click", showMenu);
productCarts.forEach(function (productCart) {
  productCart.addEventListener("click", showProductModal);
});
productModalCloseBtn.addEventListener("click", hideProductModal);
