console.log("DASHBOARD JS WORKING");


// ================= DATA =================

function getClients() {
  return JSON.parse(localStorage.getItem("crm_clients")) || [];
}

function getUsers() {
  return JSON.parse(localStorage.getItem("crm_users")) || [];
}


let clients = getClients();

console.log("DASHBOARD CLIENTS:", clients.length);

const users = getUsers();

const currentSession =
  JSON.parse(localStorage.getItem("crm_session"));


// ================= USER NAME =================

const userName =
  document.getElementById("userName");

if (currentSession) {

  const user = users.find(
    user => user.id === currentSession.userId
  );

  if (user && userName) {

    const firstName =
      user.fullName.split(" ")[0];

    userName.textContent = firstName;
  }
}


// ================= CLOCK =================

function updateClock() {

  const clock =
    document.getElementById("clock");

  if (!clock) return;

  const now = new Date();

  clock.textContent =
    `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

updateClock();

setInterval(updateClock, 1000);


// ================= DASHBOARD UPDATE =================

function updateDashboard() {

  clients = getClients();

  console.log(
    "UPDATED CLIENTS:",
    clients.length
  );


  // TOTAL CLIENTS

  const totalClients =
    document.getElementById("totalClients");

  if (totalClients) {

    totalClients.textContent =
      clients.length;
  }



  // ACTIVE DEALS

  const activeDeals =
    document.getElementById("activeDeals");

  if (activeDeals) {

    const activeCount =
      clients.filter(
        client =>
          client.status === "Lead" ||
          client.status === "Contacted"
      ).length;

    activeDeals.textContent =
      activeCount;
  }



  // WON REVENUE

  const wonRevenue =
    document.getElementById("wonRevenue");


  if (wonRevenue) {

    const revenue =
      clients
        .filter(
          client =>
            client.status === "Won"
        )
        .reduce(
          (sum, client) =>
            sum + (client.dealValue || 0),
          0
        );


    wonRevenue.textContent =
      "$" + revenue.toLocaleString();

  }



  // NEW THIS WEEK

  const newThisWeek =
    document.getElementById("newThisWeek");


  if (newThisWeek) {

    const weekAgo = new Date();

    weekAgo.setDate(
      weekAgo.getDate() - 7
    );


    const recentClients =
      clients.filter(client =>
        client.createdAt &&
        new Date(client.createdAt) > weekAgo
      );


    newThisWeek.textContent =
      recentClients.length;
  }



  // PIPELINE

  const pipelineOverview =
    document.getElementById(
      "pipelineOverview"
    );


  if (pipelineOverview) {

    const leadCount =
      clients.filter(
        client => client.status === "Lead"
      ).length;


    const contactedCount =
      clients.filter(
        client => client.status === "Contacted"
      ).length;


    const wonCount =
      clients.filter(
        client => client.status === "Won"
      ).length;


    const lostCount =
      clients.filter(
        client => client.status === "Lost"
      ).length;



    pipelineOverview.innerHTML = `
      <p>Leads: ${leadCount}</p>
      <p>Contacted: ${contactedCount}</p>
      <p>Won: ${wonCount}</p>
      <p>Lost: ${lostCount}</p>
      <p>Total: ${clients.length}</p>
    `;
  }



  // RECENT CLIENTS

  const recentClientsBox =
    document.getElementById(
      "recentClients"
    );


  if (recentClientsBox) {

    const latestClients =
      [...clients]
        .sort(
          (a,b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0,5);


    if (latestClients.length === 0) {

      recentClientsBox.innerHTML =
        "<p>No clients yet.</p>";

    } else {

      recentClientsBox.innerHTML =
        latestClients
          .map(
            client => `
              <p>
                ${client.name}
                (${client.company})
              </p>
            `
          )
          .join("");
    }
  }

}


// run after page load
window.addEventListener(
  "load",
  updateDashboard
);