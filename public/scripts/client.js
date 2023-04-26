$(document).ready(function() {
  console.log("READY!");
  loadTweets();
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    const text = $("#tweet-text").val();
    if (text.length > 140) {
      alert("Characters exceeded 140!");
    } else if (text === null) {
      alert("Please input your tweet!");
    } else {
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $(this).serialize(),
    }).then(function() {
      loadTweets();
    });
  }
  });
});



function createTweetElement(tweetObj) {
  const username = tweetObj.user.name;
  const userAvatar = tweetObj.user.avatars;
  const userID = tweetObj.user.handle;
  const content = tweetObj.content.text;
  const contentTime = tweetObj.created_at;

  const markup = `<article>
    <div class="tweet-account">
      <img alt="profile-picture" src=${userAvatar}>
        <div>
          <span>${username}</span>
        </div>
        <span class="account-id">${userID}</span>
    </div>
    <div class="tweet-text">${content}</div>
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

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(".all-tweets").prepend($tweet);
  }
}

function loadTweets() {
  console.log("loading tweets...");
  $.ajax("/tweets/", { method: "GET" })
    .then(function(tweets) {

      $(".all-tweets").empty();
      renderTweets(tweets);

      $(".icons").children().each(function() {
        $(this).on("click", function() {
          $(this).toggleClass("fas");
        });
      });
    }
    );
}
