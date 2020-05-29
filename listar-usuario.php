<?php
	include 'conexion.php';

    $cmd = $db->prepare("select idusuario,usuario,descripcion from usuarios");
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
?>