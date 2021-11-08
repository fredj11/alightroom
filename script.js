var delay = 1;
var cash = 0;

function buttonClick()
{
    delay++;
    stopTimer();
    startTimer();
}

function addNumber() {
    var number = document.getElementById("number");
    number.innerHTML = cash++;
    console.log(cash);
}

var intervalID;
function startTimer() {
    intervalID = setInterval(addNumber, 1000/delay);
    console.log("interval started")
}

function stopTimer() {
    clearInterval(intervalID);
}