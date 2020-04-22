var culori = ["green", "red", "yellow", "blue"];
var pattern = [];
var choosenPattern = [];
var level = 0;

var started = false;


$("h1").on("tap", function()
{
    if (level == 0)
    {
        nextColor();
        started = true;
    }
});

$("h1").on("click", function()
{
    if (level == 0)
    {
        nextColor();
        started = true;
    }
});

function checkAnswer(currentLevel)
{
    if (pattern[currentLevel] == choosenPattern[currentLevel])
    {   
        console.log("Succes");
        
        //Vedem daca a terminat cu bine levelu
        if (pattern.length == choosenPattern.length)
        {
            setTimeout(nextColor, 1000)
        }
    }
    else
    {
        console.log("Ai pierdut");
        $("h1").text("Game Over! Press Here To Start");
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        level = 0;
        choosenPattern = [];
        pattern = [];
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200)
    }
}

function animateit(color)   //Animation
{
    //Flash the button
    $("." + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play the sound when button is choosed
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

    //Change the css for 0.1 seconds
    $("." + color).addClass("pressed");     
    setTimeout(function(){ 
        $("." + color).removeClass("pressed");
    }, 100);
}

$(".btn").on("tap", function()
{   
    if (level != 0)
    {
        var choosenColor = $(this).attr("id");
        choosenPattern.push(choosenColor);
        
        animateit(choosenColor);
    
        //Verificam
        checkAnswer(choosenPattern.length - 1);
    }
})


$(".btn").on("click", function()
{   
    if (level != 0)
    {
        var choosenColor = $(this).attr("id");
        choosenPattern.push(choosenColor);
        
        animateit(choosenColor);
    
        //Verificam
        checkAnswer(choosenPattern.length - 1);
    }
})


function nextColor()
{
    choosenPattern = [];

    var randomColor =  culori[Math.floor(Math.random() * 4)];
    pattern.push(randomColor);

    animateit(randomColor);

    level++;
    $("h1").text("Level " + level);
}
