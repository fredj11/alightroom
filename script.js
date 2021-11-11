var population = 5;
var weapons = 0;
var multiplier = 5;
var availWorkers = population;
var maxPop = population;
var timerID;

var days = 0;

resources = ["wood", "stone", "food"]; // food has to be at the end of the list
shopButtons = ["buyHouseBtn", "craftWpnBtn", "addPopBtn"]

resourceAmounts = {}    // resource: amount of resource owned

popAssigned = {}; // resource: workers assigned to resource

for (var i = 0; i < resources.length; i++) {
    resourceAmounts[resources[i]] = 0;
    popAssigned[resources[i]] = 0;
}

function waitForStart() {
    updateText();
    btns = document.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }
}

function startGame() {
    btns = document.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
    }
    startBtn = document.getElementById("start_button");
    startBtn.style.visibility = "hidden";
    startBtn.disabled = true;
    startTimer(500);
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
    var s = document.getElementById("next-cost");
    var dayTxt = document.getElementById("daysPassed");
    var workers = document.getElementById("availWorkers");

    pop.innerHTML = "Population: " + population + "/" + maxPop;
    w.innerHTML = "Weapons: " + weapons;
    s.innerHTML = "Next cost: " + population*multiplier;
    workers.innerHTML = "Available Workers: " + availWorkers;
    dayTxt.innerHTML = "Day " + days;

    for (var i = 0; i < resources.length; i++) {
        var res = resources[i];
        var resourceText = document.getElementById(res);
        resourceText.innerHTML = res + ": " + resourceAmounts[res] + " (" + popAssigned[res] + " workers)";
    }

}

function addNumber() {
    days++;
    for (var i = 0; i < resources.length-1; i++) {
        var res = resources[i];
        resourceAmounts[res] += popAssigned[res];
    }
    // Update food separately
    updateFoodBar();

    updateShopBtns();

    updateText();
}

function updateFoodBar() {
    var foodBar = document.getElementById("foodstatus");
    resourceAmounts["food"] += popAssigned["food"] - 2;
    fbMax = foodBar.max;
    if (resourceAmounts["food"] < 0) {
        foodBar.value += resourceAmounts["food"];
        resourceAmounts["food"] = 0;
    }
    if (foodBar.value >= fbMax) {
        foodBar.value = fbMax;
    } else if (foodBar.value <= 0) {
        foodBar.value = 0;
        // Do something when food runs out
        // Does this work ??
        window.location.assign("gameover.html");
    } else if (resourceAmounts["food"] > 0 && foodBar.value < fbMax) {
        foodBar.value += resourceAmounts["food"];
        resourceAmounts["food"] = 0;
    }
}

function updateShopBtns() {
    for (var i = 0; i < resources.length-1; i++) {
        var res = resources[i];
        if (resourceAmounts[res] >= population*multiplier) {
            var shopBtn = document.getElementById(shopButtons[i]);
            shopBtn.disabled = false;
        }
    }

    // Handle food separately
    var res = resources[resources.length-1]
    if (resourceAmounts[res] >= population*multiplier && population < maxPop) {
        var shopBtn = document.getElementById(shopButtons[i]);
        shopBtn.disabled = false;
    }
}

function buildHouse() {
    resourceAmounts["wood"] -= population*multiplier;
    maxPop += 1;
    var woodBtn = document.getElementById("buyHouseBtn");
    woodBtn.disabled = true;
}

function makeWeapon() {
    resourceAmounts["stone"] -= population*multiplier;
    weapons++;
    var weaponBtn = document.getElementById("craftWpnBtn");
    weaponBtn.disabled = true;
}

function increasePopulation() {
    resourceAmounts["food"] -= population*multiplier;
    population++;
    availWorkers++;
    var foodBtn = document.getElementById("addPopBtn");
    foodBtn.disabled = true;
}