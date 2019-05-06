function SaveArea(base_url){
	
	var url = base_url + "Matters/saveArea";
	var formulario = $("#formAddArea");
	$.ajax({
		url: url,
		data: formulario.serialize(),
		type: "POST"
	}).done(function(data){
		console.log(data);
		if(data.trim() == "validacion"){

			$("#headerform").html("");

			$("#headerform").html('<p class="mensaje p-0 m-0 alert alert-warning" >No se pueden insertan datos vacíos!</p>');
		
		}else if(data.trim() == "error"){

			$("#headerform").html("");

			$("#headerform").html('<p class="mensaje p-0 m-0 alert alert-danger" >Ha ocurrido un error inesperado, vuelva a intentarlo!!</p>');
			
		}else{
			
			var area = JSON.parse(data);
			console.log(area);
			$("#headerform").html("");

			$("#headerform").html('<p class="mensaje p-0 m-0 alert alert-success" >El area se insertado exitosamente!!</p>');			
			
			var anclaUrl = base_url + 'Matters/ChangeArea/' + area.Id ;

			// $("#content-matters").append('<a href="<?=base_app()."Matters/ChangeArea/"?>'+area.Id+'">  '+ area.Name + ' <span>(0)</span></a>');
			$("#content-matters").append('<a href="' + anclaUrl + '"> ' + area.Name + '<span>(0)</span></a>');
			
			setTimeout( function(){
				$("#atachTo").fadeOut(400);

				$("#fadeBlack").fadeOut(400);
			} , 4000);
		}
	}).fail(function(code, error, throw_error){
		console.log(code + error + throw_error );
		$("#headerform").html("");

		$("#headerform").html('<p class="mensaje p-0 m-0 alert alert-danger" >Ha ocurrido un error inesperado, vuelva a intentarlo!!</p>');
		
	});
}


function closeObject(){
	$("#atachTo").fadeOut(400);

	$("#fadeBlack").fadeOut(400);
}