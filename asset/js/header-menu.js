import { isSignIn, logoutHandler } from "./utils.js";

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const showSignInBtns = document.querySelectorAll("#show-sign-in-btn");
const whenUserSignInBtn = document.getElementById("when-user-sign-in-btn");
const whenUserSignInName = document.getElementById("when-user-sign-in-name");
const whenUserSignInNameFirstLetterEls = document.querySelectorAll(
  "#when-user-sign-in-name-first-letter",
);
const userSignInInfo = document.getElementById("user-sign-in-info");
const userSignInNameEls = document.querySelectorAll("#user-sign-in-name");
const userSignInEmailEls = document.querySelectorAll("#user-sign-in-email");
const logoutBtns = document.querySelectorAll("#logout-btn");

const userMobileSignInInfo = document.getElementById(
  "user-mobile-sign-in-info",
);

const menuHandler = () => {
  if (mobileNav.className.includes("opacity-0")) {
    mobileNav.classList.remove("opacity-0");
    mobileNav.classList.add("opacity-100");
    mobileNav.classList.remove("h-0");
    mobileNav.classList.add("h-[300px]");
    mobileNav.classList.remove("-translate-y-52");
    mobileNav.classList.add("-translate-x-0");

    menuToggle.innerHTML = "";
    menuToggle.innerHTML = `<i data-lucide="x" class="w-4 h-4"></i>`;

    // For convert icons to SVG
    lucide.createIcons();
  } else {
    mobileNav.classList.add("opacity-0");
    mobileNav.classList.remove("opacity-100");
    mobileNav.classList.remove("h-[260px]");
    mobileNav.classList.add("h-0");
    mobileNav.classList.add("-translate-y-52");

    menuToggle.innerHTML = "";
    menuToggle.innerHTML = `<i data-lucide="menu" class="w-4 h-4"></i> `;

    // For convert icons to SVG
    lucide.createIcons();
  }
};

window.addEventListener("load", async () => {
  const signInUserId = isSignIn();

  if (signInUserId) {
    showSignInBtns[0].classList.remove("md:flex");
    showSignInBtns[1].classList.add("hidden");
    whenUserSignInBtn.classList.add("md:flex");
    userMobileSignInInfo.classList.remove("hidden");

    const userResponse = await fetch(
      `https://bqpbxsyxslyednegacov.supabase.co/rest/v1/users?id=eq.${signInUserId}`,
      {
        headers: {
          apikey: "sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
          Authorization:
            "Bearer sb_publishable_ktxKs7HPRQ2TLuXndm9hAg_Ls6AAIjJ",
        },
      },
    );
    const user = await userResponse.json();
    whenUserSignInName.innerHTML = user[0].full_name;
    whenUserSignInNameFirstLetterEls.forEach(
      (whenUserSignInNameFirstLetter) => {
        whenUserSignInNameFirstLetter.innerHTML = user[0].full_name.slice(0, 1);
      },
    );

    userSignInNameEls.forEach((userSignInNameEl) => {
      userSignInNameEl.innerHTML = user[0].full_name;
    });

    userSignInEmailEls.forEach((userSignInEmailEl) => {
      userSignInEmailEl.innerHTML = user[0].email;
    });
  }
});

logoutBtns.forEach((logoutBtn) => {
  logoutBtn.addEventListener("click", logoutHandler);
});

whenUserSignInBtn.addEventListener("click", () => {
  userSignInInfo.classList.toggle("hidden");
});

menuToggle.addEventListener("click", menuHandler);

export { menuHandler };
