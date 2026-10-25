const accessModal = document.getElementById("access-modal");
const accessModalTitle = document.getElementById("access-modal-title");
const accessModalDescription = document.getElementById(
  "access-modal-description",
);

const showAccessModal = (title, description) => {
  accessModalTitle.innerHTML = title;
  accessModalDescription.innerHTML = description;
  accessModal.classList.remove("hidden");

  setTimeout(() => {
    accessModal.classList.add("hidden");
  }, 3000);
};

export { showAccessModal };