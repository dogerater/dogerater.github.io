window.addEventListener('load', function() {
    document.getElementById("image").style.height = (document.body.clientHeight - document.getElementById("menu").clientHeight).toString() + "px";
});


class Dog {
	constructor(rating, gamesPlayed, kFactor, wPerc, image) {
		this._rating = rating;
		this._gamesPlayed = gamesPlayed;
		this._kFactor = kFactor;
		this._wPerc = wPerc;
		this._image = image;
	}
	get rating() {
		return this._rating;
	}
	get gamesPlayed() {
		return this._gamesPlayed;
	}
	get kFactor() {
		return this._kFactor;
	}
	get wPerc() {
		return this._wPerc;
	}
	get image() {
		return this._image;
	}
	set rating(x) {
		this._rating = x;
	}
	set gamesPlayed(x) {
		this._gamesPlayed = x;
	}
	set kFactor(x) {
		this._kFactor = x;
	}
	set wPerc(x) {
		this._wPerc = x;
	}
	set image(x) {
		this._image = x;
	}
}

var dog = new Dog(1500, 10, 30, 0.8, "/images/dog1.jpeg");
// var dog = {
//     image: "/images/dog1.jpeg",
//     kValue: 30, //add ½ and floor it in order to get the lowest integer
//     id: 12345678,
//     eLO: 1500,
//     gamesPlayed: 10,
// 	wPerc: 0.8,
// }
// var dog2 = {
//     image: "/images/dog2.jpeg",
//     kValue: 25, //add ½ and floor it in order to get the lowest integer
//     id: 12345679,
//     eLO: 1200,
// 	gamesPlayed: 4,
// 	wPerc: 0.8,
// }
var dog2 = new Dog(1200, 4, 25, 0.8, "/images/dog2.jpeg");

window.addEventListener('load', function() {
    document.getElementById("left-image").onclick = function(event) {
	    document.getElementById("dog-1-text").innerHTML = dog.rating;
		document.getElementById("dog-2-text").innerHTML = dog2.rating;
	    setTimeout(function () {
			setTimeout(function () {
				document.getElementById("dog-1-text").innerHTML = calculate(dog.rating, dog2.rating, true);
				document.getElementById("dog-2-text").innerHTML = calculate(dog2.rating, dog.rating, true);
				setTimeout(function () {
					loadNewMatchup(true)
				}, 1000)
			}, 1000)
	    }, 1000)
    };
});

window.addEventListener('load', function() {
    document.getElementById("right-image").onclick = function(event) {
        alert("This was my senior quote");
    };
});


function calculate(left, right, bool) {
    return left - 15;
}
function loadNewMatchup(bool) {
	document.getElementById("left-image").src = "/images/dog2.jpeg";
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
