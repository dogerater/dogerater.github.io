document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("game-wrapper").style.height = (document.body.clientHeight - document.getElementById("menu").clientHeight).toString() + "px";
});

let dog = {
    rating:1500,
	gamesPlayed:10,
    kfactor:30,
    wPerc:0.8,
    image:"/images/dog1/jpeg"
}

let dog2 = {
	rating:1200,
	gamesPlayed:4,
    kfactor:25,
    wPerc:0.8,
    image:"/images/dog1/jpeg"
}

let leftText = document.getElementById("dog-1-text");
let rightText = document.getElementById("dog-2-text");
let vs = document.getElementById("vs");
let leftImage = document.getElementById("left-image");
window.addEventListener('load', function() {
    leftImage.onclick = function(event) {
		leftText.innerHTML = dog.rating;
		rightText.innerHTML = dog2.rating;
		dog.rating = calculate(dog.rating, dog2.rating, true);
		dog2.rating = calculate(dog2.rating, dog.rating, true);
		leftWins();
		vs.innerHTML = "Next";
	};
});

window.addEventListener('load', function() {
	vs.onclick = function(event) {
		loadNewMatchup(true);
		vs.innerHTML = "Vs";
	};
});

//This is wrong, the second if statement should be flipped to < and ++ or idk
function leftWins() {
	if (leftText.innerHTML > calculate(dog.rating, dog2.rating, true)) {
		setTimeout(function() { leftText.innerHTML--; leftWins(); }, 100);
	}
	if (rightText.innerHTML > calculate(dog2.rating, dog.rating, true)) {
		setTimeout(function() { rightText.innerHTML--; leftWins(); }, 100);
	}
}

function calculate(left, right, bool) {
    return left - 15;
}
function loadNewMatchup(bool) {
	leftImage.src = "/images/dog2.jpeg";
}
function probability(curr, opp){
	return 1.0/(1.0 + Math.pow(10, (opp - curr)/400));
}
function newRating(curr, opp, kFactor, bool){
	if (bool) {
		return curr + (1 - probability(opp)) * kFactor;
	} else {
		return curr + (-1 * probability(opp)) * kFactor
	}
}
function getK(rating, gamesPlayed, wPerc){
	if (gamesPlayed < 5) {
		return 40;
	} else if (gamesPlayed < 15){
		return 30;
	} else if (wPerc > 0.8){
		return 35;
	} else if (rating < 1200){
		return 30;
	} else if (rating < 1700){
		return 20;
	} else if(rating < 2200){
		return 15;
	} else{
		return 10;
	}
}
