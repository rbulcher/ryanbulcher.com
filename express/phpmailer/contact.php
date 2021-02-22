<?php 
$result ="";
if(isset($_POST['submit'])) {
    require 'PHPMailer.php';
    $mail = new PHPMailer;

    $mail->Host='smtp.gmail.com';
    $mail->Port=587;
    $mail->SMTPAuth=true;
    $mail->SMTPSecure='tls';
    $mail->Username='rjbulcher@gmail.com';
    $mail->Password='Bulcher00';

    $mail->setFrom($_POST['email']);
    $mail->addAddress('rjbulcher@gmail.com');

    $mail->isHTML(true);
    $mail->Subject='Form Submision: '.$_POST['subject'];
    $mail->Body='<h1 align=center>Name : '.$_POST['name'].'<br>Email: '.$_POST['email'].'<br>Message: '.$_POST['message'].'</h1>';

    if(!$mail->send()) {
        $result = "Something went wrong. Please try again.";
    }
    else{
        $result = "Thank you".$_POST['name']." for contacting me. I will get back to you soon!";
    }

}

?>