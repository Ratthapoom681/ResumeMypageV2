const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

let currentPage = 0;
let isScrolling = false;

/* Change Page */
function setActivePage(index) {
    if (index < 0 || index >= pages.length) return;
    if (isScrolling) return;

    isScrolling = true;

    pages[currentPage].classList.remove("active");
    pages[index].classList.add("active");

    navLinks.forEach(link => link.classList.remove("active"));
    navLinks[index].classList.add("active");

    currentPage = index;

    setTimeout(() => {
        isScrolling = false;
    }, 400);
}

/* Scroll Navigation */
window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) setActivePage(currentPage + 1);
    else setActivePage(currentPage - 1);
});

/* Sidebar Click */
navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        setActivePage(index);
    });
});