// Shared helpers for the SecondChance front-end pages
const API = ''

function getUser () {
  return {
    token: sessionStorage.getItem('auth-token'),
    name: sessionStorage.getItem('name'),
    email: sessionStorage.getItem('email')
  }
}

function renderNavbar () {
  const user = getUser()
  const nav = document.getElementById('navbar')
  const right = user.token
    ? `<span class="welcome">Welcome, <b>${user.name}</b></span>
       <a href="#" onclick="logout()">Logout</a>`
    : '<a href="/app/login.html">Login</a><a href="/app/register.html">Register</a>'
  nav.innerHTML = `
    <a class="brand" href="/">SecondChance</a>
    <a href="/app/main.html">Home</a>
    <a href="/app/search.html">Search</a>
    <span class="spacer"></span>
    ${right}`
}

function logout () {
  sessionStorage.clear()
  window.location.href = '/app/main.html'
}

function itemCard (item) {
  return `
    <div class="card">
      <div class="img">${item.category}</div>
      <h3>${item.name}</h3>
      <p class="muted">${item.condition} · ${item.age_years} years</p>
      <p>${item.description}</p>
      <a class="button" href="/app/details.html?id=${item.id}">View Details</a>
    </div>`
}

document.addEventListener('DOMContentLoaded', renderNavbar)
