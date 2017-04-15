var Nation = Nation || {};

Nation.Country = {};

Nation.Country.init = function(stats) {
	this.year = stats.year;
	this.population = stats.population;
	this.territory = stats.territory;
	this.gold = stats.gold;
	this.food = stats.food;
	this.military = stats.military;
	this.happiness = stats.happiness;
}

Nation.Country.checkIfLost = function() {
	if (this.population <= 0 || this.territory <= 0) {
		var logMessage = "\nYou lost\n";
		document.getElementById("log").innerHTML += logMessage;
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
	}
}

Nation.Country.attack = function() {
	var attack = false;
	var randInt = getRandomInt(0,100);
	var enemyStrength = Nation.BASE_ENEMY_POWER + this.year;
	var logMessage = "";
	if (randInt <= Nation.PROBABILITY_OF_ATTACK + this.territory/2) {
		attack = true;
		this.military -= enemyStrength/4;
		logMessage = "YOU HAVE BEEN ATTACKED\n" + "Enemy Strength: " + enemyStrength + "\nYour military has been reduced by " + enemyStrength/4 + " units\n";
		if (this.military < 0) {
			this.population += this.military;
			this.territory--;
			logMessage += "Your population has been reduced by " + this.military * -1 + " units\n" + "You have lost 1 territory\n";
			this.military = 0;
		}
	}

	document.getElementById("log").innerHTML += logMessage;
	document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}

Nation.Country.updateYear = function() {
	this.year++;
	document.getElementById("log").innerHTML += "\nYear: " + this.year + "\n";
	document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}

Nation.Country.updateFood = function() {
	var netFood = this.population * (Nation.FOOD_GENERATED_PER_POP_PER_YEAR - Nation.FOOD_REQUIRED_PER_POPULATION);
	this.food += netFood;
	var logMessage = "Generating " + netFood + " food per year\n";
	document.getElementById("log").innerHTML += logMessage;
	document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}

Nation.Country.updatePopulation = function() {
	if (this.food >= Nation.FOOD_REQUIRED_TO_INCREASE_POP) {
		var logMessage = "Population has increased by 1\nFood has diminished by " + Nation.FOOD_REQUIRED_TO_INCREASE_POP + " units\n";
		this.population++;
		this.food -= Nation.FOOD_REQUIRED_TO_INCREASE_POP;

		document.getElementById("log").innerHTML += logMessage;
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
	}
}

Nation.Country.updateGold = function() {
	var genGold = this.population * Nation.GOLD_GENERATED_PER_POP_PER_YEAR;
	var defGold = this.military * Nation.MAINTENANCE_COST_MILITARY_PER_UNIT;
	var netGold = genGold - defGold;

	var logMessage = "Generating " + genGold + " gold per year\nSpending " + defGold + " gold per year on military\nNet gold generation: " + netGold + "\n";
	document.getElementById("log").innerHTML += logMessage;
	document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;

}

Nation.Country.updateTerritory = function() {
	var randInt = getRandomInt(0, 100-this.military);
	if (randInt <= Nation.PROBABILITY_OF_TERRITORY_ACQUISITION) {
		this.territory++;
		document.getElementById("log").innerHTML += "Acquired 1 territory\n";
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
	}
}

Nation.Country.purchaseFood = function (number) {
	if (this.gold >= Nation.PRICE_OF_PURCHASE_FOOD * number) {
		this.food += number;
		this.gold -= Nation.PRICE_OF_PURCHASE_FOOD * number;
		Nation.Game.displayStats();
		document.getElementById("log").innerHTML += "Purchased " + number + " food\nSpent " +  Nation.PRICE_OF_PURCHASE_FOOD * number + " gold\n";
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
	}
}

Nation.Country.purchaseTerritory = function() {
	if (this.gold >= Nation.PRICE_OF_PURCHASE_TERRITORY) {
		this.territory++;
		this.gold -= Nation.PRICE_OF_PURCHASE_TERRITORY;
		document.getElementById("log").innerHTML += "Purchased 1 territory\nSpent " +  Nation.PRICE_OF_PURCHASE_TERRITORY + " gold\n";
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
		Nation.Game.displayStats();
	}
}

Nation.Country.purchaseMilitaryUnit = function(number) {
	if (this.gold >= Nation.PRICE_OF_PURCHASE_MILITARY * number) {
		this.gold -= Nation.PRICE_OF_PURCHASE_MILITARY * number;
		this.military += number;
		document.getElementById("log").innerHTML += "Purchased " + number + " unit(s)\nSpent " +  Nation.PRICE_OF_PURCHASE_MILITARY * number + " gold\n";
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
		Nation.Game.displayStats();
	}
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
