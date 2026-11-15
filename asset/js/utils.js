import { showSignInModal } from "./sign-in-modal.js";

const accessModal = document.getElementById("access-modal");
const accessModalIcon = document.getElementById("access-modal-icon");
const accessModalTitle = document.getElementById("access-modal-title");
const accessModalDescription = document.getElementById(
  "access-modal-description",
);

const productFetch = async () => {
  const productResponse = await fetch(
    "https://bqpbxsyxslyednegacov.supabase.co/rest/v1/products?select=*",
    {
      headers: {
        apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        Authorization: "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
      },
    },
  );
  return await productResponse.json();
};

const showAccessModal = (icon, title, description) => {
  accessModalIcon.innerHTML = `<i data-lucide=${icon} class='w-8 h-8 text-primary'></i>`;
  lucide.createIcons();
  accessModalTitle.innerHTML = title;
  accessModalDescription.innerHTML = description;
  accessModal.classList.remove("hidden");

  setTimeout(() => {
    accessModal.classList.add("hidden");
  }, 3000);
};

const isSignIn = () => {
  const userIdCookies = document.cookie.split("; ");
  let userId = null;
  userIdCookies.some((userIdCookie) => {
    if (userIdCookie.includes("userId")) {
      userId = userIdCookie.slice(userIdCookie.indexOf("=") + 1);
      return true;
    }
  });

  return userId;
};

const logoutHandler = () => {
  document.cookie = `userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  location.href = "";
};

const executeOrLogin = (callback) => {
  if (isSignIn()) {
    callback();
  } else {
    showSignInModal();
  }
};

const loadingHandler = () => {
  const loading = document.getElementById("loading");
  loading.classList.add("hidden");
};

const getCartFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  if (data) {
    return data;
  }
};

const saveCartInLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export {
  productFetch,
  showAccessModal,
  isSignIn,
  logoutHandler,
  executeOrLogin,
  loadingHandler,
  saveCartInLocalStorage,
  getCartFromLocalStorage,
};
