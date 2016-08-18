/**
 * Created by Alen Bumbulovic on 8/5/2016.
 */
$(document).ready(function(){
    $('.delete-project').on('click', function(){
        var id = $(this).data('id');
        var url = '/admin/delete/'+id;
        if(confirm('Delete Project?')){
            $.ajax({
                url: url,
                type:'DELETE',
                success: function(result){
                    window.location = '/admin/index';
                }, error: function(err){
                    console.log(err);
                }
            });
        }
    });
});