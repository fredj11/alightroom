var population = 5;
var timerID;

resources = ["wood", "stone", "food"]; // food has to be at the end of the list

resourceAmounts = {}    // resource: amount of resource owned

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
    pop.innerHTML = "Population: " + population;

    for (var i = 0; i < resources.length; i++) {
        var res = resources[i];
        var resourceText = document.getElementById(res);
        resourceText.innerHTML = res + ": " + resourceAmounts[res] + " (" + popAssigned[res] + " workers)";
    }

}

function addNumber() {
    for (var i = 0; i < resources.length-1; i++) {
        var res = resources[i];
        resourceAmounts[res] += popAssigned[res];
        updateText();
    }

    // Update food separately
    updateFoodBar();
}

function updateFoodBar() {
    var foodBar = document.getElementById("foodstatus");
    resourceAmounts["food"] += popAssigned["food"] - 2;
    if (resourceAmounts["food"] < 0) {
        foodBar.value += resourceAmounts["food"];
        resourceAmounts["food"] = 0;
    }
    if (foodBar.value > 100) {
        foodBar.value = 100;
    } else if (foodBar.value < 0) {
        foodBar.value = 0;
        // Do something when food runs out
    } else if (resourceAmounts["food"] > 0 && foodBar.value < 100) {
        foodBar.value += resourceAmounts["food"];
        resourceAmounts["food"] = 0;
    }
}

function startTimer(delay) {
    timerID = setInterval(addNumber, delay);
}

function stopTimer() {
    clearInterval(timerID);
}