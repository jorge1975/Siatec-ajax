<?php

    include 'conexion.php';
    $id = $_POST['id'];
    if (!empty($id)){
        $cmd = $db->prepare("select * from usuarios where idusuario = $id");
        $cmd->execute();
        if(!$cmd){
            die('Error de consulta ');
        }

        $json = array();
        
        while ($registro = $cmd->fetch()){
            $json[] = array(
                'usuario' => $registro['usuario'],
                'clave' => $registro['clave'],
                'descripcion' => $registro['descripcion'],
                'idusuario' => $registro['idusuario']
            );
        }
        $json_string = json_encode($json[0]);
        echo $json_string;
    }

 ?>