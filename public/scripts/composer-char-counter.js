$(document).ready(() => {
  /*  monitoring the input character length
  if character length > 140, appear negative value */
  function updateCharLength(charLength) {
    const displayCount = 140 - charLength;
    return displayCount;
  }

  $("#tweet-text").on("input", function() {
    const charLimit =  updateCharLength(this.value.length);
    const count = $(this).siblings("div").find(".counter");
    count.text(charLimit);

    if (charLimit < 0) {
      count.css("color", "red");
    } else {
      count.css("color", "#4056A1");
    }
  });
});