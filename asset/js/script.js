const dayEls = document.querySelectorAll("#day");

const categoriesContainer = document.getElementById("categories-container");
const bestSellersContainer = document.getElementById("best-sellers-container");
let products = [];

const weekDaysHandeler = (() => {
  const weekDaysName = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const today = new Date().getDay();

  dayEls.forEach((day) => {
    if (day.innerHTML === weekDaysName[today]) {
      day.innerHTML += `<span class="ml-2 text-xs font-dmmono opacity-60">(today)</span>`;
      day.className = "text-sm font-medium text-primary";
      const workHoursEls = day.nextElementSibling;
      workHoursEls.className = "text-sm font-dmmono text-primary-text";
    }
  });
})();

window.addEventListener("load", async () => {
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
  let categoriesProduct = [];

  categoriesData.forEach((category) => {
    categoriesProduct = products.filter((product) => {
      return category.id === product.category_id;
    });
    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <a href="./public/menu.html?category=${category.name.split(" ").join("-")}" class="relative group rounded-2xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-56 bg-cards cursor-pointer">
        <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" src="./asset/img/${category.img_url}" alt="">
        <div class="absolute inset-0 z-5 bg-linear-to-b from-background/0 via-background/18 to-background/88"></div>
        <div class="absolute inset-0 z-6 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div class="absolute bottom-5 left-5 flex flex-col justify-end z-10">
          <span class="text-xs font-dmmono mb-1.5 text-primary">${categoriesProduct.length} items</span>
          <h3 class="text-base font-bold leading-tight mb-1 font-Playfair text-primary-text">
            ${category.name}
          </h3>
          <p class="text-xs leading-snug text-secondary-text">
            ${categoriesProduct[0].name}, ${categoriesProduct[1].name} ${categoriesProduct[2] ? "," + categoriesProduct[2].name : ""}
          </p>
        </div>
      </a>
      `,
    );
    categoriesProduct = [];
  });

  const bestSellerProducts = products.filter(
    (product) => product.is_best_seller === true,
  );
  bestSellerProducts.forEach((product) => {
    console.log(product);
    bestSellersContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="group rounded-2xl overflow-hidden bg-elevated-cards border border-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div class="relative overflow-hidden h-74">
              <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="./asset/img/product-img/${product.image_url}" alt="">
              <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 bg-background/52">
              </div>
              <span class="absolute top-3 left-3 text-xs text-background bg-primary font-dmmono px-2.5 py-1 rounded-full font-medium">Best Seller</span>
          </div>
          <div class="p-4">
              <h3 class="text-primary-text font-semibold mb-1 text-sm">
              ${product.name}
              </h3>
              <p class="text-xs leading-relaxed mb-3 line-clamp-2 text-secondary-text">
              ${product.description}
              </p>
              <div class="flex items-center justify-between">
              <span class="font-dmmono text-sm font-bold text-primary">$${product.price}</span>
              <button onclick="showProductModal('${product.id}')" class="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80 bg-primary/15 text-primary border border-primary/25 cursor-pointer">
                  +add
              </button>
              </div>
          </div>
        </div>
      `,
    );
  });
});
