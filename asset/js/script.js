const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", function () {
  if (mobileNav.className.includes("opacity-0")) {
    mobileNav.classList.remove("opacity-0");
    mobileNav.classList.add("opacity-100");
    mobileNav.classList.remove("h-0");
    mobileNav.classList.add("h-[164px]");
    menuToggle.innerHTML = `
        <svg
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="lucide lucide-x w-4 h-4" 
        data-fg-d3bl31="0.8:48.20003:node_modules/lucide-react:345:29:11393:25:e:X::::::TvS" data-fgid-d3bl31=":rh:">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
        </svg>`;
  } else {
    mobileNav.classList.add("opacity-0");
    mobileNav.classList.remove("opacity-100");
    mobileNav.classList.remove("h-[164px]");
    mobileNav.classList.add("h-0");

    menuToggle.innerHTML = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-menu w-4 h-4"
        data-fg-d3bl32="0.8:48.20003:node_modules/lucide-react:345:57:11421:28:e:Menu::::::D5X5"
        data-fgid-d3bl32=":rh:"
        >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>`;
  }
});
