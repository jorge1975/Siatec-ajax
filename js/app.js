$(document).ready(function() {
    console.log('Jquery installed');

    let editar = false;
    $('#resultado-usuario').hide();
    obtenerUsuarios();

    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: '/bootstrappajax2/buscar-usuario.php',
                type: 'POST',
                data: {search},
                success: function(response){
                //    console.log(response);

                    let usuarios = JSON.parse(response);
                    console.log(usuarios);

                    let plantilla='';
                    usuarios.forEach(usuario => {
                        plantilla += `<li>
                            ${usuario.usuario}
                        </li>`
                    });
                    $('#container').html(plantilla);
                    $('#resultado-usuario').show();

                }
            });
        }

    });

    $('#usuarios-form').submit(function(e){
        const postData = {
            usuario: $('#usuario').val(),
            clave: $('#clave').val(),
            descripcion: $('#descripcion').val(),
            idusuario: $('#usuarioId').val()
        };

        let url = editar === false ? 'agregar-usuario.php' : 'editar-usuario.php'
        $.post('/bootstrappajax2/'+url ,postData,function (response) {
            obtenerUsuarios();
            $('#usuarios-form').trigger('reset');
        });
        e.preventDefault();
    });

    function obtenerUsuarios(){
       $.ajax({
            url: '/bootstrappajax2/listar-usuario.php',
            type: 'GET',
            success: function(response){
                let usuarios = JSON.parse(response);

                let plantilla='';
                usuarios.forEach(usuario => {
                    plantilla += `
                    <tr userId="${usuario.idusuario}">
                        <td>${usuario.idusuario}</td>
                        <td><a href="#" class="editarUsuarios">${usuario.usuario}</td>
                        <td>${usuario.descripcion}</td> 
                        <td><button class="eliminarUsuarios btn btn-danger">Eliminar</button></td>                    
                    </tr>`
                });
                $('#usuarios').html(plantilla);
                
            }
        }) 
    }

    $(document).on('click','.eliminarUsuarios',function() {
        if(confirm('Esta seguro de querer eliminar?')){
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('userId');
            $.post('/bootstrappajax2/eliminar-usuario.php', {id},function (response) {
            obtenerUsuarios();
        }); 
        }       
    });

    $(document).on('click','.editarUsuarios',function() {
        console.log('editando');
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('userId');
        $.post('/bootstrappajax2/encontrar-usuario.php', {id},function (response) {
            const usuario = JSON.parse(response);
            $('#usuario').val(usuario.usuario);
            $('#clave').val(usuario.clave);
            $('#descripcion').val(usuario.descripcion);
            $('#usuarioId').val(usuario.idusuario);
            editar = true;
            obtenerUsuarios();
        });
    });
    
});
