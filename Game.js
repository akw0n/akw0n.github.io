var Nation = Nation || {};

Nation.FOOD_GENERATED_PER_POP_PER_YEAR = 6;
Nation.GOLD_GENERATED_PER_POP_PER_YEAR = 5;
Nation.FOOD_REQUIRED_PER_POPULATION = 5;
Nation.PRICE_OF_PURCHASE_FOOD = 10;
Nation.PRICE_OF_PURCHASE_MILITARY = 10;
Nation.PRICE_OF_PURCHASE_TERRITORY = 1000;
Nation.MAINTENANCE_COST_MILITARY_PER_UNIT = 5; 
Nation.PROBABILITY_OF_TERRITORY_ACQUISITION = 10;
Nation.PROBABILITY_OF_ATTACK = 1;
Nation.BASE_ENEMY_POWER = 10;
Nation.FOOD_REQUIRED_TO_INCREASE_POP = 50;

Nation.Game = {};

Nation.Game.init = function () {
	this.Country = Nation.Country;
	this.Country.init({
		year: 0,
		population: 10,
		territory: 5,
		food: 50,
		gold: 50,
		military: 1,
	});
}

Nation.Game.updateGame = function () {	
	this.Country.updateYear();
	this.Country.updateFood();
	this.Country.updatePopulation();
	this.Country.updateGold();
	this.Country.updateTerritory();
	this.Country.attack();
	this.Country.checkIfLost();
	Nation.Game.displayStats();
}

Nation.Game.displayStats = function () {
	document.getElementById("year").innerHTML = this.Country.year;
	document.getElementById("population").innerHTML = this.Country.population;
	document.getElementById("territory").innerHTML = this.Country.territory;
	document.getElementById("food").innerHTML = this.Country.food;
	document.getElementById("gold").innerHTML = this.Country.gold;
	document.getElementById("military").innerHTML = this.Country.military;
}

Nation.Game.init();