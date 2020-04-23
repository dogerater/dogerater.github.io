document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("game-wrapper").style.height = (document.body.clientHeight - document.getElementById("menu").clientHeight).toString() + "px";
})

// -------------- VARIABLES ---------------------- //

let leftDog = {
    rating:1500,
	gamesPlayed:10,
    wPerc:0.8,
    image:"/images/dog1/jpeg"
}

let rightDog = {
	rating:1200,
	gamesPlayed:4,
    wPerc:0.8,
    image:"/images/dog2/jpeg"
}

let state = "game";
const leftText = document.getElementById("left-dog-text");
const rightText = document.getElementById("right-dog-text");
const vs = document.getElementById("vs");
const leftImage = document.getElementById("left-image");
const rightImage = document.getElementById("right-image");

// ----------- HELPER FUNCTIONS ---------------- //

/*
 * Purpose: returns the k-value of the dog it is inputed.
 * Input: a dog
 */
function getK(boi){
	if (boi.gamesPlayed < 5) {
		return 40;
	} else if (boi.gamesPlayed < 15){
		return 30;
	} else if (boi.wPerc > 0.8){
		return 35;
	} else if (boi.rating < 1200){
		return 30;
	} else if (boi.rating < 1700){
		return 20;
	} else if(boi.rating < 2200){
		return 15;
	} else{
		return 10;
	}
}

/*
 * Purpose: returns the probability of a dog winning
 * Input: two ratings (ints), in the order <dog we want>, <opponent> regardless of right and left
 */
function probability(curr, opp){
	return 1.0/(1.0 + Math.pow(10, (opp - curr)/400));
}

/* 
 * Purpose: changes the inner html of the dogs to the current rating by scrolling
 * Input: 2 ints and a boolean. leftRating is the left dog's rating, rightRating is the right
 * dog's rating, the boolean is if left won
 */
function spin(leftRating, rightRating, leftWins) {
	if (leftWins) {
		while (leftText.innerHTML < leftRating) {
			leftText.innerHTML++;
		}
		while (rightText.innerHTML > rightRating) {
			rightText.innerHTML--;
		}
	} else {
		while (leftText.innerHTML > leftRating) {
			leftText.innerHTML--;
		}
		while (rightText.innerHTML < rightRating) {
			rightText.innerHTML++;
		}
	}
}

/*
 * Purpose: changes the screen so the user knows to choose a new match
 * Input: null
 */
function changeScreen() {
	vs.innerHTML = "Click to Load New Match"
	state = "results";
}

/*
 * Purpose: calculates the new rating for a dog
 * Input: two dogs and an int, in the order <dog we want>, <opponent> regardless of right and left.
 * the int is 1 if the current dog won and 0 if the current dog lost
 */
function calculate(curr, opp, gameResult) {
	kValue = getK(curr);
	likelihood = probability(curr.rating, opp.rating);
	changeInRating = (gameResult - likelihood) * kValue;
    return curr.rating + changeInRating;
}

/*
 * Purpose: updates both dogs properties
 * Input: boolean for if left dog wins
 * Notes: notice that we calculate the ratings, before we update properties.
 * GamesWon must be updated before games played bc it relies on games played
 */
function updateDogs(leftWins) {
	leftDog.rating = calculate(leftDog, rightDog, 1);
	rightDog.rating = calculate(rightDog, leftDog, 0);
	if (leftWins) {
		leftGamesWon = (leftDog.gamesPlayed * leftDog.wPerc) + 1;
		rightGamesWon = (rightDog.gamesPlayed * rightDog.wPerc);
	} else {
		leftGamesWon = (leftDog.gamesPlayed * leftDog.wPerc);
		rightGamesWon = (rightDog.gamesPlayed * rightDog.wPerc) + 1;
	}
	leftDog.gamesPlayed++;
	rightDog.gamesPlayed++;
	leftDog.wPerc = leftGamesWon / leftDog.gamesPlayed;
	rightDog.wPerc = rightGamesWon / rightDog.gamesPlayed;
}

// ---------------- HANDLERS ---------------------- //

window.addEventListener('load', (event) => {
    leftImage.onclick = (event) => {
		leftText.innerHTML = leftDog.rating;
		rightText.innerHTML = rightDog.rating;
		updateDogs(true);
		spin(leftDog.rating, rightDog.rating, true);
		changeScreen();
	}
})

window.addEventListener('load', (event) => {
    rightImage.onclick = (event) => {
		leftText.innerHTML = leftDog.rating;
		rightText.innerHTML = rightDog.rating;
		updateDogs(false);
		spin(leftDog.rating, rightDog.rating, false);
		changeScreen();
	}
})

window.addEventListener('load', (event) => {
	vs.onclick = (event) => {
		if (state == "results") {
			leftImage.src = "/images/dog2.jpeg";
			rightImage.src = "/images/dog1.jpeg";
			vs.innerHTML = "Vs";
			leftText.innerHTML = '';
			rightText.innerHTML = '';
			state = "game";
		}
	}
})
