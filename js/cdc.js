

function getIP() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest()
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false)
    xmlhttp.send()

    hostipInfo = xmlhttp.responseText.split("\n")

    for (i = 0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":")
        if ( ipAddress[0] == "IP" ) return ipAddress[1]
    }

    return false
}

function setFields(dados){
 if(Object.keys(dados).length>1){
	$('[name="nome"]').val(dados.firstName)
	$('[name="name"]').val(dados.firstName)
	$('[name="sobrenomenome-ultimo"]').val(dados.lastName)
	$('[name="last-name"]').val(dados.lastName)
	$clone = ''

	trabalha = false
	atual = 0
	anterior = 0

	var lpositions = Object.keys(dados.positions.values).length
	for(var i = 0; i<lpositions; i++){
	    if(dados.positions.values[i].isCurrent){
	        trabalha = true
	        atual++;
	        if(atual == 1){
	        	$('[name="nome-emp-atual"]').val(dados.positions.values[i].company.name)
	        	$('[name="de-atual"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	        	$('[name="ate-atual"]').val(new Date().getMonth()+'/'+new Date().getFullYear())
	        	$('[name="titulo-posicao-atual"]').val(dados.positions.values[i].title)
	        	$('[name="tipo-emp-atual"]').val(dados.positions.values[i].company.industry)
	        	$('[name="desc-trab-atual"]').val(dados.positions.values[i].summary)

	        	$('[name="name-emp-actual"]').val(dados.positions.values[i].company.name)
	        	$('[name="from-actual"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	        	$('[name="to-actual"]').val(new Date().getMonth()+'/'+new Date().getFullYear())
	        	$('[name="title-position-actual"]').val(dados.positions.values[i].title)
	        	$('[name="type-emp-actual"]').val(dados.positions.values[i].company.industry)
	        	$('[name="desc-work-actual"]').val(dados.positions.values[i].summary)
	    	}else{
	    		$cloneatual = $('.trab-atual').clone()
	    		$cloneatual.attr('class','trab-atual'+i).css('margin-top','20px')
	    		$cloneatual.find('[name="nome-emp-atual"]').val(dados.positions.values[i].company.name)
	    		$cloneatual.find('[name="de-atual"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    		$cloneatual.find('[name="ate-atual"]').val(new Date().getMonth()+'/'+new Date().getFullYear())
	    		$cloneatual.find('[name="titulo-posicao-atual"]').val(dados.positions.values[i].title)
	    		$cloneatual.find('[name="tipo-emp-atual"]').val(dados.positions.values[i].company.industry)
	    		$cloneatual.find('[name="desc-trab-atual"]').val(dados.positions.values[i].summary)
	    		$('.trabs-atuais').find('[class^="trab-atual"]').last().after($cloneatual)
	    		
	    		$img_frm = $('<img class="minus_frm3" data-field="'+i+'" src ="images/minus16_icon.png"/>')
	   
	    		$('.trabs-atuais').find('[class^="trab-atual"]').last().append($img_frm)

	    		$cloneatual2 = $('.actual-job').clone()
	    		$cloneatual2.attr('class','actual-job'+i).css('margin-top','20px')
	    		$cloneatual2.find('[name="name-emp-actual"]').val(dados.positions.values[i].company.name)
	    		$cloneatual2.find('[name="from-actual"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    		$cloneatual2.find('[name="to-actual"]').val(new Date().getMonth()+'/'+new Date().getFullYear())
	    		$cloneatual2.find('[name="title-position-actual"]').val(dados.positions.values[i].title)
	    		$cloneatual2.find('[name="type-emp-actual"]').val(dados.positions.values[i].company.industry)
	    		$cloneatual2.find('[name="desc-work-actual"]').val(dados.positions.values[i].summary)
	    		$('.jobs-actual').find('[class^="actual-job"]').last().after($cloneatual2)

	    		$img_frm2 = $('<img class="minus_frm3" data-field="'+i+'" src ="images/minus16_icon.png"/>')
	    	
	    		$('.jobs-actual').find('[class^="actual-job"]').last().append($img_frm2)
	    	}
	        	
	    }else{
	    	anterior++
	    	if(anterior == 1){

	    	   $('[name="nome-emp-ant"]').val(dados.positions.values[i].company.name)
	    	   $('[name="de-ant"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    	   $('[name="ate-ant"]').val(dados.positions.values[i].endDate.month+'/'+dados.positions.values[i].endDate.year)
	    	   $('[name="titulo-posicao-ant"]').val(dados.positions.values[i].title)
	    	   $('[name="tipo-emp-ant"]').val(dados.positions.values[i].company.industry)
	    	   $('[name="desc-trab-ant"]').val(dados.positions.values[i].summary)

	    	   $('[name="name-emp-prev"]').val(dados.positions.values[i].company.name)
	    	   $('[name="from-prev"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    	   $('[name="to-prev"]').val(dados.positions.values[i].endDate.month+'/'+dados.positions.values[i].endDate.year)
	    	   $('[name="title-position-prev"]').val(dados.positions.values[i].title)
	    	   $('[name="type-emp-prev"]').val(dados.positions.values[i].company.industry)
	    	   $('[name="desc-work-prev"]').val(dados.positions.values[i].summary)
	    	}else{
	    		
	    	 	$clone = $('.trab-anterior').clone()
	    	 	$clone.attr('class','trab-anterior'+i)
	    	 	$clone.attr('class','trab-anterior'+i).css('margin-top','20px')
	    	 	
	    	 	$clone.find('[name="nome-emp-ant"]').val(dados.positions.values[i].company.name)
	    	 	$clone.find('[name="de-ant"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    	 	$clone.find('[name="ate-ant"]').val(dados.positions.values[i].endDate.month+'/'+dados.positions.values[i].endDate.year)
	    	 	$clone.find('[name="titulo-posicao-ant"]').val(dados.positions.values[i].title)
	    	 	$clone.find('[name="tipo-emp-ant"]').val(dados.positions.values[i].company.industry)
	    	 	$clone.find('[name="desc-trab-ant"]').val(dados.positions.values[i].summary)
	    	 	$('.trabs-anteriores').find('[class^="trab-anterior"]').last().after($clone)

	    	 	$img_frmm = $('<img class="minus_frm3" data-field="'+i+'" src ="images/minus16_icon.png"/>')
	    	 	$('.trabs-anteriores').find('[class^="trab-anterior"]').last().append($img_frmm)

	    	 	$clone2 = $('.prev-job').clone()
	    	 	$clone2.attr('class','prev-job'+i)
	    	 	$clone2.attr('class','prev-job'+i).css('margin-top','20px')

	    	 	
	    	 	$clone2.find('[name="name-emp-prev"]').val(dados.positions.values[i].company.name)
	    	 	$clone2.find('[name="from-prev"]').val(dados.positions.values[i].startDate.month+'/'+dados.positions.values[i].startDate.year)
	    	 	$clone2.find('[name="to-prev"]').val(dados.positions.values[i].endDate.month+'/'+dados.positions.values[i].endDate.year)
	    	 	$clone2.find('[name="title-position-prev"]').val(dados.positions.values[i].title)
	    	 	$clone2.find('[name="type-emp-prev"]').val(dados.positions.values[i].company.industry)
	    	 	$clone2.find('[name="desc-work-prev"]').val(dados.positions.values[i].summary)
	    	 	$('.jobs-prev').find('[class^="prev-job"]').last().after($clone2)

	    	 	$img_frmm2 = $('<img class="minus_frm3" data-field="'+i+'" src ="images/minus16_icon.png"/>')
	    	 	$('.jobs-prev').find('[class^="prev-job"]').last().append($img_frmm2)

	    	 }
	    }
	}

	var leducations = Object.keys(dados.educations.values).length
	var education = 0
	for(var i = 0; i<leducations; i++){
		//console.log(dados.educations.values[i])
		education++;
		if(education == 1){
			$('[name="nome-inst"]').val(dados.educations.values[i].schoolName) 
			//$('local-academico').val(dados.educations.values[i])
			$('[name="de-academico"]').val(dados.educations.values[i].startDate.year) 
			$('[name="ate-academico"]').val(dados.educations.values[i].endDate.year) 
			$('[name="tipo-estudo"]').val(dados.educations.values[i].activities) 
			$('[name="titulo-conquistado"]').val(dados.educations.values[i].degree) 

			$('[name="name-inst"]').val(dados.educations.values[i].schoolName) 
			//$('place-academic').val(dados.educations.values[i])
			$('[name="from-academico"]').val(dados.educations.values[i].startDate.year) 
			$('[name="to-academico"]').val(dados.educations.values[i].endDate.year) 
			$('[name="type-studies"]').val(dados.educations.values[i].activities) 
			$('[name="title-conq"]').val(dados.educations.values[i].degree)
		}else{
			$clone_academico = $('.academico').clone()
			$clone_academico.attr('class','academico'+i)

			$clone_academico.find('[name="nome-inst"]').val(dados.educations.values[i].schoolName) 
			//$('local-academico').val(dados.educations.values[i])
			$clone_academico.find('[name="de-academico"]').val(dados.educations.values[i].startDate.year) 
			$clone_academico.find('[name="ate-academico"]').val(dados.educations.values[i].endDate.year) 
			$clone_academico.find('[name="tipo-estudo"]').val(dados.educations.values[i].activities) 
			$clone_academico.find('[name="titulo-conquistado"]').val(dados.educations.values[i].degree)
			$('.academicos').find('[class^="academico"]').last().after($clone_academico)

			$clone_academic = $('.academic').clone()
			$clone_academic.attr('class','academic'+i)

			$clone_academic.find('[name="name-inst"]').val(dados.educations.values[i].schoolName) 
			//$('place-academic').val(dados.educations.values[i])
			$clone_academic.find('[name="from-academico"]').val(dados.educations.values[i].startDate.year) 
			$clone_academic.find('[name="to-academico"]').val(dados.educations.values[i].endDate.year) 
			$clone_academic.find('[name="type-studies"]').val(dados.educations.values[i].activities) 
			$clone_academic.find('[name="title-conq"]').val(dados.educations.values[i].degree)
			$('.academics').find('[class^="academic"]').last().after($clone_academic)
		}
	}

	if(trabalha){
	    $('[name="empregado"]').each(function(i,it){
		    if($(this).attr('value') === 'sim'){
		        $(this).attr('checked','true')   
		    }
	    })
	    $('[name="employed"]').each(function(i,it){
	    	if($(this).attr('value') === 'yes'){
	    	    $(this).attr('checked','true')   
	    	}
	    })
	}

	// dados.dateOfBirth.day
	$('[name="data-nasc"]').val(dados.dateOfBirth.day+'/'+dados.dateOfBirth.month+'/'+dados.dateOfBirth.year)
	$('[name="date-birth"]').val(dados.dateOfBirth.day+'/'+dados.dateOfBirth.month+'/'+dados.dateOfBirth.year)

	/** obras publicadas */
	var lobras = Object.keys(dados.publications).length
	for(var i = 0; i<lobras; i++){
	        if(i == 0){
	            //$('[name="obras"]:eq(0)').val(dados.publications.values[0].title)
	        }
	        if(lobras>1 && i>0){
	        	//$clone = $('[name="obras"]').clone()
	        	//$('[name="obras"]').after($clone)
	        	//$('[name="obras"]:eq('+i+')').val(dados.publications.values[i].title)
	        	//$('[name="obras"]:eq('+i+')').css('margin-top','20px')
	        }  
	}
	/** phones (comercial/work,residencial/home,celular/mobile)*/
	var lphones = Object.keys(dados.phoneNumbers.values).length
	for(var i = 0; i<lphones;i++){
	    tipo = dados.phoneNumbers.values[i].phoneType
	    switch(tipo){
	    	case 'work':
	    		$('[name="fonetrabalho[]"]').val(dados.phoneNumbers.values[i].phoneNumber)
	    		$('[name="workphone[]"]').val(dados.phoneNumbers.values[i].phoneNumber)  
	    	break;
	    	case 'home':
	    		 $('[name="fone-resid"]').val(dados.phoneNumbers.values[i].phoneNumber)
	    		 $('[name="wphone-home]').val(dados.phoneNumbers.values[i].phoneNumber)  
	    	break;
	    	case 'mobile':
	    		$('[name="celular[]"]').val(dados.phoneNumbers.values[i].phoneNumber)
	    		$('[name="mobile[]"]').val(dados.phoneNumbers.values[i].phoneNumber)  
	    	break;
	    	default:
	    	break;
	    }       
	}

	/** e-mails */
	$('[name="email-consultoria"]').val(dados.emailAddress)
	$('[name="email-consulting"]').val(dados.emailAddress)

	/** endereço logradouro,numero,cidade */
	$('[name="logradouro"]').val(dados.mainAddress)
	$('[name="address"]').val(dados.mainAddress)

	/*$('#hub').on('click',function(e){
	    e.preventDefault();
	    ip = $.trim(getIP());
		$.ajax({
			type: 'get',
			url: 'http://freegeoip.net/json/'+ip,
			success: function(data){
			    console.log(data)
			},
			error: function(jqxhr){
			    console.log(jqxhr)
			}
		})
	}).trigger('click')*/

	}//fim if

}

function setOpacity(el){
	$pt = el.find('[id^="pt"]');
	$en = el.find('[id^="en"]');

	$pt.on('focus','input',function(){
	    $pt.css('opacity','1');
	    $en.css('opacity','0.5');
	})
	$en.on('focus','input',function(){
	    $en.css('opacity','1');
	    $pt.css('opacity','0.5');
	})
}

function btns(pn){

	if(($(".live").parent().parent().find('ul').find(".live").index()+1)==1){
	    $('.fim').css('opacity','0.1').css('cursor','default')
	    $('.comeco').css('opacity','1.0').css('cursor','pointer')

	}else if(($(".live").parent().parent().find('ul').find(".live").index()+1)==4){
	    $('.fim').css('opacity','1.0').css('cursor','pointer')
	    $('.comeco').css('opacity','0.1').css('cursor','default') 

	}else{
	    $('.fim').css('opacity','1.0').css('cursor','pointer')
	    $('.comeco').css('opacity','1.0').css('cursor','pointer')
	}
}


Object.merge = function() {
    var al = arguments.length

    var result

    if (al < 2) {
        throw new Error('U need at least 2 objects to merge');
    }

    result = arguments[0]

    for (var i = 1; --al; ++i) {
        var current = arguments[i]

        Object.keys(current).map(function(key) {
            result[key] = current[key]
        })
    }

    return JSON.parse(result)
}
//print(JSON.stringify(Object.merge(first.person, second)));

Array.prototype.inArray = function(comparer) { 
    for(var i = 0; i < this.length; i++) { 
        if(comparer(this[i])) return true 
    }
    return false
}

Array.prototype.contains = function(v) {
	//console.log('contains')
    var i = this.length
    while (i--) {

        //console.log(this[i][Object.keys(this[i])[0]])
        if (this[i][Object.keys(this[i])[0]] == v) {
            return true
        }
    }
    return false
}

Array.prototype.exists = function(p1,p2,p3,p4,p5,p6,p7){

	obj = [p1,p2,p3,p4,p5,p6,p7]
	ct = 0;
	index = 0;
	
	for(var k in this){	
		for(var i in this[k]){
			if(typeof(this[k][i])!==undefined && typeof(this[k][i])!=='function' && this[k][i] instanceof Function == false ){
			    //console.log(this[k][i]+' '+obj[index].toString())
				this[k][i] == obj[index].toString()? ct++ : '';
				index+=1;
			}
		}
		index = 0;

		if(ct == 7){
			return true
		}else{
			ct = 0
		}
	}	
}

objConsultor = {
"nome":"",
"sobrenomenome-meio":"",
"sobrenomenome-ultimo":"",
"nome-notorio":"",
"logradouro":"",
"estado":"",
"cep":"",
"pais":"",
"mails": [],
addMail : function(address, type){
	objConsultor.mails.push({"emailAddress" : address, "emailType" : type})
},
"educations" : [], 
addEducation : function(school_name, local, start_date, end_date, activities, degree, type){
	objConsultor.educations.push({"schoolName" : school_name, "local" : local, "startDate":start_date, "endDate" : end_date,
							"activities" : activities, "degree" : degree, "type" : type})
},
"positions" : [],
addPosition : function(company_name, start_date, end_date, position_title, industry, summary, type){
	objConsultor.positions.push({"companyName" : company_name, "startDate" : start_date, "endDate" : end_date, 
						 "positionTitle" : position_title, "industry" : industry, "summary" : summary, "type" : type})
},
"phones" : [],
addFone : function(number, type){
	objConsultor.phones.push({"phoneNumber" : number, "phoneType" : type})
},
"logradouro-resid":"",
"estado-resid":"",
"cep-resid":"",
"pais-resid":"",
"fone-resid":"",
"local-nasc":"",
"data-nasc":"",
"nacionalidade-nasc":"",
"nacionalidade-atual":"",
"identidade":"",
"cpf":"",
"passaporte":"",
"status-visto":"",
"obs":"",
"sexo":"",
"estatura":"",
"peso":"",
"estado-civil":"",
"n-dependentes":"",
"empregado":"",
"empresa":"",
"possuifirma":"",
"razao-social":"",
"cgc":"",
"participacao":"",
"quaisecomo":"",
"temporario":"",
"viajar":"",
"outra-localidade":"",
"nao-quer-trabalhar":"",

"fatos-relevantes":"",
"comparativo":"",
"relevant-facts":"",
"comparing":"",


"capac-int":"",
"senso-analitico":"",
"capac-pro":"",
"capac-ger":"",
"qual-oratoria":"",
"qual-redacao":"",
"motiv":"",
"lideranca":"",
"capac-org":"",
"senso-humor":"",
"matur-emo":"",
"capac-prazos":"",
"capac-equipe":"",
"nocao-responsa":"",
"integridade":"",

"tipodetrabalho":"",
"horasdisponiveis":"",

"ingles-leitura":"",
"ingles-oral":"",
"ingles-redacao":"",
"espanhol-leitura":"",
"espanhol-oral":"",
"espanhol-redacao":"",
"frances-leitura":"",
"frances-oral":"",
"frances-redacao":"",
"portugues-leitura":"",
"portugues-oral":"",
"portugues-redacao":"",
"outro-leitura":"",
"outro-oral":"",
"outro-redacao":"",

"english-reading":"",
"english-speaking":"",
"english-writing":"",
"spanish-reading":"",
"spanish-speaking":"",
"spanish-writing":"",
"french-reading":"",
"french-speaking":"",
"french-writing":"",
"portuguese-reading":"",
"portuguese-speaking":"",
"portuguese-writing":"",
"other-reading":"",
"other-speaking":"",
"other-writing":"",



"int-ability":"",
"analytic-frame":"",
"pro-orientation":"",
"ability-manager":"",
"qual-oral":"",
"qual-written":"",
"motivation":"",
"leadership":"",
"org-ability":"",
"humor-sense":"",
"emo-maturity":"",
"deadline":"",
"work-others":"",
"serv-clients":"",
"integrity":"",

"kind-of-work":"",
"hours-to-work":"",

"name":"",
"middle-name":"",
"last-name":"",
"known-name":"",
"address":"",
"state":"",
"zipcode":"",
"country":"",
"fax-en":"",
"email-consulting":"",
"adress-home":"",
"state-home":"",
"zipcode-home":"",
"place-birth":"",
"date-birth":"",
"nationality-birth":"",
"present-nationality":"",
"id":"",
"ssn":"",
"passport":"",
"visas-status":"",
"remarks":"",
"sex":"",
"height-yeah":"",
"weight":"",
"marital-status":"",
"n-dependents":"",
"employed":"",
"company":"",
"own-company":"",
"company-name":"",
"cgc-en":"",
"participation":"",
"whichandhow":"",
"temporary":"",
"travel":"",
"other-place":"",
"unwilling":""
}

function hasK(k){
	dik = {"trab":"fonetrabalho[]","cel":"celular[]","even":"email-eventual[]","work":"workphone[]","mob":"mobile[]",
			"oths":"others-email[]","atual":"trab-atual","ant":"trab-anterior","actual":"actual-job","prev":"prev-job"
			,"mico":"academico","mic":"academic"}

	x = dik.hasOwnProperty(k)? k:0
 	return dik[x]
}

function pos_or_edu(class_name){
	pos = ["trab-atual","actual-job","trab-anterior","prev-job"]
	edu = ["academico","academic"]

    if(pos.indexOf(class_name)  > -1){
    	return 'position'
    }else if(edu.indexOf(class_name)  > -1){
    	return 'education'
    }else{
    	return 'none'
    }
}
 
function getFormData(){

	$ilist = $('input').not('.exclude');
	//console.log($ilist)
	ll = $ilist.length;
	val = "";
	obj2 = Object;
	$multiples_list = $('.arrr');
	//console.log($multiples_list)
	pl = $multiples_list.length;

	$ilist.each(function(i,it){
		$el = $(it)
			/** radio buttons checkados */
		    if($el.is(':radio')){

		      		if($el.is(':checked')){
		      	        objConsultor[$el.attr('name')] = $el.val();
		      	  	}else{		    
		      	  	    if(objConsultor[$el.attr('name')]==""){
		      	  	       //objConsultor[$el.attr('name')] = "null";   
		      	  	       objConsultor[$el.attr('name')] = " ";   
		      	  	    }
		      	  	}
		    }else{
		    	/** campos com elementos multiplos (arrays de fone e email) */
		    	if($el.attr('class')!=undefined && $el.attr('class').contains('arr')){
		    		$lista = $('[name="'+$el.attr('name')+'"]');

		    		$lista.each(function(i,it){
		    			var current_obj;

		    			$el = $(it);

		    			var val = $el.val()!=''?$el.val():null;
		    			var name = $el.attr('name').split('[]')[0];
		                var class_name = $el.attr('class');  
		            	if(class_name.contains('fone') || class_name.contains('phone') || class_name.contains('mobile')){
		            		if(!objConsultor.phones.contains(val)){
		            			objConsultor.addFone(val, name);
		            		}
		            	}else if(class_name.contains('email') || class_name.contains('mail')){
		            		if(!objConsultor.mails.contains(val)){
		            			objConsultor.addMail(val, name);
		            		}
		            	}
		    		});	
		    	}else{
		    		/** demais elementos */
		    		objConsultor[$el.attr('name')] = $el.val();
		    	}
		    }	
	})// fim do ilist.each

		$multiples_list.children().each(function(i,item){
			$item = $(item)

			var class_name = $item.attr('class').replace(/\d+/g,'')

				if(pos_or_edu(class_name) === 'position'){

					$npts = $item.find('.fields').find('p').find('input')
					//lang = $item.parent().parent().attr('id').replace(/\d+/g,'').replace(/[-]/g,'')

					exist = false;
					exist = objConsultor.positions.exists($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
												$npts[4].value, $npts[5].value, class_name)	
					if(exist===true){
					}else{
						if(typeof(objConsultor.positions[i])!="undefined"){

							objConsultor.positions[i].companyName = $npts[0].value
							objConsultor.positions[i].startDate = $npts[1].value
							objConsultor.positions[i].endDate = $npts[2].value
							objConsultor.positions[i].positionTitle = $npts[3].value
							objConsultor.positions[i].industry = $npts[4].value
							objConsultor.positions[i].summary = $npts[5].value
							objConsultor.positions[i].type = class_name

						}else{
							
							objConsultor.addPosition($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
													 $npts[4].value, $npts[5].value, class_name)
						}
					}
				}else if(pos_or_edu(class_name) === 'education'){
					$npts = $item.find('.fields').find('p').find('input')

					exists = false;
					exists = objConsultor.educations.exists($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
												$npts[4].value, $npts[5].value, class_name)
					if(exists===true){
					}else{
	
						if(typeof(objConsultor.educations[i])!="undefined"){

							objConsultor.educations[i].schoolName = $npts[0].value
							objConsultor.educations[i].local = $npts[1].value
							objConsultor.educations[i].startDate = $npts[2].value
							objConsultor.educations[i].endDate = $npts[3].value
							objConsultor.educations[i].activities = $npts[4].value
							objConsultor.educations[i].degree = $npts[5].value
							objConsultor.educations[i].type = class_name

						}else{
							
							objConsultor.addEducation($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
													 $npts[4].value, $npts[5].value, class_name)
						}
					}
				}
		})
	return objConsultor;
}

function clonePosition(ref){

	ctd_field = 0;
	var real_class, real_ctd;
	$inputs = [];
	$labels = [];

	ref.find('.morefield_frm3').parent().parent().on('click','.morefield_frm3',function(e){
		e.preventDefault();

		k = $(this).attr('class').split(' ');
		klazz = hasK(k[1]);
		clast = ref.parent().parent().find('[class^="'+klazz+'"]').last().attr('class')
	
		ctd_field++;

		$first = ref.parent().parent().find('[class^="'+klazz+'"]').first()

		$first.children('.fields').find('input').each(function(i,it){
			$inputs[i] = $(it)	
		})

		cc = '.'+klazz;

		$(cc).find('p').each(function(i,it){
			$labels[i] = $(it).text().trim()
		})

		num = parseInt(clast.match(/\d+/g))
		n = num+ctd_field
		n_klazz = clast.replace(/\d+/g,n)
		if(n_klazz === clast){
		    real_class = clast+ctd_field
		}else{
			real_class = n_klazz
		}

		$cloneposition = '<div class="'+real_class+'">';
        $cloneposition += '<fieldset class="fields">';
              $cloneposition += '<legend></legend>';
                $cloneposition += '<p>';
            	$cloneposition += $labels[0]+'<br />';
            	$cloneposition += '<input name="'+$inputs[0].attr('name')+'" type="text">';
                $cloneposition += '</p>';
                $cloneposition += '<p>';
            	$cloneposition += $labels[1].split(' ')[0]+'<input name="'+$inputs[1].attr('name')+'" class="data" type="text"> '+$labels[1].split(' ')[2]+' <input name="'+$inputs[2].attr('name')+'"  class="data" type="text">';
                $cloneposition += '</p>';
                $cloneposition += '<p>';
            	$cloneposition += $labels[2]+'<br />';
            	$cloneposition += '<input name="'+$inputs[3].attr('name')+'" type="text">';
                $cloneposition += '</p>';
                $cloneposition += '<p>';
            	$cloneposition += $labels[3]+'<br />';
            	$cloneposition += '<input name="'+$inputs[4].attr('name')+'" type="text">';
                $cloneposition += '</p>';
                $cloneposition += '<p>';
            	$cloneposition += $labels[4]+'<br />'
            	$cloneposition += '<input name="'+$inputs[5].attr('name')+'" type="text"><br />';
                $cloneposition += '<span class="desc">'
                $cloneposition += $labels[5];
                $cloneposition += '</span>';
                $cloneposition += '</p>';
            $cloneposition += '</fieldset>';
            $cloneposition += '<img class="minus_frm3" data-field="'+ctd_field+'" src ="images/minus16_icon.png"/></div>';
        $cloneposition += '</div>';

		$cloneposition = $($cloneposition);
	
		$last = ref.parent().parent().find('[class^="'+klazz+'"]').last();
		$cloneposition.attr('class',real_class).css('margin-top','40px');

		$last.after($cloneposition);

		$('html,body').animate({scrollTop:$(ref.parent().parent().find('.'+real_class+'')).offset().top}, 800);

	});

	$('.morefield_frm3,.morefield_frm4').parent().parent().on('click','.minus_frm3',function(e){
		//console.log('minus')
		$('html,body').animate({scrollTop:$($(this).parent().prevAll().first()).offset().top}, 800);
		$(this).parent().remove()
		$(this).remove()
	});

		ref.find('.morefield_frm4').parent().parent().on('click','.morefield_frm4',function(e){
			e.preventDefault();

			k = $(this).attr('class').split(' ');

			klazz = hasK(k[1]);
			clast = ref.parent().parent().find('[class^="'+klazz+'"]').last().attr('class')

			ctd_field++;

			$first = ref.parent().parent().find('[class^="'+klazz+'"]').first()

			$first.children('.fields').find('input').each(function(i,it){
				$inputs[i] = $(it)	
			})

			cc = '.'+klazz;

			$(cc).find('p').each(function(i,it){
				$labels[i] = $(it).text().trim()
			})

			num = parseInt(clast.match(/\d+/g))
			n = num+ctd_field
			n_klazz = clast.replace(/\d+/g,n)
			if(n_klazz === clast){
			    real_class = clast+ctd_field
			}else{
				real_class = n_klazz
			}
			
			$cloneducation = '<div class="'+real_class+'">';
	        	$cloneducation += '<fieldset class="fields">';
	        		$cloneducation += '<legend></legend>';
	        			$cloneducation += '<p>';
	     				 	$cloneducation += $labels[0]+'<br />';
	      					$cloneducation += '<input name="'+$inputs[0].attr('name')+'" type="text">';
	         			$cloneducation += '</p>';
	         			$cloneducation += '<p>';
	        				$cloneducation += $labels[1]+'<br />';
	        				$cloneducation += '<input name="'+$inputs[1].attr('name')+'" type="text">';
	        			$cloneducation += '</p>';
	         			$cloneducation += '<p>';
	     		 			$cloneducation += $labels[2].split(' ')[0]+'<input name="'+$inputs[2].attr('name')+'" class="data" type="text"> '+$labels[2].split(' ')[2]+' <input name="'+$inputs[3].attr('name')+'"  class="data" type="text">';
	         			$cloneducation += '</p>';
	         			$cloneducation += '<p>';
	      					$cloneducation += $labels[3]+'<br />';
	     					$cloneducation += '<input name="'+$inputs[4].attr('name')+'" type="text">';
	        			$cloneducation += '</p>';
	         			$cloneducation += '<p>';
	      					$cloneducation += $labels[4]+'<br />'
	      					$cloneducation += '<input name="'+$inputs[5].attr('name')+'" type="text"><br />';
	         			$cloneducation += '</p>';
	            $cloneducation += '</fieldset>';
	            $cloneducation += '<img class="minus_frm3" data-field="'+ctd_field+'" src ="images/minus16_icon.png"/></div>';
	        $cloneducation += '</div>';

			$cloneducation = $($cloneducation);
		
			$last = ref.parent().parent().find('[class^="'+klazz+'"]').last();
			$cloneducation.attr('class',real_class).css('margin-top','40px');

			$last.after($cloneducation);

			$('html,body').animate({scrollTop:$(ref.parent().parent().find('.'+real_class+'')).offset().top}, 800);
		});

}

function cloneField(form){
	
	ctd_field = 0;

	form.find('.morefield').parent().on('click','.morefield',function(e){

		klazz = $(this).parent().parent().find('.arr').attr('class').split(' ',1);
		name = $(this).parent().parent().find('.arr').attr('name');
		k = $(this).attr('class').split(' ');
		l = hasK(k[1]);
		$last = $(this).parent().parent().find('[name="'+l+'"]').parent().last();
		e.preventDefault();
		ctd_field++;

		$cf = $('<div class="arr-cont'+ctd_field+'"><input name="'+name+'" type="text" class="'+klazz+ctd_field+' arr"><img class="minus" data-field="'+ctd_field+'" src ="images/minus16_icon.png"/></div>').css('margin-top','20px');

		$last.after($cf);
	});

	$('[class^=arr-cont]').parent().on('click','.minus',function(e){
		$(this).parent().remove();
		$(this).remove();
	});

	/**/
	/*$('.pieces').parent().on('click','.pieces',function(e){
		console.log('pieces')
	})*/
}

function changeRadio(ref){
	ref.on('change','input:radio',function(){
	    getFormData();
	})
}

function changeInput(ref){
	ref.on('change',':text',function(){
	 	//console.log('X')
		getFormData();
	})
}

function setUp(ref,dados){
	changeRadio(ref);
	changeInput(ref);
	setOpacity(ref);
	btns(prev);
	cloneField(ref);
	clonePosition(ref);	
	setFields(dados);
	getFormData();
}

$(document).ready(function() {
	/** botao voltar */
	$("#footer").on('click','[name="prev"]',function(e){
		e.preventDefault();
		pn = parseInt($('[id^="pt"]').attr('data'));
		$('[name="cdc"]').html('');
		prev = pn>1? pn-1 : 1;
		str = 'form'+prev.toString()+'.html';
		$('[name="cdc"]').load(str,function(){
			setUp($(this),dados);
		});

		//$ant = $("#nav-top").find("ul").find("li").eq(prev-1).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #cf2b4f, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$ant = $("#nav-top").find("ul").find("li").eq(prev-1).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #999, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$ant.siblings().css({"width":"16%","height":"100%","backgroundImage":"","-moz-border-radius":"0px","-webkit-border-radius":"0px","border-radius":"0px"})
		$ant.addClass("live")
		$ant.siblings().removeClass("live")
	});

	/** botao avançar */
	$("#footer").on('click','[name="next"]',function(e){
		e.preventDefault();
		pn = parseInt($('[id^="pt"]').attr('data'));
		$('[name="cdc"]').html('');
		next = pn<4? pn+1 : 4;
		str = 'form'+next.toString()+'.html';
		$('[name="cdc"]').load(str,function(){
			setUp($(this),dados);
		})

		//$at = $("#nav-top").find("ul").find("li").eq(pn).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #cf2b4f, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$at = $("#nav-top").find("ul").find("li").eq(pn).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #999, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$at.siblings().css({"width":"16%","height":"100%","backgroundImage":"","-moz-border-radius":"0px","-webkit-border-radius":"0px","border-radius":"0px"})
		$at.addClass("live")
		$at.siblings().removeClass("live")

		if(($(".live").parent().parent().find('ul').find(".live").index()+1)==4){
			$("#btn-send").css('display','inline')
		}else{
			$("#btn-send").css('display','none')
		}
	});

	/** botoes numerados */
	$('#nav-top').find('ul').on('click','li',function(e){
		e.preventDefault();
		fn = $(this).find('img').attr('data');
		console.log('fn :'+fn)
		str = 'form'+fn+'.html';
		$('[name="cdc"]').html('');
		$('html, body').animate({
		        scrollTop: $('[name="cdc"]').offset().top
		}, 2000);
		$('[name="cdc"]').load(str,function(){
			setUp($(this),dados);
		});

		$(this).siblings().css({"width":"16%","height":"100%","backgroundImage":"","-moz-border-radius":"0px","-webkit-border-radius":"0px","border-radius":"0px"})
		//$(this).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #cf2b4f, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$(this).css({"width":"16%","height":"100%","backgroundImage":"linear-gradient(to bottom, #999, #980021 500%)","-moz-border-radius":"50px","-webkit-border-radius":"50px","border-radius":"50px"})
		$(this).addClass("live")
		$(this).siblings().removeClass("live")

		if(($(".live").parent().parent().find('ul').find(".live").index()+1)==4){
			$("#btn-send").css('display','inline')
		}else{
			$("#btn-send").css('display','none')
		}
	})


	$('#btn').on('click','#btn-send',function(e){
		e.preventDefault();
		if($(this).attr('data-send')=="post"){
			//z = JSON.stringify(getFormData());
			z = getFormData();
			//console.log(z)
			$.ajax({
				type: $(this).attr('data-send'),
				url: 'consultant',
				data: z,
				success: function(data){
				    //console.log(data)
				    window.alert(data);
				},
				error: function(jqxhr){
				    console.log(jqxhr)
				}
			})
		}else if($(this).attr('data-send')=="put"){
			z = getFormData();
			_id = window.location.href.substr(window.location.href.lastIndexOf("/")+1)
			$.ajax({
				type: $(this).attr('data-send'),
				url: 'consultant',
				data: {data:z,_id:_id},
				success: function(data){
				    //console.log(data)
				    window.alert(data);
				},
				error: function(jqxhr){
				    console.log(jqxhr)
				}
			})
		}
	})
		// trigger no form1
	   $("#nav-top").find('ul').find('li').find('img').eq(0).trigger('click');
	   cloneField($("#nav-top").parent().parent().find('[name="cdc"]'));


/*

//empregado, employed
//positions

//educations *

//publications

   
 trab = ["trab-atual","trab-anterior"]
 work = ["actual-job","prev-job"]
fones = ["fonetrabalho", "celular"]
phones = ["workphone","mobile"]

linkObj.values[0].firstName = dados['nome']
linkObj.values[0].lastName = dados['sobrenomenome-ultimo']
linkObj.values[0].dateOfBirth = {"day": dados['data-nasc'].split("/")[0],"month": dados['data-nasc'].split("/")[1],"year": dados['data-nasc'].split("/")[2]}
linkObj.values[0].emailAddress = dados['email-consultoria']
linkObj.values[0].mainAddress = dados.logradouro

for(var i in dados.educations){
    if(typeof dados.educations[i] !== 'function' && dados.educations[i].type=="academico"){
        //console.log(typeof(dados.educations[i]))
        //console.log(dados.educations[i].type)
          linkObj.values[0].educations.values.push({"activities": dados.educations[i].activities,"degree": dados.educations[i].degree, "endDate": {"year": dados.educations[i].endDate},"fieldOfStudy": "","schoolName": dados.educations[i].schoolName,"startDate": {"year": dados.educations[i].startDate}})
    }
}

for(var i in dados.phones){
    if(typeof dados.phones[i] != 'function' && dados.phones[i].phoneNumber != " " && fones.indexOf(dados.phones[i].phoneType)!=-1){
      console.log(dados.phones[i]) 
      linkObj.values[0].phoneNumbers.values.push({"phoneNumber": dados.phones[i].phoneNumber,"phoneType": dados.phones[i].phoneType})
    }
}


for(var i in dados.positions){
    if(typeof dados.positions[i] != 'function' && trab.indexOf(dados.positions[i].type)!=-1){
       console.log(dados.positions[i]) 
       linkObj.values[0].positions.push({"company": {"id": "","industry": "","name": "","size": "", "type": "" },"id": "", "isCurrent": "","startDate": {"month": "", "year": ""  },"summary": "","title": ""})
    }
}

*/
});