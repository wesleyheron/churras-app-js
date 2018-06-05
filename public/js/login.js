var authEmailPassButton = document.getElementById('authEmailPassButton');

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

var userName = document.getElementById('displayName');

authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            window.location.href = "index.html";
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.');
        });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        alert('Você está conectado com: ' + user.email);
    } else {
        alert('Você está desconectado!');
    }
});
