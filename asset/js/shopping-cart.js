const openCartBtn = document.getElementById("open-cart-btn");
const shoppingCartModal = document.getElementById("shopping-cart-modal");
const shoppingCartContent = document.getElementById("shopping-cart-content");
const shoppingCartCloseBtn = document.getElementById("shopping-cart-close-btn");

const currentOrderBtn = document.getElementById("current-order-btn");
const pastOrdersBtn = document.getElementById("past-orders-btn");
const pastOrdersContent = document.getElementById("past-orders-content");
const currentOrderContent = document.getElementById("current-order-content");
const priceTotalContent = document.getElementById("price-total-content");
const totalPriceEl = document.getElementById("total-price");
const discountedPriceEl = document.getElementById("discounted-price");
const shoppingCartBg = document.getElementById("shopping-cart-bg");

const discount = 0;

function showShoppingCartModal() {
  shoppingCartModal.classList.remove("invisible");
  shoppingCartModal.classList.remove("pointer-events-none");
  shoppingCartContent.classList.remove("translate-x-full");
  shoppingCartContent.classList.add("translate-x-0");

  showCurrentOrder();
  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  totalPriceEl.textContent = `$${totalPrice}`;
  if (discount) {
    discountedPriceEl.textContent = `$${totalPrice - (totalPrice * discount) / 100}`;
  } else {
    discountedPriceEl.textContent = `$${totalPrice}`;
  }
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
  showCurrentOrderProduct();
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

const showCurrentOrderProduct = () => {
  currentOrderContent.textContent = "";

  if (cart.length) {
    cart.forEach((product) => {
      currentOrderContent.insertAdjacentHTML(
        "beforeend",
        `
         <div class="rounded-xl p-4 border border-primary/15 bg-cards">
            <div class="flex gap-3 mb-3">
              <img
                class="size-12 rounded-lg object-cover shrink-0 bg-[#3c3028]"
                src="../asset/img/product-img/${product.image_url}"
                alt=""
              />
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium truncate text-primary-text">
                  ${product.name}
                </h4>
                <span class="text-xs mt-0.5 text-secondary-text">${product.size} </span>
              </div>
              <span class="font-dmmono text-sm font-bold shrink-0 text-primary"
                >$${product.price}</span
              >
            </div>

            <div class="flex items-center gap-2">
              <div
                class="flex items-center gap-1.5 rounded-lg px-1 bg-elevated-cards"
              >
                <button
                  class="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-60 text-secondary-text cursor-pointer"
                >
                  <i data-lucide="plus" class="w-3 h-3"></i>
                </button>
                <span
                  class="font-dmmono text-xs font-bold w-3 text-center text-primary-text"
                  >${product.quantity}</span
                >
                <button
                  class="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-60 text-secondary-text cursor-pointer"
                >
                  <i data-lucide="minus" class="w-3 h-3"></i>
                </button>
              </div>
              <input
                class="flex-1 text-xs rounded-lg px-2.5 py-1.5 bg-elevated-cards text-primary-text outline-none border border-primary/15 transition-colors focus:border-amber-600/50 placeholder:opacity-40"
                type="text"
                placeholder='Note, e.g. "Extra hot"'
              />
              <button
              onclick="deleteProductFromCart('${product.id}','${product.size}')"
                class="w-6 h-6 flex items-center justify-center text-placeholders transition-opacity hover:opacity-60 cursor-pointer"
              >
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `,
      );

      priceTotalContent.classList.remove("hidden");
    });

    // For convert icons to SVG
    lucide.createIcons();
  } else {
    currentOrderContent.innerHTML =
      "<p class='text-secondary-text'>You haven't added any products to the shopping cart.</p>";
    priceTotalContent.classList.add("hidden");
  }
};

const deleteProductFromCart = (productId, productSize) => {
  const findProduct = cart.findIndex((product) => {
    return product.id === productId && productSize === product.size;
  });
  cart.splice(findProduct, 1);
  showCurrentOrderProduct();
  saveCartInLocalStorage();
  showShoppingCartModal();
};

openCartBtn.addEventListener("click", showShoppingCartModal);
shoppingCartCloseBtn.addEventListener("click", hideShoppingCartModal);
shoppingCartBg.addEventListener("click", hideShoppingCartModal);

currentOrderBtn.addEventListener("click", showCurrentOrder);
pastOrdersBtn.addEventListener("click", showPastOrders);
