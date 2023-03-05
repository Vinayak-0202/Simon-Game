var buttonColorArray = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var randomChoosenColor = "red";
var userClikedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    level++;
    var randomNumber = Math.round(Math.random() * 3);// genrate no randomly in range [0-3]
    $("h1").text("Level " + level); //Updates Level As you goes upon playing.
    console.log(randomNumber);
    randomChoosenColor = buttonColorArray[randomNumber];
    gamePattern.push(randomChoosenColor); 
    console.log("gamepattern "+gamePattern);
    $("."+randomChoosenColor).fadeOut(100).fadeIn(100); // if any key pressed it blinks the button.
    playSound(randomChoosenColor);  //Plays the Unique Sound  Base on choossen color
    
}


$(document).on("keypress", function () {
    if (!started) {
        started = true;
        nextSequence();
    }

});

var idx=-1;

$(".btn").on("click", function () { 
    var userChosenColor = $(this).attr("id");   // fetching the id of element which was clicked by user.
    playSound(userChosenColor); // it plays the sound when button is clicked.
    animatePress(userChosenColor); // buuton is blinks when user click on button. 
    userClikedPattern.push(userChosenColor);
    console.log(userClikedPattern);  
    checkSquence(++idx);

})

// plays sound when user click the button  or presses the key
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// blinks the button after user click or press the key.
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100)
}

//This Function Checks the Usepattern is Simalr to the GamePattern if wrong Displays the Game Over message, Click anywhere to restart.
function checkSquence(currentLevel) {
    if (gamePattern[currentLevel] === userClikedPattern[currentLevel]) {  
        if(userClikedPattern.length === gamePattern.length) {  
            userClikedPattern=[];  
            console.log("userClikedPattern "+userClikedPattern); 
            idx=-1;
           setTimeout(function(){ nextSequence(); }, 1000); 
        }
        console.log("Sucess");
    } else {                      // if user choose wrong answer then  h1 changes to came 'Game Over' and screen become red
        playSound("wrong");    // play sound if user answer is wromg
        $("body").addClass("game-over"); 
        $('h1').text("Game Over, Press Any Key to Restart");  
        setTimeout(function(){ $("body").removeClass("game-over")},200);  
        statOver();
        
    }
} 


function statOver(){
    level=0;
    gamePattern=[];
    started=false;
   // userClikedPattern=[];
}