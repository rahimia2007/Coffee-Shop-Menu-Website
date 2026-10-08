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
const takeoutInput = document.getElementById("takeout-input");
const dineInInput = document.getElementById("dine-in-input");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutHeaderProductLength = document.getElementById(
  "checkout-header-product-length",
);
const pastCheckoutModal = document.getElementById("past-checkout-modal");

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

const showPastOrders = async () => {
  pastOrdersContent.classList.remove("hidden");
  currentOrderContent.classList.add("hidden");
  priceTotalContent.classList.add("hidden");
  pastOrdersBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-background";
  currentOrderBtn.className =
    "flex-1 py-2 rounded-xl text-sm font-medium transition-all bg-cards text-secondary-text";

  const pastOrdersRes = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/orders?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  const allPastOrders = await pastOrdersRes.json();

  const productsPastOrderRes = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/order_items?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  const productsPastOrder = await productsPastOrderRes.json();
  pastOrdersContent.innerHTML = "";
  let productForReOrder = [];
  if (productsPastOrder.length) {
    allPastOrders.forEach((order) => {
      pastOrdersContent.insertAdjacentHTML(
        "beforeend",
        `
        <div class="rounded-xl border border-primary/15 bg-cards">
          <div onclick="openAccordion('${order.id}')" class="w-full flex items-center justify-between p-4 text-lefl cursor-pointer">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="text-sm font-dmmono font-semibold text-primary-text"
                  >ORD-${order.id.slice(0, 4)}</span
                >
                ${
                  order.is_delivered
                    ? `
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium font-dmmono bg-[#4ade80]/13 text-[#4ade80]">
                    Delivered
                  </span>`
                    : `
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium font-dmmono bg-red-500/20 text-red-800">
                    unDelivered
                  </span>
                  `
                }
              </div>
              <p class="text-xs text-placeholders" id="order-date-${order.id}"></p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span id="past-orders-total-price" class="font-dmmono text-sm font-bold text-primary">
                $${productsPastOrder
                  .filter((productOrder) => productOrder.order_id === order.id)
                  .reduce((totalPrice, productOrder) => {
                    const forThisProducts = products.find(
                      (product) => product.id === productOrder.product_id,
                    );
                    if (forThisProducts) {
                      return (totalPrice +=
                        productOrder.unit_price * productOrder.quantity);
                    }
                    return totalPrice;
                  }, 0)}
              </span>
              <i
                id="past-order-accordion-icon-${order.id}"
                data-lucide="chevron-down"
                class="w-4 h-4 text-placeholders transition-all duration-300"
              ></i>
            </div>
          </div>
          <div id="order-${order.id}" class="invisible opacity-0 h-0 transition-all duration-300 overflow-hidden">
            <div class="space-y-1.5 mb-4">
              ${productsPastOrder
                .filter((productOrder) => productOrder.order_id === order.id)
                .map((productOrder) => {
                  const forThisProducts = products.find(
                    (product) => product.id === productOrder.product_id,
                  );
                  if (forThisProducts) {
                    productForReOrder.push({
                      id: forThisProducts.id,
                      image_url: forThisProducts.image_url,
                      name: forThisProducts.name,
                      price: forThisProducts.price,
                      quantity: productOrder.quantity,
                      size: productOrder.size,
                    });
                    return `
                    <div class="flex justify-between text-xs">
                      <span class="text-secondary-text">${productOrder.quantity}x ${forThisProducts.name}</span>
                      <span class="font-dmmono text-primary-text">$${+productOrder.unit_price * +productOrder.quantity}</span>
                    </div>
                    `;
                  }
                  const pastOrdersTotalPrice = document.getElementById(
                    "past-orders-total-price",
                  );

                  if (pastOrdersTotalPrice.textContent.trim()) {
                    pastOrdersTotalPrice.textContent =
                      productOrder.unit_price * productOrder.quantity;
                  } else {
                    pastOrdersTotalPrice.textContent +=
                      productOrder.unit_price * productOrder.quantity;
                  }
                })
                .join("")}
            </div>
            <button
            onclick="reOrder(${JSON.stringify(productForReOrder).replace(/"/g, "&quot;")})"
              class="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 bg-primary/13 text-primary border border-primary"
            >
              Reorder
            </button>
          </div>
        </div>
      `,
      );

      productForReOrder = [];

      const orderDate = document.getElementById(`order-date-${order.id}`);
      const pureOrderDate = new Date(order.order_date);
      orderDate.textContent = `${pureOrderDate.toLocaleDateString("en-US", { month: "long" })} ${pureOrderDate.getDay()} ,${pureOrderDate.getFullYear()}`;
    });
  } else {
    pastOrdersContent.innerHTML =
      "<p class='text-secondary-text'>You haven't made any purchases yet.</p>";
  }
  // For convert icons to SVG
  lucide.createIcons();
};

const openAccordion = (orderId) => {
  const orderContent = document.getElementById(`order-${orderId}`);
  const pastOrderAccordionIcon = document.getElementById(
    `past-order-accordion-icon-${orderId}`,
  );

  if (
    orderContent.className ===
    "px-4 pb-4 pt-3 border-t text-primary/15 transition-all duration-300 opacity-100 overflow-hidden"
  ) {
    orderContent.className =
      "invisible opacity-0 h-0 transition-all duration-300 overflow-hidden";
    pastOrderAccordionIcon.classList.remove("rotate-180");
  } else {
    orderContent.className =
      "px-4 pb-4 pt-3 border-t text-primary/15 transition-all duration-300 opacity-100 overflow-hidden";
    pastOrderAccordionIcon.classList.add("rotate-180");
  }
};

const reOrder = (orderProducts) => {
  const missingInCart = orderProducts.filter((orderProduct) => {
    return !cart.some((cartproduct) => {
      return cartproduct.id === orderProduct.id;
    });
  });

  if (missingInCart.length) {
    cart = [...cart, ...missingInCart];
    saveCartInLocalStorage();
  }
};

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

  showTablesInList();
};

