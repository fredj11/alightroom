var population = 5;

resources = ["wood", "stone", "food"];

resourceAmounts = {}    // resource: amount of resource owned

timers = {};            // resource: timerID of resource

popAssigned = {};       // resource: population assigned to resource

for (var i = 0; i < resources.length; i++) {
    resourceAmounts[resources[i]] = 0;
    popAssigned[resources[i]] = 0;
}

function addWorker(resource)
{
    if (population > 0) {
        stopTimer(resource);
        startTimer(resource);
        population--;
        popAssigned[resource]++;
        updateText();
    }
}

function removeWorker(resource) {
    if (population < 5 && popAssigned[resource] > 0) {
        stopTimer(resource);
        startTimer(resource);
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

function addNumber(resource) {
    var number = document.getElementById(resource);
    console.log("adding " + resource);
    resourceAmounts[resource]++;
    number.innerHTML = resource + ": " + resourceAmounts[resource] + " (" + popAssigned[resource] + " workers)";
}

function startTimer(resource) {
    if (popAssigned[resource] > 0) {
        var timerID = setInterval(function() { addNumber(resource)}, 1000/popAssigned[resource]);
        timers[resource] = timerID;
    } 
}

function stopTimer(resource) {
    clearInterval(timers[resource]);
}