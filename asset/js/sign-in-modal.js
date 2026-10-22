const signInModal = document.getElementById("sign-in-modal");
const showSignInBtns = document.querySelectorAll("#show-sign-in-btn");
const signInModalCloseBtn = document.getElementById("sign-in-modal-close-btn");
const signInModalBg = document.getElementById("sign-in-modal-bg");

const showSignInModal = () => {
  signInModal.classList.remove("hidden");

  menuHandler();
};

const hideSignInModal = () => {
  signInModal.classList.add("hidden");
};

showSignInBtns.forEach((showSignInBtn) => {
  showSignInBtn.addEventListener("click", showSignInModal);
});
signInModalCloseBtn.addEventListener("click", hideSignInModal);
signInModalBg.addEventListener("click", hideSignInModal);
