<?php
    $usuario='root';
    $clave='';
    try {
            $db = new PDO('mysql:host=localhost;dbname=siatec', $usuario, $clave);
    } catch (PDOException $e) {
        print "¡Error!: " . $e->getMessage() . "<br/>";
        die();
    }



 ?>
