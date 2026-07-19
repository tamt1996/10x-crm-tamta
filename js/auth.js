console.log("AUTH JS WORKING");

function logout() {

  const sessionExists =
    localStorage.getItem("crm_session");

  if (sessionExists) {
    localStorage.removeItem("crm_session");
  }

  window.location.href = "index.html";
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}