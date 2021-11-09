var population = 5;
var timerID;

resources = ["wood", "stone", "food"];

resourceAmounts = {} // resource: amount of resource owned

popAssigned = {}; // resource: population assigned to resource

for (var i = 0; i < resources.length; i++) {
    resourceAmounts[resources[i]] = 0;
    popAssigned[resources[i]] = 0;
}

function addWorker(resource){
    if (population > 0) {
        population--;
        popAssigned[resource]++;
        updateText();
    }
}

function removeWorker(resource) {
    if (population < 5 && popAssigned[resource] > 0) {
        population++;
        popAssigned[resource]--;
        updateText();
    }
}

function updateText() {
    var pop = document.getElementById("population");
    pop.innerHTML = "population: " + population;

    for (var i = 0; i < resources.length; i++) {
        var res = resources[i];
        var resourceText = document.getElementById(res);
        resourceText.innerHTML = res + ": " + resourceAmounts[res] + " (" + popAssigned[res] + " workers)";
    }

}

function addNumber() {
    for (var i = 0; i < resources.length; i++) {
        var res = resources[i];
        resourceAmounts[res] += popAssigned[res];
        updateText();
    }
}

function startTimer(delay) {
    timerID = setInterval(addNumber, delay);
}

function stopTimer() {
    clearInterval(timerID);
}