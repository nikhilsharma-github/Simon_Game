// CREATING ARRAYS FOR STORING VALUES

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var score = 0;

// CHANGING THE MAIN MENU AND STARTING, LEVEL UP THE GAME
$("h1").on("click", function () {
  if (started === false) {
    $("h1").text("Level " + level);
    $(".score h2 em").text("SCORE : " + score);
    restartGame();
    nextSequence();
    started = true;
  }
});
// Function for button click

$(".btn").on("click", function (event) {
  // var userChosenColor=this.id;
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// NEXT SEQUENCE FUNCTION DEFINING
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("." + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  //  nextSequence();
}

// Calling function to perform
// nextSequence();

// PLAYING SOUND FUNCTION
function playSound(audioFileName) {
  var audioFile = new Audio("sounds/" + audioFileName + ".mp3");
  console.log(audioFileName);
  if (audioFileName == "wrong") audioFile.volume = 0.4;
  audioFile.play();
}

// FUNCTION FOR ADDING CLICK ANIMATION
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 150);
}

// CHECK ANSWER FUNCTION FOR LEVEL RESULT
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    score++;
    $(".score h2 em").text("SCORE : " + score);

    // console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      $("h1").text("LEVEL CLEARED");
      $("h1").fadeIn(100).fadeOut(100).fadeIn(100);
      $("body").addClass("level-cleared");
      setTimeout(function () {
        $("body").removeClass("level-cleared");
      }, 300);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over, Press Here to Restart");

    $(".score h2 em").addClass("good-luck");
    $(".score h2 em").text("YOUR BEST SCORE IS : " + score);

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    restartGame();
  }
}

// RESET LEVEL
function restartGame() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  score = 0;
}

//  HOW TO PLAY TOGGLE BAR
var toggle = 1;
$(".instructions").slideUp();

$("#howToPlayID").click(function () {
  if (toggle == 1) {
    $(".instructions").slideToggle(800);
    $("#howToPlayID").css("color", "orangered");

    $(this).toggleClass("down");
  }
  else{
    $(".instructions").slideToggle(800);
    $("#howToPlayID").css("color", "yellow");
    
    $(this).toggleClass("down");
  }
  toggle = 1-toggle;
});

// $(".row").hide();
