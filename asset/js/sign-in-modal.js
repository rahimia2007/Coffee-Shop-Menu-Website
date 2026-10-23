const signInModal = document.getElementById("sign-in-modal");
const showSignInBtns = document.querySelectorAll("#show-sign-in-btn");
const signInModalCloseBtn = document.getElementById("sign-in-modal-close-btn");
const signInModalBg = document.getElementById("sign-in-modal-bg");
const signInTabBtn = document.getElementById("sign-in-tab-btn");
const createAccountTabBtn = document.getElementById("create-account-tab-btn");
const createOneAccountBtn = document.getElementById("create-one-account-btn");
const signInSection = document.getElementById("sign-in-section");
const createAccountSection = document.getElementById("create-account-section");

const showSignInModal = () => {
  signInModal.classList.remove("hidden");

  menuHandler();
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
};

const showCreateAccountSection = () => {
  createAccountTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary text-background";
  signInTabBtn.className =
    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-cards text-secondary-text";

  createAccountSection.classList.remove("hidden");
  signInSection.classList.add("hidden");
};

showSignInBtns.forEach((showSignInBtn) => {
  showSignInBtn.addEventListener("click", showSignInModal);
});
signInModalCloseBtn.addEventListener("click", hideSignInModal);
signInModalBg.addEventListener("click", hideSignInModal);
signInTabBtn.addEventListener("click", showsignInSection);
createAccountTabBtn.addEventListener("click", showCreateAccountSection);
createOneAccountBtn.addEventListener("click", showCreateAccountSection);
