$(document).ready(function(){

    $('.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $(".pull-left,.pull-right").on('click','#remove',function(e){
        if(confirm('Tem certeza que deseja remover esse registro ?')){
            $clk = $(this)
            e.preventDefault()
            $.ajax({
                type: "delete",
                url:  "consultant",
                data: {_id:$(this).attr('data-id')},
                success: function(data){
                    window.alert(data)
                    $clk.closest('tr').remove();
                },
                error: function(jqxhr){
                    window.alert(jqxhr)
                }
            })
        }
    })

	//window.alert('hey!')
	/*$('[name="submit"]').click(function(e){
	    e.preventDefault();
	    login = $('[name="login"]').val();
	    pass = $('[name="password"]').val();
	    
	    $.ajax({
	        type: 'post',
	        url: 'login',
	        data: {login:login,password:pass},
	        success: function(data){
	            console.log(data)
	            if(data.msg==0){
	            	$(".alert-error").css("display","block")
	            }else{

	            }
	        },
	        error: function(jqxhr){
	            console.log(jqxhr)
	        }
	    })
	})*/

/*
$.ajax({
    type: 'post',
    url: 'user',
    data: {login:"admin",password:"e0licas2013"},
    success: function(data){
        console.log(data)
    },
    error: function(jqxhr){
        console.log(jqxhr)
    }
})
*/

/*
str = window.location.href
tk = str.lastIndexOf("/")
root = str.substr(0,tk)

$(".table-striped").on('click','.consultant_row',function(e){
    e.preventDefault();
    _id = $(this).attr('data-id');
    
    $.ajax({
        type: 'get',
        url: root+'/consultants/'+_id,
        success: function(data){
             console.log(data)
        },
        error: function(jqxhr){
            //console.log(jqxhr)
        },
        statusCode: function(jqXHR) {
               console.log(jqXHR)
        },
        complete: function(xmlHttp) {
            // xmlHttp is a XMLHttpRquest object
            //console.log(xmlHttp);
         }
    })
})*/
});