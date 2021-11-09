var population = 5;
var delay = 0;
var cash = 0;

function addWorker()
{
    if (population > 0) {
        delay++;
        stopTimer();
        startTimer();
        population--;
        updatePop();
    }
}

function removeWorker() {
    if (population < 5) {
        delay--;
        stopTimer();
        startTimer();
        population++;
        updatePop();
    }
}

function updatePop() {
    var pop = document.getElementById("population");
    pop.innerHTML = "population: " + population;
}

function addNumber() {
    var number = document.getElementById("number");
    number.innerHTML = "money: " + cash++;
}

var intervalID;
function startTimer() {
    if (delay > 0)
        intervalID = setInterval(addNumber, 1000/delay);
}

function stopTimer() {
    clearInterval(intervalID);
}