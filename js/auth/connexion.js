const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnConnexion = document.getElementById("btnConnexion");

btnConnexion.addEventListener("click", async function() {
    try {
        await checkCredentials();
    } catch (error) {
        console.error('Erreur lors de la vérification des identifiants :', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
    }
});

async function checkCredentials() {
    const email = mailInput.value;
    const password = passwordInput.value;

    const response = await fetch('http://localhost:3000/process_connexion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (!response.ok) {
        throw new Error('Erreur réseau : ' + response.status);
    }

    const data = await response.json();

    if (data.success) {
        console.log('Connexion réussie, rôle :', data.role);
        // Redirection vers la page appropriée en fonction du rôle
        window.location.replace('/home.html');
    } else {
        console.log('Connexion échouée :', data.message);
        // Afficher un message d'erreur à l'utilisateur
        // Exemple : Afficher un message d'erreur à l'utilisateur
        // Exemple:
    }

function setToken(token) {
    localStorage.setItem("token", token);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

btnConnexion.addEventListener("click", function (event) {
    event.preventDefault();
    // Reset validation
    mailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    checkCredentials();
});

function showError(input, message) {
    input.classList.add("is-invalid");
    const feedback = input.nextElementSibling;
    feedback.textContent = message;
}}