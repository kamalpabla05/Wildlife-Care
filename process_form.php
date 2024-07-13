<?php
session_start();
include_once "contact.html";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hostname = "localhost";  
    $username = "root";         
    $password = "";     
    $dbname = "wildlife_care";  

    $conn = mysqli_connect($hostname, $username, $password, $dbname);

    if(!$conn){
        echo "Database connection error".mysqli_connect_error();
    }

    $name = mysqli_real_escape_string($conn, $_POST['namefield']);
    $email = mysqli_real_escape_string($conn, $_POST['emailfield']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $message = mysqli_real_escape_string($conn, $_POST['msg']);

    $sql = mysqli_query($conn,"INSERT INTO contact_form (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')");

    if ($sql) {
        echo "Form submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
