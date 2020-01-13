$(document).on('ready pjax:success', function() {
  setTimeout(function(){
    $('select[multiple="multiple"]').each(function(index, elem){
      $(elem).find('option').sort(function(a, b){
        return strcmp($(a).attr('title'), $(b).attr('title'));
      }).appendTo(elem);
    });
  }, 600);
});

function strcmp(a, b)
{   
  return (a<b?-1:(a>b?1:0));  
}