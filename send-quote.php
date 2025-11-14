<?php
// Replace this with your email address where you want to receive the quote requests
$to = "info@antelenterprises.com"; // Your email here

// Get form data
$fullName = $_POST['fullName'];
$phoneNumber = $_POST['phoneNumber'];
$email = $_POST['email'];
$productsLookingFor = $_POST['productsLookingFor'];
$servicesLookingFor = $_POST['servicesLookingFor'];
$message = $_POST['message'];

// Compose the email
$subject = "New Quote Request from $fullName";

$body = "
You have received a new quote request from the website.

Full Name: $fullName
Phone Number: $phoneNumber
Email: $email
Products Looking For: $productsLookingFor
Services Looking For: $servicesLookingFor
Message:
$message
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send the email
if (mail($to, $subject, $body, $headers)) {
    header('Location: index.html?status=success');
    exit;
} else {
    header('Location: index.html?status=error');
    exit;
}
?>
