

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
	            $('[name="obras"]:eq(0)').val(dados.publications.values[0].title)
	        }
	        if(lobras>1 && i>0){
	        	$clone = $('[name="obras"]').clone()
	        	$('[name="obras"]').after($clone)
	        	$('[name="obras"]:eq('+i+')').val(dados.publications.values[i].title)
	        	$('[name="obras"]:eq('+i+')').css('margin-top','20px')
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

	if(pn==1){
	    $('.fim').css('opacity','0.1').css('cursor','default')
	    $('.comeco').css('opacity','1.0').css('cursor','pointer')

	}else if(pn==4){
	    $('.fim').css('opacity','1.0').css('cursor','pointer')
	    $('.comeco').css('opacity','0.1').css('cursor','default') 

	}else{
	    $('.fim').css('opacity','1.0').css('cursor','pointer')
	    $('.comeco').css('opacity','1.0').css('cursor','pointer')
	}
}

/*function addToJsonArray(arr,item) {
    arr.push({
        '"'+item.key+'"': item.value,
        '"'+item.key+'"': item.value
    });
}*/


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

/*Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        console.log(this[i][Object.keys(this[i])[0]])
        console.log(obj[Object.keys(obj)[0]])
        if (this[i][Object.keys(this[i])[0]] == obj[Object.keys(obj)[0]]) {
            return true;
        }
    }
    return false;
}*/
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
        console.log('Exists?')
        obj = [p1,p2,p3,p4,p5,p6,p7]
        ct = 0;
        index = 0;
        
        for(var k in this){
        	//console.log('obj atual da colecao')
        	//console.log(this[k])
                for(var i in this[k]){

                        if(typeof(this[k][i])!=='undefined' && typeof(this[k][i])!=='function' && this[k][i] instanceof Function == false ){
                          console.log('indice atual :'+index)
                          console.log('val do obj :'+this[k][i].toString()+' == '+' val do param :'+obj[index].toString())
                         //console.log(this[k][i]+' '+obj[index].toString())
                                this[k][i].toString() == obj[index].toString()? ct++ : '';
                                index+=1;
                                console.log('val do ct :'+ct)
                        }
                }
                index = 0;
                console.log('val final do ct :'+ct)
                if(ct == 7){
                        console.log('igual')
                        console.log(this[k])
                        return true
                }else{
                        console.log('diferente')
                        console.log(this[k])
                        ct = 0
                }
        }        
}

//activities,degree,endDate,startDate,fieldOfStudy,schoolName

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
addEducation : function(number, type){
	objConsultor.educations.push({"phoneNumer" : number, "phoneType" : type})
},
"positions" : [],
addPosition : function(company_name, start_date, end_date, position_title, industry, summary, type){
	objConsultor.positions.push({"companyName" : company_name, "startDate" : start_date, "endDate" : end_date, 
						 "positionTitle" : position_title, "industry" : industry, "summary" : summary, "type" : type})
},
"phones" : [],
addFone : function(number, type){
	objConsultor.phones.push({"phoneNumer" : number, "phoneType" : type})
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
			"oths":"others-email[]","atual":"trab-atual","ant":"trab-anterior","actual":"actual-job","prev":"prev-job"}

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
	ll = $ilist.length;
	val = "";
	obj2 = Object;
	$positions_list = $('.arrr');
	//console.log($positions_list)
	pl = $positions_list.length;

	$ilist.each(function(i,it){
		$el = $(it)
			/** radio buttons checkados */
		    if($el.is(':radio')){
		    	if($el.is(':checked')){
		            kkk = $el.attr('name');
		            objConsultor[kkk] = $el.val();
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
		    		kk = $el.attr('name')
		    		objConsultor[kk] = $el.val();
		    	}
		    }	
	})// fim do ilist.each
	$positions_list.each(function(i,it){

		$(it).children().each(function(i,item){
			$item = $(item)

			var class_name = $item.attr('class').replace(/\d+/g,'')
				if(pos_or_edu(class_name) === 'position'){

					$npts = $item.find('.fields').find('p').find('input')

					exist = false;
		
					exist = objConsultor.positions.exists($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
												 $npts[4].value, $npts[5].value, class_name)
					console.log('EXIST')
					console.log(exist)
						
					if(exist==true){
						console.log('existe!')
						objConsultor.positions[i].companyName = $npts[0].value
						objConsultor.positions[i].startDate = $npts[1].value
						objConsultor.positions[i].endDate = $npts[2].value
						objConsultor.positions[i].positionTitle = $npts[3].value
						objConsultor.positions[i].industry = $npts[4].value
						objConsultor.positions[i].summary = $npts[5].value
						objConsultor.positions[i].type = class_name
					}else{
						console.log('non exciste!')
						objConsultor.addPosition($npts[0].value, $npts[1].value, $npts[2].value, $npts[3].value,
												 $npts[4].value, $npts[5].value, class_name)
					}

				}else if(pos_or_edu(class_name) === 'education'){

				}
		})
	})
	return objConsultor;
}

function clonePosition(ref){
	//console.log('clonePosition')

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

	$('.morefield_frm3').parent().parent().on('click','.minus_frm3',function(e){
		//console.log('minus')
		$('html,body').animate({scrollTop:$($(this).parent().prevAll().first()).offset().top}, 800);
		$(this).parent().remove()
		$(this).remove()
	});
}

function cloneField(form){
	//console.log('cloneField')
	
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
}

function setUp(ref,dados){
	setOpacity(ref)
	btns(prev);
	setFields(dados);
	cloneField(ref);
	clonePosition(ref);	
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
	});

	/** botoes numerados */
	$('#nav-top').find('ul').on('click','li',function(e){
		e.preventDefault();
		fn = $(this).find('img').attr('data');
		//console.log('fn :'+fn)
		str = 'form'+fn+'.html';
		$('[name="cdc"]').html('');
		$('html, body').animate({
		        scrollTop: $('[name="cdc"]').offset().top
		}, 2000);
		$('[name="cdc"]').load(str,function(){
			setUp($(this),dados);
		});
	})

	$('#hub').click(function(e){
		e.preventDefault();
		z = JSON.stringify(getFormData());
		console.log(z)
		console.log('click')
		$.ajax({
			type: 'post',
			url: 'consultant',
			data: z,
			success: function(data){
			    console.log(data)
			},
			error: function(jqxhr){
			    console.log(jqxhr)
			}
		})
	})

	//morefield

	/** controle de opacidade do form (pt/en) */

	/*
	$("h1").click(function(e){
	author = 'autor da msg';
	body = 'corpo da msg';
	submit = 'Enviar dados';
	title = 'titulo da msg';
	$.ajax({
	type: 'post',
	url: window.location.href+'newpost',
	data:{author:author,body:body,submit:submit,title:title},
	success: function(data){
	    console.log(data);
	    window.location = window.location.href
	},
	error: function(jqxhr){
	    console.log(jqxhr);
	}
	});
	});
	*/
	   $("#nav-top").find('ul').find('li').find('img').eq(0).trigger('click');
	   cloneField($("#nav-top").parent().parent().find('[name="cdc"]'));

});







