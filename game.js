var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var Level = 0;
var startGame = 0;
function nextSequence() {
  userClickedPattern = [];
  Level++;
  $("h1").text("Level " + Level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  if(startGame > 0){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  }
});

$(".start").click(function ()
{
  if (Level == 0) {
    $("h1").text("Level " + Level);
    startGame++;
    nextSequence();
  }
});
  
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence(); }, 1000);
    }
  }
   else
   {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");}, 200);
      $("h1").text("Game Over, click New Game to Restart");  
      startOver()
  }
}

function startOver()
{
  Level = 0;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
