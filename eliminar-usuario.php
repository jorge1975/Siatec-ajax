<?php

    include 'conexion.php';
    $id = $_POST['id'];
    if (!empty($id)){
        $cmd = $db->prepare("delete from usuarios where idusuario = $id");
        $cmd->execute();
        if(!$cmd){
            die('Error de consulta ');
        }
        
        echo "Tarea completada";
    }

 ?>