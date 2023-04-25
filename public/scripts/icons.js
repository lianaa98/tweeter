$(document).ready(function() {

  const $icon = $(".icons").children().each(function() {
    $(this).on("click", function() {
      $(this).toggleClass("fas");
    });
  });
});