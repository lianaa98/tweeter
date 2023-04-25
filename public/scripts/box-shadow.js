$(document).ready(() => {

  $("article").hover(function() {
    $(this).addClass("box");
  }, function() {
    $(this).removeClass("box");
  })

})