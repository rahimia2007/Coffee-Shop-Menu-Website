const productContainer = document.getElementById("product-container");
const categoriesContainer = document.getElementById("categories-container");

let products = null;

const fetchHandler = async () => {
  const productResponse = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/products?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  products = await productResponse.json();

  const categoriesResponse = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/categories?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  const categoriesData = await categoriesResponse.json();

  showCategories(categoriesData);
  showProduct(categoriesData[0].id);
};

const showProduct = (categoryId) => {
  productContainer.innerHTML = "";
  const findProducts = products.filter((product) => {
    return product.category_id === categoryId;
  });

  findProducts.forEach((product) => {
    productContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
      onclick='showProductModal("${product.id}")'
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

const showCategories = (categories) => {
  categories.forEach((category) => {
    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <button onclick="showProduct('${category.id}')" class="px-4 py-2 rounded-full text-sm font-medium transition-all bg-transparent text-secondary-text border border-primary/15 hover:bg-primary hover:text-background cursor-pointer">
        ${category.name}
      </button>
      `,
    );
  });

  const categoryBtns = categoriesContainer.querySelectorAll("button");
  categoryBtns[0].className =
    "px-4 py-2 rounded-full text-sm font-medium transition-all bg-primary text-background cursor-pointer";
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((btn) => {
        btn.className =
          "px-4 py-2 rounded-full text-sm font-medium transition-all bg-transparent text-secondary-text border border-primary/15 hover:bg-primary hover:text-background cursor-pointer";
      });
      btn.className =
        "px-4 py-2 rounded-full text-sm font-medium transition-all bg-primary text-background cursor-pointer";
    });
  });
};

window.addEventListener("load", fetchHandler);
