<?php
    require('rb.php');

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    R::setup('mysql:host=localhost;dbname=canvext', 'root', 'root');

    if (isset($_POST['save']) && $_POST['save'] == true)
    {
        $img = R::dispense("image");
        $img->data = $_POST["img"];
        
        $id = R::store($img);
        $hash = base64_encode("$id");
        echo $hash;
    }
    else if (isset($_GET['id']))
    {
        $id = base64_decode($_GET['id']);
        $img = R::load('image', $id);

        // Grab the MIME type and the data with a regex for convenience
        if (!preg_match('/data:([^;]*);base64,(.*)/', $img->data, $matches)) {
            die("error");
        }

        // Decode the data
        $content = base64_decode($matches[2]);

        // Output the correct HTTP headers (may add more if you require them)
        header('Content-Type: '.$matches[1]);
        header('Content-Length: '.strlen($content));

        // Output the actual image data
        echo $content;
    }
    else
    {
        die();
    }
?>
