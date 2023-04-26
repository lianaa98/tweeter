$(document).ready(function() {
  loadTweets();
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    $("#tweet-text").css("background-color", "transparent");
    $(".warning").slideUp();
    $("#warn-text").text("");
    const text = $("#tweet-text").val();
    if (text.length > 140) {
      $("#tweet-text").css("background-color", "#d1b1c879");
      $(".warning").slideDown();
      $("#warn-text").text("Oops! Your tweet is too long!");
    } else if (text === "") {
      $("#tweet-text").css("background-color", "#d1b1c879");
      $(".warning").slideDown();
      $("#warn-text").text("You have to tweet something");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $(this).serialize(),
      }).then(function() {
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").text(140);
      });
    }
  });
});


// =============================================
// ||  Helper functions to render all tweets  ||
// =============================================
function createTweetElement(tweetObj) {
  const username = tweetObj.user.name;
  const userAvatar = tweetObj.user.avatars;
  const userID = tweetObj.user.handle;
  const content = tweetObj.content.text;
  const contentTime = tweetObj.created_at;

  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const markup = `<article>
    <div class="tweet-account">
      <img alt="profile-picture" src=${userAvatar}>
        <div>
          <span>${username}</span>
        </div>
        <span class="account-id">${userID}</span>
    </div>
    <div class="tweet-text">${escape(content)}</div>
    <div class="tweet-stat">
      <div class="timeago">${timeago.format(contentTime)}</div>
      <div class="icons">
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-regular fa-flag"></i>
      </div>
    </div>
  </article>`;

  return markup;
}

function renderTweets(tweets) {
  $(".all-tweets").empty();

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(".all-tweets").prepend($tweet);
  }
}

function loadTweets() {
  console.log("loading tweets...");
  $.ajax("/tweets/", { method: "GET" })
    .then(function(tweets) {

      renderTweets(tweets);

      $(".icons").children().each(function() {
        $(this).on("click", function() {
          $(this).toggleClass("fas");
        });
      });
    }
    );
}
