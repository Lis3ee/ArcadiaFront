<?php

header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "arcadia_data";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données du formulaire
$email = $_POST['Email'];
$mot_de_passe = $_POST['Password'];

// Validation
if (filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($mot_de_passe)) {
    // Requête SQL pour récupérer l'utilisateur et son rôle
    $stmt = $conn->prepare("SELECT mot_de_passe, role FROM users WHERE email = ?");
    if (!$stmt) {
        die("Preparation failed: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password, $role);
        $stmt->fetch();

        // Vérification du mot de passe
        if (password_verify($mot_de_passe, $hashed_password)) {
            session_start();
            $_SESSION['email'] = $email;

            // Réponse avec succès et rôle
            echo json_encode([
                "success" => true,
                "role" => $role
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Email ou mot de passe incorrect."
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Email ou mot de passe incorrect."
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Données non valides."
    ]);
}

$conn->close();
?>