console.log("COMMON JS WORKING");

// ================= TOAST =================

function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.classList.add("toast", type);

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);

}

// ================= THEME =================

function applyTheme() {

    const theme =
        localStorage.getItem("crm_theme") || "dark";

    document.body.classList.remove(
        "dark",
        "light"
    );

    document.body.classList.add(theme);

}

function toggleTheme() {

    const currentTheme =
        localStorage.getItem("crm_theme") || "dark";

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    localStorage.setItem(
        "crm_theme",
        newTheme
    );

    applyTheme();

    showToast(
        `Theme changed to ${newTheme}`,
        "success"
    );

}

// ================= INIT =================

applyTheme();

const themeBtn =
    document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        toggleTheme
    );

}