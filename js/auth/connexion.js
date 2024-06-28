const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnConnexion = document.getElementById("btnConnexion");

btnConnexion.addEventListener("click", checkCredentials);

function checkCredentials(){
    //Informations factices avant API

    if(mailInput.value == "godard.lise@gmail.com" && passwordInput.value == "Ligod2711-"){
        //Il faudra récuperer le vrai token
        const token = "fqufhqufhuqhdfqiofj";
        setToken(token);

        //Placer ce token en cookie
        setCookie("role","admin", 7);
        window.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}