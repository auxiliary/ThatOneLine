<?php
    /*error_reporting(E_ALL);
    ini_set('display_errors', 1);*/

    if (isset($_POST['save']) && $_POST['save'] == true)
    {
        $img = $_POST['img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $file_data = base64_decode($img);
        $filename = md5(microtime()) . ".png";
        file_put_contents('image/' . $filename, $file_data);
        
        echo $filename;
    }
    else
    {
        die();
    }
?>
