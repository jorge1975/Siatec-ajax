<?php

    include 'conexion.php';
    $buscar = $_POST['search'];
    if (!empty($buscar)){
        $cmd = $db->prepare("select * from usuarios where usuario like '$buscar%'");
        $cmd->execute();
        if(!$cmd){
            die('Error de consulta ');
        }
        $json = array();
        while ($registro = $cmd->fetch()){
            $json[] = array(
                'usuario' => $registro['usuario'],
                'descripcion' => $registro['descripcion'],
                'idusuario' => $registro['idusuario']
            );
		}
        $json_string = json_encode($json);
        echo $json_string;
    }

 ?>
