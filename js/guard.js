
console.log("GUARD JS WORKING");


const session =
JSON.parse(localStorage.getItem("crm_session"));


// დაცული გვერდები
const protectedPages = [
    "dashboard.html",
    "clients.html",
    "profile.html"
];


// საჯარო გვერდები
const publicPages = [
    "index.html",
    "signup.html",
];


// მიმდინარე ფაილის სახელი
const currentPage =
window.location.pathname.split("/").pop();



// ===============================
// PROTECTED PAGE CHECK
// ===============================

if(protectedPages.includes(currentPage)){

    if(!session){

        window.location.href = "index.html";

    }

}



// ===============================
// PUBLIC PAGE CHECK
// ===============================

if(publicPages.includes(currentPage)){

    if(session){

        window.location.href = "dashboard.html";

    }

}