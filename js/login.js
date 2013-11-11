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
                    $('.count_consult').text(parseInt($('.count_consult').text())-1)
                },
                error: function(jqxhr){
                    window.alert(jqxhr)
                }
            })
        }
    })

	//window.alert('hey!')

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
});