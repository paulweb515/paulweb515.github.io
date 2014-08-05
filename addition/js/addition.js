function add_init(window, document) {
	var h1Element = document.getElementById("title");
	h1Element.innerHTML = "Addition";
	var addition = getVal();
	updateSum(window);
	setTotals(window);
}

function saveVal(addition) {
	localStorage.setItem("io.paulweb515.addition", JSON.stringify(addition));
}

function getVal() {
	var localJSON = localStorage.getItem("io.paulweb515.addition");
	if (localJSON == undefined) {
		var addition = {};
		addition.min = 2;
		addition.max = 20;
		addition.topInt = 0;
		addition.bottomInt = 0;
		addition.correct = 0;
		addition.total = 0;
		saveVal(addition);
		return addition;
	}
	return JSON.parse(localJSON);
}

function add_validate(window,inputElement) {
	var addition = getVal();
	var val = inputElement.value;
	var correctElement = window.document.getElementById("correct");
	addition.total++;
	var gotRight = val == (addition.topInt + addition.bottomInt);
	if (gotRight) {
		addition.correct++;
	}
	saveVal(addition);
	setTotals(window);
	updateLog(window, val, gotRight);
	updateSum(window);
	inputElement.value = "";
}

function setTotals(window) {
	var addition = getVal();
	var aEl = window.document.getElementById("answered");
	aEl.innerHTML = addition.correct;
	var tEl = window.document.getElementById("total");
	tEl.innerHTML = addition.total;
}

function updateLog(window, val, gotRight) {
	var addition = getVal();
	var logEl = window.document.getElementById("log");
	var oldLog = logEl.innerHTML;
	logEl.innerHTML = addition.topInt + " + " + addition.bottomInt
		+ " = " + val + " " + (gotRight?"\u2713":"\u2717") + "<br/>"
		+ oldLog;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
 
function updateSum(window) {
	var addition = getVal();
	addition.topInt = randomIntFromInterval(addition.min, addition.max);
	addition.bottomInt = randomIntFromInterval(addition.min, addition.max);
	var topElement = window.document.getElementById("top");
	topElement.innerHTML = addition.topInt;
	var bottomElement = window.document.getElementById("bottom");
	bottomElement.innerHTML = addition.bottomInt;
	saveVal(addition);
}

function add_clear(window) {
	var addition = getVal();
	addition.correct = 0;
	addition.total = 0;
	saveVal(addition);
	setTotals(window);
	var logEl = window.document.getElementById("log");
	logEl.innerHTML = "";
}
