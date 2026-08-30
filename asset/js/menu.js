const productContainer = document.getElementById("product-container");

let products = null;

const fetchProducts = () => {
  fetch("https://bqpbxsyxslyednegacov.supabase.co/rest/v1/products?select=*", {
    headers: {
      apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      showProduct(products);
    });
};

const showProduct = (products) => {
  console.log(products);

  products.forEach((product) => {
    productContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="group rounded-2xl overflow-hidden bg-elevated-cards border border-primary/15 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
        <div class="relative overflow-hidden h-74">
            <img
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="../asset/img/product-img/${product.image_url}"
            alt=""
            />
            <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/52"
            >
            <button
                class="text-xs font-semibold px-3 py-1.5 rounded-full text-primary-text border border-primary-text/27 bg-background/72 cursor-pointer"
            >
                View Details
            </button>
            </div>
            <span
            class="absolute top-3 left-3 text-xs text-background bg-primary font-dmmono px-2.5 py-1 rounded-full font-medium"
            >Best Seller</span
            >
        </div>
        <div class="p-4">
            <h3 class="text-primary-text font-semibold mb-1 text-sm">
            ${product.name}
            </h3>
            <p
            class="text-xs leading-relaxed mb-3 line-clamp-2 text-secondary-text"
            >
            ${product.description}
            </p>
            <div class="flex items-center justify-between">
            <span class="font-dmmono text-sm font-bold text-primary"
                >$${product.price}</span
            >
            <button
                class="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80 bg-primary/15 text-primary border border-primary/25 cursor-pointer"
            >
                +add
            </button>
            </div>
        </div>
        </div>

        `,
    );
  });
};

window.addEventListener("load", fetchProducts);
