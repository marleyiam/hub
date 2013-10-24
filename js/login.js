$(document).ready(function(){
	//window.alert('hey!')
	$('[name="submit"]').click(function(e){
	    e.preventDefault();
	    login = $('[name="login"]').val();
	    pass = $('[name="password"]').val();
	    
	    $.ajax({
	        type: 'post',
	        url: 'login',
	        success: function(data){
	            console.log(data)
	        },
	        error: function(jqxhr){
	            console.log(jqxhr)
	        }
	    })
	})

});