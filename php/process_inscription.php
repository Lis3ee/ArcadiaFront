<?php
// Connection à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "arcadia_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données du formulaire
$email = $_POST['Email'];
$mot_de_passe = $_POST['Password'];
$role = $_POST['role'];

// Validation basique (à améliorer selon vos besoins)
if (filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($mot_de_passe) >= 8) {
    // Hash du mot de passe
    $hashed_password = password_hash($mot_de_passe, PASSWORD_DEFAULT);

    // Préparation et exécution de la requête SQL
    $stmt = $conn->prepare("INSERT INTO users (email, mot_de_passe, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $hashed_password, $role);

    if ($stmt->execute()) {
        echo "Inscription réussie!";
    } else {
        echo "Erreur: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Données non valides.";
}

$conn->close();
?>