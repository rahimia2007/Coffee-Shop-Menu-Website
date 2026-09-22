const dayEls = document.querySelectorAll("#day");

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
