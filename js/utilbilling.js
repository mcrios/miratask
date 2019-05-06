	function add_entry_g(id_matter,id_entry){

		$("#modal-event").modal("show");



		id_entry=(id_entry!=undefined) ? id_entry : 0;

		$.post(base_app+"Billing/time_expense_modal?from=billing",{id_matter:id_matter,id_entry:id_entry},function(response){

			$("#modal-event").html(response);

		});

	}

	
	// statusMostrar se utiliza para mostrar o no en el modal de tiempo y gastos la pestana
	// de nueva factura
	function add_entry(id_matter,id_entry,no_invoice="", statusMostrar="mostrar"){
		alert(statusMostrar);

		$("#modal-event").modal("show");

		// alert(statusMostrar);

		id_entry=(id_entry!=undefined) ? id_entry : 0;

		$.post(base_app+"Billing/time_expense_modal?from=billing&invoice="+no_invoice,{id_matter:id_matter,id_entry:id_entry,statusMostrar:statusMostrar},function(response){

			$("#modal-event").html(response);

		});

	}

	function max_time(){
		var time = $("#horas").val();
		time = time.split(".");


		var minutos = time[1];

		if(minutos == "99"){
			$("#horas").val( (parseFloat(time[0])) + "." + "59" );
		}else if(minutos > 59  || minutos == "6"  ){
			$("#horas").val( (parseFloat(time[0]) + 1) + "." + "00" );
		}

	}

	function search(valor) {



		$.ajax({

			url:  base_app + 'Ajax/Search',

			type: 'POST',

			dataType: 'html',

			data: { Criteria: valor},

		}).done(function (data) {

			$('#searchResult').html(data);

		});

		

		if($('#searchResult:hidden')){

			

			$("#searchResult").show();

		}



		if($('.searh_result:hidden')){

			

			$(".searh_result").show();

		}

		

	}

	

	function new_invoice(id_matter){

		if(id_matter=='' || id_matter==undefined  ){  id_matter=''; }

		$.ajax({

			url:  base_app + 'Billing/new_invoice/'+id_matter,

			type: 'POST',

			dataType: 'html',

		}).done(function (data) {

			$("#newFolder").fadeIn(400);

			$('#newFolder').html(data);

			$("#fadeBlack").fadeIn(400);

			

			

			

		});

	}

	

	function addInvoiceMatter(valForHidden, selectedString, idHidden, idTextbox ){

		

		

		

		$('input[name="'+idHidden+'"]').val(valForHidden);

		$('input[name="'+idTextbox+'"]').val(selectedString);

		

		

		$('#MatterResult').hide();

		

	}

	

	function SearchInvoiceMatter(valor) {

		

		$.ajax({

			url:  base_app + 'Billing/SearchMatter/',

			type: 'POST',

			dataType: 'html',

			data: { Criteria: valor},

		}).done(function (data) {

			$('#MatterResult').html(data);

		});

		

		if($('#MatterResult:hidden')){

			

			$("#MatterResult").show();

		}

	}

	

	function SearchInvoice(valor) {

		

		$.ajax({

			url:  base_app + 'Billing/SearchInvoice/',

			type: 'POST',

			dataType: 'html',

			data: { Criteria: valor},

		}).done(function (data) {

			$('#MatterResult').html(data);

		});

		

		if($('#MatterResult:hidden')){

			

			$("#MatterResult").show();

		}

	}

	

	

	function saveInvoice(){ 

		$.ajax({

			url: base_app + 'Billing/saveInvoice',

			type: 'POST',

			dataType: 'html',

			data: $("#formNewInv").serialize()

		}).done(function (data) {



			data.trim();

			if(data=="1"){

				

				$("#newFolder").html(""); 

				$("#newFolder").hide(); 

				$("#fadeBlack").hide();

				alert("Invoice has been Created!");

				

				location.reload();

				

			}else{



				$("#listErrors").html(data); 

			}





		});	

	}

	

	

	

	function savePay(){ 

		$.ajax({

			url: base_app + 'Billing/savePay',

			type: 'POST',

			dataType: 'html',

			data: $("#formNewInv").serialize()

		}).done(function (data) {



			data.trim();

			if(data=="1"){

				

				$("#newFolder").html(""); 

				$("#newFolder").hide(); 

				$("#fadeBlack").hide();

				alert("Pay has been Saved!");

				

				location.reload();

				

			}else{



				$("#resultErrors").html(data); 

			}

		});	

	}

	

	

	

	

	

	$( document ).ready(function() {



		$(".SearchBox").mouseleave(function() {

			

			$(".SearchBox").hide();

			

		});

		

		$('#AppDisc').click(function () {

			

			var $this = $(this);

			

			if ($this.is(':checked')) {

				

				$('#AppDiscBox').show();

				

			}else {

				

				$('#AppDiscBox').hide();

				

			}

			

		});

		

		$('#AppTax').click(function () {

			

			var $this = $(this);

			

			if ($this.is(':checked')) {

				

				$('#AppTaxBox').show();

				

			}else {

				

				$('#AppTaxBox').hide();

				

			}

			

		});



		$('#AppPart').click(function () {

			

			var $this = $(this);

			

			if ($this.is(':checked')) {

				

				$('#AppPartBox').css('display','block');

				

			}else {

				

				$('#AppPartBox').css('display','none');

				

			}

			

		});

		

		$('#saveAsDraft').click(function () {

			$('input[name="invoiceType"]').val("draft");

			$('#detail_invoice').submit();

		});

		

		$('#saveAsInvoice').click(function () {

			$('input[name="invoiceType"]').val("invoice");

			$('#detail_invoice').submit();

		});



	});



	function calDisc(){

		var valor = $("[name = 'DiscType']").val();

		if(valor!="porc" && valor!="mone"  ){
			$('#errorModal').modal("show");
			$('#errorModal').find('.modal-body').text("Seleccione un tipo de descuento!");
			$('#discServ').val(0);
			$('#discExpen').val(0);
			$('#discServFinal').val(0);
			$('#discExpenFinal').val(0);
			return;
		}

		var descuentoService = $('#discServ').val();
		var descuentoExpense = $('#discExpen').val();
		var totalAmountFromDB = $('#totServi_hidden').val();

		// alert(descuentoService);
		// alert(descuentoExpense);
		// alert(totalAmountFromDB);
		
		

		if( isNaN(descuentoService) || isNaN(descuentoExpense)  ){
			$('#errorModal').modal("show");
			$('#errorModal').find('.modal-body').text("Los campos deben ser numericos");
			$('#discServ').val(0);
			$('#discExpen').val(0);
			$('#discServFinal').val(0);
			$('#discExpenFinal').val(0);


		}else{

			descuentoService = calDescServOrExpen(descuentoService, totalAmountFromDB ,valor);
			descuentoExpense = calDescServOrExpen(descuentoExpense, totalAmountFromDB ,valor);
		

			var descuentoTotal = ( parseFloat(descuentoExpense) + parseFloat(descuentoService));
			
			
			var montoFinal = 0;
			
			
			descuentoTotal = parseFloat(Math.round(descuentoTotal * 100) / 100).toFixed(2);
			
			montofinal = parseFloat(Math.round( ( totalAmountFromDB -  descuentoTotal)  * 100) / 100).toFixed(2);
			
			$("#discServFinal").val(descuentoService);
			$("#discExpenFinal").val(descuentoExpense);

			$('#totFinal_hidden').val(montofinal);
			$('#totFinalWrap').text(montofinal);
			
			$('#totDesc_hidden').val(descuentoTotal);
			$('#totDesc').text(descuentoTotal);
			
		}
		
		


		// typeDesc = valor;

		// var cantidad = $('#totDesc').text();

		// calDescServ(cantidad, typeDesc);
			

		// 	var descuentoServ=$('input[name="totServi_hidden"]').val()*$('input[name="discServ"]').val();

		// 	descuentoServ=descuentoServ/100;

			

		// 	var descuentoExpen=$('input[name="totExpen_hidden"]').val()*$('input[name="discExpen"]').val();

		// 	descuentoExpen=descuentoExpen/100;

			

		// }else if(typeDesc=='mone'){

			

		// 	var descuentoServ  = $('input[name="discServ"]').val();

		// 	var descuentoExpen = $('input[name="discExpen"]').val();

			

		// }

		

		// totalDescSE =  descuentoServ;

		// totalDescEX =  descuentoExpen;

		

		// var newTotDiscounts = parseFloat(descuentoServ)+parseFloat(descuentoExpen);

		

		// $('#totDesc').html(newTotDiscounts);

		

		// totalParc=totalFinal-newTotDiscounts+parseFloat(taxEqui)-totalPartial;

		

		// $('#totFinalWrap').html(totalParc);

		

		

	}

	
	function calDescServOrExpen(discServOrExpen=0, totalAmound=0 ,type){


		totalAmound = $('#totServi_hidden').val();

		var total = 0;
		var descuento = 0;

		if(type=="") type = $('[name="DiscType"]').val();
		


		if(type == "mone"){
			descuento = discServOrExpen;
		}else if(type == "porc"){
			descuento = ( totalAmound * discServOrExpen ) / 100;
		}else{
			descuento = 0;
		}

		
		console.log("descuento service: " + descuento);
		
		return descuento;

	}





	// function calDescServ(valor, opcion = ""){
		
		
		

	// 	if(valor=="" || valor==undefined){ valor = 0; }

	// 	if(taxEqui=="" || taxEqui==undefined){ taxEqui = 0; }

		

	// 	if(typeDesc=='porc'){

			

	// 		var descuentoServ=$('input[name="totServi_hidden"]').val()*valor;

	// 		descuentoServ=descuentoServ/100;

			

	// 	}else if(typeDesc=='mone'){

	// 		var descuentoServ=valor;

	// 	}else{

	// 		var descuentoServ=valor;

	// 	}		

		

		

		

	// 	if(totalDescEX=="" || totalDescEX==undefined){ totalDescEX = 0; }

		

	// 	var newTotDiscounts = parseFloat(totalDescEX)  +  parseFloat(descuentoServ);

		

	// 	totalDescSE=descuentoServ;

		

	// 	$('#totDesc').html(newTotDiscounts);

		

	// 	totalParc = totalFinal-newTotDiscounts-totalPartial;

	// 	totalParc = totalParc+parseFloat(taxEqui);

		

	// 	$('#totFinalWrap').html(totalParc);

		

		

		

	// }

	

	// function calDescExpen(valor, opcion = ""){

	// 	// var tipo = "";

	// 	// if(opcion != ""){
	// 	// 	tipo = opcion;
	// 	// }else{
	// 	// 	tipo = $('[name = "DiscType"]').val();
	// 	// }

	// 	// alert(tipo);

	// 	if(valor=="" || valor==undefined){ valor = 0; }

	// 	if(taxEqui=="" || taxEqui==undefined){ taxEqui = 0; }

		

	// 	if(typeDesc=='porc'){

			

	// 		var descuentoExpen=$('input[name="totExpen_hidden"]').val()*valor;

	// 		descuentoExpen=descuentoExpen/100;

			

	// 	}else if(typeDesc=='mone'){

	// 		var descuentoExpen=valor;

	// 	}else{

	// 		var descuentoExpen=valor;

	// 	}	

		

	// 	if(totalDescSE=="" || totalDescSE==undefined){ totalDescSE = 0; }

		

	// 	var newTotDiscounts = parseFloat(totalDescSE) + parseFloat(descuentoExpen);

		

	// 	totalDescEX = descuentoExpen;

	// 	if (newTotDiscounts==0) {
	// 		newTotDiscounts='0.00';
	// 	}

	// 	$('#totDesc').html(newTotDiscounts);

		

	// 	totalParc=(totalFinal-newTotDiscounts)+parseFloat(taxEqui)-totalPartial;

		

	// 	$('#totFinalWrap').html(totalParc);

		

	// }

	

	// function calTax(valor){

		

	// 	if(valor=="" || valor==undefined){ valor = 0; }

	// 	if(taxEqui=="" || taxEqui==undefined){ taxEqui = 0; }

		

	// 	if(TaxApplieTo=="" || TaxApplieTo==undefined){ TaxApplieTo = "Services"; }

		

	// 	if(TaxApplieTo=="Services"){

	// 		taxEqui =  totserv*valor;

	// 		taxEqui = taxEqui/100;

	// 	}

	// 	if(TaxApplieTo=="Expenses"){

	// 		taxEqui =  totexpen*valor;

	// 		taxEqui = taxEqui/100;

	// 	}

	// 	if(TaxApplieTo=="Services_y_Expenses"){

	// 		taxEqui =  totalParc*valor;

	// 		taxEqui = taxEqui/100;

	// 	}

		

		

		

	// 	$("#taxx").html(taxEqui.toFixed(2));

		

	// 	var newTotDiscounts = parseFloat(totalDescSE)+parseFloat(totalDescEX);

		

	// 	totalParc=totalFinal-newTotDiscounts+parseFloat(taxEqui)-totalPartial;

		

	// 	$('#totFinalWrap').html(totalParc);

		

	// }



	// function calPart(valor) {

	// 	if(valor=="" || valor==undefined){ valor = 0; }

	// 	if(taxEqui=="" || taxEqui==undefined){ taxEqui = 0; }

		

	// 	if(typeDesc=='porc'){

			

	// 		var descuentoExpen=$('input[name="totExpen_hidden"]').val()*valor;

	// 		descuentoExpen=descuentoExpen/100;

			

	// 	}else if(typeDesc=='mone'){

	// 		var descuentoExpen=valor;

	// 	}else{

	// 		var descuentoExpen=valor;

	// 	}	

		

	// 	if(totalDescSE=="" || totalDescSE==undefined){ totalDescSE = 0; }

		

	// 	var newTotDiscounts = parseFloat(totalDescSE) + parseFloat(descuentoExpen);

		

	// 	totalDescEX = descuentoExpen;

		

	// 	$('#PartialTotal').html(newTotDiscounts);

		

	// 	totalParc=(totalFinal-newTotDiscounts)+parseFloat(taxEqui);

		

	// 	$('#totFinalWrap').html(totalParc);



	// }



	function selectedTipeTax(valor){

		TaxApplieTo=valor;

		calTax($('input[name="taxValue"]').val());

	}

	

	function prew_invoice(id){

		$.ajax({

			url:  base_app + 'Billing/prew_invoice/'+id,

			type: 'POST',

			dataType: 'html',

		}).done(function (data) {

			$("#fadeBlack").fadeIn(400);

			$("#prev_inv").fadeIn(400);

			$('#prev_inv').html(data);

			

		});

	}

	

	function apply_pay(){

		

		$.ajax({

			url:  base_app + 'Billing/apply_pay',

			type: 'POST',

			dataType: 'html',

		}).done(function (data) {

			$("#newFolder").fadeIn(400);

			$('#newFolder').html(data);

			$("#fadeBlack").fadeIn(400);

			

			

			

		});

	}

	

	function new_billingcode(){

		$.ajax({

			url:  base_app + 'Billing/new_code',

			type: 'POST',

			dataType: 'html',

		}).done(function (data) {

			$("#newFolder").fadeIn(400);

			$('#newFolder').html(data);

			$("#fadeBlack").fadeIn(400);

			

			

			

		});

	}

	

	function saveCode(){ 

		$.ajax({

			url: base_app + 'Billing/saveCode',

			type: 'POST',

			dataType: 'html',

			data: $("#formNewInv").serialize()

		}).done(function (data) {



			data.trim();

			if(data=="1"){

				

				$("#newFolder").html(""); 

				$("#newFolder").hide(); 

				$("#fadeBlack").hide();

				alert("Billing code has been saved!");

				

				location.reload();

				

			}else{



				$("#resultErrors").html(data); 

				

			}





		});	

	}
