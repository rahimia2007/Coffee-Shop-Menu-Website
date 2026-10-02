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
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");

const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutModalBtn = document.getElementById(
  "close-checkout-modal-btn",
);
const checkoutModalBg = document.getElementById("checkout-modal-bg");
const dineInBtn = document.getElementById("dine-in-btn");
const takeoutBtn = document.getElementById("takeout-btn");
const checkoutModalInputLable = document.getElementById(
  "checkout-modal-input-lable",
);
const checkoutModalInput = document.getElementById("checkout-modal-input");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutHeaderProductLength = document.getElementById(
  "checkout-header-product-length",
);

const discount = 0;

function showShoppingCartModal() {
  shoppingCartModal.classList.remove("invisible");
  shoppingCartModal.classList.remove("pointer-events-none");
  shoppingCartContent.classList.remove("translate-x-full");
  shoppingCartContent.classList.add("translate-x-0");

  showCurrentOrder();
  CalculatingTotalPrice();
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
                  onclick="increaseNumberProductCart('${product.id}','${product.size}')"
                  class="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-60 text-secondary-text cursor-pointer"
                >
                  <i data-lucide="plus" class="w-3 h-3"></i>
                </button>
                <span
                  id="product-cart-quantity"
                  class="font-dmmono text-xs font-bold w-3 text-center text-primary-text"
                  >${product.quantity}</span
                >
                <button
                  onclick="reductionNumberProductCart('${product.id}','${product.size}')"
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

const increaseNumberProductCart = (productId, productSize) => {
  const productCartQuantity = document.getElementById(`product-cart-quantity`);
  const findProduct = cart.find((product) => {
    return product.id === productId && productSize === product.size;
  });

  let count = Number(findProduct.quantity);
  if (count <= 9) {
    count += 1;
  }

  findProduct.quantity = count;
  showCurrentOrderProduct();
  saveCartInLocalStorage();
  CalculatingTotalPrice();
};

const reductionNumberProductCart = (productId, productSize) => {
  const productCartQuantity = document.getElementById(`product-cart-quantity`);
  const findProduct = cart.find((product) => {
    return product.id === productId && productSize === product.size;
  });

  let count = Number(findProduct.quantity);
  if (count != 1) {
    count -= 1;
  }

  findProduct.quantity = count;
  showCurrentOrderProduct();
  saveCartInLocalStorage();
  CalculatingTotalPrice();
};

const CalculatingTotalPrice = () => {
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
};

const showCheckoutModal = () => {
  checkoutModal.classList.remove("hidden");

  let productLength = 0;
  let totalPrice = 0;

  cart.forEach((product) => {
    productLength += +product.quantity;
    totalPrice += product.price;
  });
  checkoutHeaderProductLength.innerHTML = `
    ${productLength} item ·
    <span class="font-dmmono text-primary">$${totalPrice}</span>`;
};

const hideCheckoutModal = () => {
  checkoutModal.classList.add("hidden");
};

const changeToDineIn = () => {
  dineInBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-primary bg-primary/12 border-primary cursor-pointer";

  takeoutBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-secondary-text bg-cards border-primary/15 hover:text-primary hover:bg-primary/12 hover:border-primary cursor-pointer";

  checkoutModalInputLable.textContent = "Table Number";
  checkoutModalInput.placeholder = "e.g. 12";
  checkoutModalInput.type = "number";
  checkoutModalInput.value = "";

  checkoutBtn.className =
    "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";
};

const changeToTakeout = () => {
  takeoutBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-primary bg-primary/12 border-primary cursor-pointer";

  dineInBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-secondary-text bg-cards border-primary/15 hover:text-primary hover:bg-primary/12 hover:border-primary cursor-pointer";

  checkoutModalInputLable.textContent = "Delivery Address";
  checkoutModalInput.placeholder = "address...";
  checkoutModalInput.type = "text";
  checkoutModalInput.value = "";

  checkoutBtn.className =
    "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";
};

const finallyCheckout = async () => {
  let deliveryDetails = null;
  if (checkoutModalInput.value.trim()) {
    if (checkoutModalInput.type == "number") {
      console.log("number");
    } else {
      deliveryDetails = { delivery_address: checkoutModalInput.value };
    }
  }

  // set Delivery Details to server
  await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/delivery_details",
    {
      method: "POST",
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(deliveryDetails),
    },
  );

  const newDeliveryDetailsRes = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/delivery_details",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );

  const newDeliveryDetails = await newDeliveryDetailsRes.json();
  const findDeliveryDetail = newDeliveryDetails.find((findDeliveryDetail) => {
    return (
      findDeliveryDetail.delivery_address ===
        deliveryDetails.delivery_address ||
      findDeliveryDetail.table_id === deliveryDetails.table_id
    );
  });

  // set Orders to server
  const orders = {
    customer_id: "7cb2db73-8d12-4568-8dda-57eb2a1b224a",
    delivery_detail_id: findDeliveryDetail.id,
    is_delivered: false,
  };
  await fetch("https://bqpbxsyxslyednegacov.supabase.co/rest/v1/orders", {
    method: "POST",
    headers: {
      apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      Authorization: " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(orders),
  });

  const newOrdersRes = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/orders",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );

  const newOrders = await newOrdersRes.json();
  const findOrder = newOrders.find((findDeliveryDetail) => {
    return (
      findDeliveryDetail.delivery_address ===
        deliveryDetails.delivery_address ||
      findDeliveryDetail.table_id === deliveryDetails.table_id
    );
  });

  // add cart product to server
  cart.forEach(async (product) => {
    const newProduct = {
      order_id: findOrder.id,
      product_id: product.id,
      quantity: +product.quantity,
      size: product.size,
      unit_price: product.price,
    };

    const response = await fetch(
      "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/order_items",
      {
        method: "POST",
        headers: {
          apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          Authorization:
            " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(newProduct),
      },
    );
  });
};

openCartBtn.addEventListener("click", showShoppingCartModal);
shoppingCartCloseBtn.addEventListener("click", hideShoppingCartModal);
shoppingCartBg.addEventListener("click", hideShoppingCartModal);

currentOrderBtn.addEventListener("click", showCurrentOrder);
pastOrdersBtn.addEventListener("click", showPastOrders);

proceedCheckoutBtn.addEventListener("click", showCheckoutModal);
closeCheckoutModalBtn.addEventListener("click", hideCheckoutModal);
checkoutModalBg.addEventListener("click", hideCheckoutModal);
dineInBtn.addEventListener("click", changeToDineIn);
takeoutBtn.addEventListener("click", changeToTakeout);
checkoutModalInput.addEventListener("keyup", () => {
  if (checkoutModalInput.value.trim()) {
    checkoutBtn.className =
      "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-background bg-primary cursor-pointer";
  } else {
    checkoutBtn.className =
      "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";
  }
});
checkoutBtn.addEventListener("click", finallyCheckout);
