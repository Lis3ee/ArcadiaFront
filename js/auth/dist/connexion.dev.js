"use strict";

var mailInput = document.getElementById("EmailInput");
var passwordInput = document.getElementById("PasswordInput");
var btnConnexion = document.getElementById("btnConnexion");
btnConnexion.addEventListener("click", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(checkCredentials());

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error('Erreur lors de la vérification des identifiants :', _context.t0); // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
});

function checkCredentials() {
  var email, password, response, data, setToken, setCookie, showError;
  return regeneratorRuntime.async(function checkCredentials$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          showError = function _ref3(input, message) {
            input.classList.add("is-invalid");
            var feedback = input.nextElementSibling;
            feedback.textContent = message;
          };

          setCookie = function _ref2(name, value, days) {
            var expires = "";

            if (days) {
              var date = new Date();
              date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
              expires = "; expires=" + date.toUTCString();
            }

            document.cookie = name + "=" + (value || "") + expires + "; path=/";
          };

          setToken = function _ref(token) {
            localStorage.setItem("token", token);
          };

          email = mailInput.value;
          password = passwordInput.value;
          _context2.next = 7;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/process_connexion.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }));

        case 7:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 10;
            break;
          }

          throw new Error('Erreur réseau : ' + response.status);

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context2.sent;

          if (data.success) {
            console.log('Connexion réussie, rôle :', data.role); // Redirection vers la page appropriée en fonction du rôle

            window.location.replace('/home.html');
          } else {
            console.log('Connexion échouée :', data.message); // Afficher un message d'erreur à l'utilisateur
            // Exemple : Afficher un message d'erreur à l'utilisateur
            // Exemple:
          }

          btnConnexion.addEventListener("click", function (event) {
            event.preventDefault(); // Reset validation

            mailInput.classList.remove("is-invalid");
            passwordInput.classList.remove("is-invalid");
            checkCredentials();
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}