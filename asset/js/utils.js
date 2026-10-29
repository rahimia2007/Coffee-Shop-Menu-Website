const accessModal = document.getElementById("access-modal");
const accessModalIcon = document.getElementById("access-modal-icon");
const accessModalTitle = document.getElementById("access-modal-title");
const accessModalDescription = document.getElementById(
  "access-modal-description",
);

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

export { showAccessModal };