const hideCheckoutModal = () => {
  checkoutModal.classList.add("hidden");
  takeoutInput.value = "";
  dineInInput.value = "";
};

const changeToDineIn = () => {
  dineInBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-primary bg-primary/12 border-primary cursor-pointer";

  takeoutBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-secondary-text bg-cards border-primary/15 hover:text-primary hover:bg-primary/12 hover:border-primary cursor-pointer";

  checkoutModalInputLable.textContent = "Table Number";
  takeoutInput.classList.add("hidden");
  dineInInput.classList.remove("hidden");
  takeoutInput.value = "";

  showTablesInList();

  checkoutBtn.className =
    "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";
};

const changeToTakeout = () => {
  takeoutBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-primary bg-primary/12 border-primary cursor-pointer";

  dineInBtn.className =
    "flex flex-col items-center gap-2.5 py-5 rounded-2xl border transition-all text-secondary-text bg-cards border-primary/15 hover:text-primary hover:bg-primary/12 hover:border-primary cursor-pointer";

  checkoutModalInputLable.textContent = "Delivery Address";
  dineInInput.classList.add("hidden");
  takeoutInput.classList.remove("hidden");

  checkoutBtn.className =
    "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";

  // To return to the default value
  showTablesInList();
};

const showTablesInList = async () => {
  const tableResponse = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/tables?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  const tables = await tableResponse.json();
  dineInInput.innerHTML = "";

  dineInInput.insertAdjacentHTML(
    "beforeend",
    `
    <option value="" class="text-primary-text border border-primary/15" disabled selected>Select the desired table.</option>
    ${tables
      .map((table) => {
        return `<option value="${table.id}" class="text-primary-text border border-primary/15">table ${table.table_number}</option>`;
      })
      .join("")}
    `,
  );
};

const finallyCheckout = async () => {
  let deliveryDetails = null;
  if (takeoutInput.value.trim() || dineInInput.value) {
    if (takeoutInput.className.includes("hidden")) {
      deliveryDetails = { table_id: dineInInput.value };
    } else {
      deliveryDetails = { delivery_address: takeoutInput.value.trim() };
    }

    // set Delivery Details to server
    await fetch(
      "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/delivery_details",
      {
        method: "POST",
        headers: {
          apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          Authorization:
            " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
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
          Authorization:
            " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
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

    if (findDeliveryDetail) {
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
          Authorization:
            " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
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
            Authorization:
              " Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          },
        },
      );

      const newOrders = await newOrdersRes.json();
      const findOrder = newOrders.find((newOrder) => {
        return newOrder.delivery_detail_id === findDeliveryDetail.id;
      });

      if (findOrder) {
        // add Cart Product to server
        cart.forEach(async (product) => {
          const newProduct = {
            order_id: findOrder.id,
            product_id: product.id,
            quantity: +product.quantity,
            size: product.size,
            unit_price: product.price,
          };

          await fetch(
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

        localStorage.clear();
        cart = [];
        showCurrentOrderProduct();
        hideCheckoutModal();
        showPastCheckoutModal();
      }
    }
  }
};

const showPastCheckoutModal = () => {
  pastCheckoutModal.classList.remove("hidden");

  setTimeout(() => {
    pastCheckoutModal.classList.add("hidden");
  }, 3000);
};

const activeCheckoutBtn = () => {
  if (dineInInput.value || takeoutInput.value.trim()) {
    checkoutBtn.className =
      "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-background bg-primary cursor-pointer";
  } else {
    checkoutBtn.className =
      "w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95 text-placeholders bg-primary/25";
  }
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
takeoutInput.addEventListener("keyup", activeCheckoutBtn);
dineInInput.addEventListener("change", activeCheckoutBtn);
checkoutBtn.addEventListener("click", finallyCheckout);
