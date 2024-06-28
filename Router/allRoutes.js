import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/services", "Nos services", "/pages/services.html", []),
    new Route("/connexion", "Connexion", "/pages/connexion.html", ["disconnected"], "/js/auth/connexion.js"),
    new Route("/inscription", "Inscription", "/pages/inscription.html", ["admin"], "/js/auth/inscription.js"),
    new Route("/habitats", "Habitats", "/pages/habitats.html", []),
    new Route("/animaux", "Animaux", "/pages/animaux.html", []),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";