var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // to verify

var userClickedPattern = []; // user click buttons

var started = false; // keep track of game start

var level = 0; // keep track of levels

function nextSequence() {

    userClickedPattern = []; // reset for next level

    // increment level
    level++;

    // change h1 title
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4); // 0-3
    
    var randomChosenColour = buttonColours[randomNumber]; // select a random color
    gamePattern.push(randomChosenColour); // push to list

    // jQuery to select button of chosen colour and Animate
    $("#"+randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);
}

// to detect any button on click and get it's id
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // last index
    checkAnswer(userClickedPattern.length-1)
});

function playSound(path){
    // Play Sound
    var audio = new Audio("./sounds/"+path+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed").delay(100).removeClass("bg1");

    // remove after 200 ms
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    }, 200);
}

// jQuery for keyboard pressed key to start game
$(document).keydown(function(){
    // start on first key press only
    if(!started){
        
        // change h1 title
        $("#level-title").text("Level "+level);

        // start game
        nextSequence();

        started = true; // to toggle
    }
});

// how Simon game works
// Firstly, the game shows the first colour in the sequence (blue). 
// The user clicks on the blue button.

// Next, the game shows the next colour (red), the user 
// has to remember the sequence is blue, red and so on and so forth.

// If the user messes up the sequence, then the game ends.

function checkAnswer(currentIndex){
    if(userClickedPattern[currentIndex] === gamePattern[currentIndex]){
        // console.log("Success");
        // finished the sequence?
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000); // delay 1s for next sequence
        }
    } else{
        // console.log("wrong");
        playSound("wrong");
        
        // apply style for game-over
        $("body").addClass("game-over");

        // remove style after delay of 300ms
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 300);

        // change h1 title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// restart the game and reset all variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}