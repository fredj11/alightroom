var population = 5;
var weapons = 0;
var multiplier = 5;
var availWorkers = population;
var maxPop = population;
var timerID;

resources = ["wood", "stone", "food"]; // food has to be at the end of the list

resourceAmounts = {}    // resource: amount of resource owned

popAssigned = {}; // resource: workers assigned to resource

for (var i = 0; i < resources.length; i++) {
    resourceAmounts[resources[i]] = 0;
    popAssigned[resources[i]] = 0;
}


function startTimer(delay) {
    timerID = setInterval(addNumber, delay);
}

function stopTimer() {
    clearInterval(timerID);
}

function addWorker(resource, num){
    if (availWorkers >= num) {
        availWorkers -= num;
        popAssigned[resource] += num;
        updateText();
    }
}

function removeWorker(resource, num) {
    if (popAssigned[resource] >= num) {
        availWorkers += num;
        popAssigned[resource] -= num;
        updateText();
    }
}

function updateText() {
    var pop = document.getElementById("population");
    var w = document.getElementById("weapons");
    var workers = document.getElementById("availWorkers");

    pop.innerHTML = "Population: " + population + "/" + maxPop;
    w.innerHTML = "Weapons: " + weapons;
    workers.innerHTML = "Available Workers: " + availWorkers;

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
    }

    // Update food separately
    updateFoodBar();

    // This can be done through purshase in some menu later
    buildHouse();
    makeWeapon();
    increasePopulation();

    updateText();
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
    } else if (foodBar.value == 0) {
        foodBar.value = 0;
        // Do something when food runs out
        // Does this work ??
        window.location = "https://il8.picdn.net/shutterstock/videos/17253376/thumb/6.jpg";
    } else if (resourceAmounts["food"] > 0 && foodBar.value < 100) {
        foodBar.value += resourceAmounts["food"];
        resourceAmounts["food"] = 0;
    }
}

function buildHouse() {
    while (resourceAmounts["wood"] >= population*multiplier) {
        resourceAmounts["wood"] -= population*multiplier;
        maxPop += 1;
    }
}

function makeWeapon() {
    while (resourceAmounts["stone"] >= population*multiplier) {
        resourceAmounts["stone"] -= population*multiplier;
        weapons++;
    }
}

function increasePopulation() {
    while (resourceAmounts["food"] >= population*multiplier && maxPop > population) {
        resourceAmounts["food"] -= population*multiplier;
        population++;
        availWorkers++;
    }
}