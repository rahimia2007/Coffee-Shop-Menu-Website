const signInModal = document.getElementById("sign-in-modal");
const showSignInBtns = document.querySelectorAll("#show-sign-in-btn");
const signInModalCloseBtn = document.getElementById("sign-in-modal-close-btn");
const signInModalBg = document.getElementById("sign-in-modal-bg");
const signInTabBtn = document.getElementById("sign-in-tab-btn");
const createAccountTabBtn = document.getElementById("create-account-tab-btn");
const createOneAccountBtn = document.getElementById("create-one-account-btn");
const signInSection = document.getElementById("sign-in-section");
const createAccountSection = document.getElementById("create-account-section");

const signInEmail = document.getElementById("");
const signInPassword = document.getElementById("sign-in-password");

const createAccountFullName = document.getElementById(
  "create-account-full-name",
);
const createAccountEmail = document.getElementById("create-account-email");
const createAccountPassword = document.getElementById(
  "create-account-password",
);
const createAccountConfirmPassword = document.getElementById(
  "create-account-confirm-password",
);

const showSignInModal = () => {
  signInModal.classList.remove("hidden");

  const mobileNav = document.getElementById("mobile-nav");

  if (mobileNav.className.includes("opacity-100")) {
    mobileNav.classList.add("opacity-0");
    mobileNav.classList.remove("opacity-100");
    mobileNav.classList.remove("h-[260px]");
    mobileNav.classList.add("h-0");
    mobileNav.classList.add("-translate-y-96");

    menuToggle.innerHTML = "";
    menuToggle.innerHTML = `<i data-lucide="menu" class="w-4 h-4"></i> `;

    // For convert icons to SVG
    lucide.createIcons();
  }

  // menuHandler();
  showsignInSection();
};

const hideSignInModal = () => {
  signInModal.classList.add("hidden");
};

const showsignInSection = () => {
  signInTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary text-background";
  createAccountTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-cards text-secondary-text";

  signInSection.classList.remove("hidden");
  createAccountSection.classList.add("hidden");

  signInEmail ? (signInEmail.value = "") : null;
  signInPassword ? (signInPassword.value = "") : null;
};

const showCreateAccountSection = () => {
  createAccountTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary text-background";
  signInTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-cards text-secondary-text";

  createAccountSection.classList.remove("hidden");
  signInSection.classList.add("hidden");

  createAccountFullName ? (createAccountFullName.value = "") : null;
  createAccountEmail ? (createAccountEmail.value = "") : null;
  createAccountPassword ? (createAccountPassword.value = "") : null;
  createAccountConfirmPassword
    ? (createAccountConfirmPassword.value = "")
    : null;
};

showSignInBtns.forEach((showSignInBtn) => {
  showSignInBtn.addEventListener("click", showSignInModal);
});
signInModalCloseBtn.addEventListener("click", hideSignInModal);
signInModalBg.addEventListener("click", hideSignInModal);
signInTabBtn.addEventListener("click", showsignInSection);
createAccountTabBtn.addEventListener("click", showCreateAccountSection);
createOneAccountBtn.addEventListener("click", showCreateAccountSection);

export { hideSignInModal, showSignInModal };
