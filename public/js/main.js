document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});

var displayName = document.getElementById('displayName');
var displayNameMobile = document.getElementById('displayNameMobile');
var msgPrincipal = document.getElementById('msgPrincipal');


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    displayName.textContent = user.email;
    displayNameMobile.textContent = 'Sair';
    msgPrincipal.textContent = 'Bem vindo ao Churras - Admin';
  } else {
    alert('Você está desconectado!');
    msgPrincipal.textContent = 'Você não está conectado ao Sistema';
    displayNameMobile.textContent = 'Entrar';
  }
});

function signOut() {
  firebase.auth().signOut()
    .then(function () {
      window.location.href = "login.html";
    })
    .catch(function (error) {
      // An error happened
    });
}


