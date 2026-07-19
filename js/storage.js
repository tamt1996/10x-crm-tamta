// Helper functions to manage CRM data in LocalStorage.
// Provides fallback to initial state if no data exists.

// ================= USERS =================

function getUsers(){

    return JSON.parse(
        localStorage.getItem("crm_users")
    ) || [];

}


function saveUsers(users){

    localStorage.setItem(
        "crm_users",
        JSON.stringify(users)
    );

}



// ================= SESSION =================
// Returns current authenticated session

function getSession(){

    try{

        return JSON.parse(
            localStorage.getItem("crm_session")
        );

    }catch(error){

        return null;

    }

}



function saveSession(session){

    localStorage.setItem(
        "crm_session",
        JSON.stringify(session)
    );

}



function removeSession(){

    localStorage.removeItem(
        "crm_session"
    );

}



// ================= CLIENTS =================


function getClients(){

    return JSON.parse(
        localStorage.getItem("crm_clients")
    ) || [];

}



function saveClients(clients){

    localStorage.setItem(
        "crm_clients",
        JSON.stringify(clients)
    );

}



// ================= THEME =================


function getTheme(){

    return localStorage.getItem("crm_theme") || "dark";

}



function saveTheme(theme){

    localStorage.setItem(
        "crm_theme",
        theme
    );

}