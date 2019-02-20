var paddleHeight = 150;
var paddleWidth = 10;
var ballRadius = 25;
var halfPaddleHeight = paddleHeight / 2;
var speedOfPaddle1 = 0;
var positionOfPaddle1 = 460;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = 460;
var topPositionOfBall = 510;
var leftPositionOfBall = 820;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
var score1 = 0;
var score2 = 0;

function startBall() { //spawns ball on specified position
	topPositionOfBall = 510;
	leftPositionOfBall = 820;
	if (Math.random() < 0.5) { //random = 0 || 1
		var side = 1
	} else {
		var side = -1
	}
	topSpeedOfBall = Math.random() * 2 + 3; //minimal speed is 3 (0); max speed is 5(1) on y-axis
	leftSpeedOfBall = side * (Math.random() * 2 + 3); //x-axis;  var side behaves like a bool. ball goes either left or right.
};

document.addEventListener('keydown', function (e) { //  event(e) get executed by pressing key
     if (e.keyCode == 87 || e.which == 87) { // W key   keycode 87=w   (.which) doublechecks keyCode but is not neccessary(altenate key, depends on browser)
      speedOfPaddle1 = -10;
     }
     if (e.keyCode == 83 || e.which == 83) { // S Key keycode 83=s
      speedOfPaddle1 = 10;
		}																					//player2
     if (e.keyCode == 38 || e.which == 38) { // up arrow
      speedOfPaddle2 = -10;
     }
     if (e.keyCode == 40 || e.which == 40) { // down arrow
      speedOfPaddle2 = 10;
     }
}, false);

document.addEventListener('keyup', function (e) {   //when key gets released, paddle stops moving. velocity=0
	if (e.keyCode == 87 || e.which == 87) { 	//.which
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	}
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	}
}, false); //false because bubbling instead of capturing method. important for order. bubbling goes in, goes to parent. capture vice versa.
function print() {
	console.log(positionOfPaddle1);
}

window.setInterval(function show() { //content gets executed in specified interval, here 60fps
	positionOfPaddle1 += speedOfPaddle1;   //pos and speed gets added - (object is moving = if-statement is true)
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	if (positionOfPaddle1 <= 150) {  //paddle1 can't leave frame. max frame in display is 150
		positionOfPaddle1 = 150;
	}
	if (positionOfPaddle2 <= 150) {
		positionOfPaddle2 = 150;
	}
	if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {  // paddle can't leave downwards. measures distance between last point of paddle and canvas
		positionOfPaddle1 = window.innerHeight - paddleHeight;
	}
	if (positionOfPaddle2 >= window.innerHeight - paddleHeight) { 	//same for paddle 2
		positionOfPaddle2 = window.innerHeight - paddleHeight;
	}
	if (topPositionOfBall <= 150 || topPositionOfBall >= window.innerHeight - ballRadius) { //if ball collides with vertical border, it is reflected in y direction.
		topSpeedOfBall = -topSpeedOfBall
	}
	if (leftPositionOfBall <= paddleWidth) {
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			leftSpeedOfBall = -leftSpeedOfBall;  //ball gets reflected in x direction (right)
		} else {  //if ball gets not reflected, player2 scores
			score2++;
			startBall(); //and game re-starts
		}
	}
	if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth) { //right direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			leftSpeedOfBall = -leftSpeedOfBall 	//ball gets reflected in x direction (left)
		} else {
			score1++   //same for this. player1 scores
			startBall();
		}
	}                                    //objects gets visualized

	document.getElementById("paddle1").style.top = (positionOfPaddle1) + "px"; //position of paddle1 is transfered to the object on the canvas
	document.getElementById("paddle2").style.top = (positionOfPaddle2) + "px";
	document.getElementById("ball").style.top = (topPositionOfBall) + "px"; //y position of ball gets transformed on the object of the canvas
	document.getElementById("ball").style.left = (leftPositionOfBall) + "px";  //x position of ball gets transformed on the object of the canvas
	document.getElementById('score1').innerHTML = score1.toString(); //score gets displayed
	document.getElementById('score2').innerHTML = score2.toString();
}, 1000/60); //content gets displayed in 60 frames per second.
