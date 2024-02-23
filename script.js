
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


var x = canvas.width / 2;
var y = canvas.height + 100;

var biggestCircle = 40;
var biggestCircleOrigRadius = 40;
var secondCircle = 33;
var thirdCircle = 20;
var smallestCircle = 10;
var ballStatusAdd = false;
var limitBeat = biggestCircle + 10;
var beatSpeed = 2;
var beatsmallestSpeed = 1;
var checkMiddlePositionY = false;
var spiritBallParticles = [];
var lastPointedParticles = 0;
var limitEnergyLended = 45;
var beatingStatus = true;


function drawMainSpiritBall(){
	if (checkMiddlePositionY == false){

		y -= 3;

		if (y <= canvas.height / 2){
			checkMiddlePositionY = true;
			createEnergyExplosion();
		}
	} else {
		//locateMouse();
		moveLendEnergy();
	}

	beatEnergyBall();


	ctx.beginPath();
	ctx.arc(x, y, biggestCircle, 0, Math.PI * 2);
	ctx.fillStyle = '#BEFFFF';
	ctx.shadowColor = '#55E1FD';
	ctx.shadowBlur = 50;
	ctx.closePath();
	ctx.fill();
	ctx.save();



	ctx.shadowBlur = 20;
	ctx.shadowColor = 'rgba(0, 255, 247,1)';
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 0;
	ctx.beginPath();
	ctx.arc(x,y,thirdCircle,0,Math.PI*2);
	ctx.strokeStyle = '#A9FFFE';
	ctx.stroke();


	ctx.beginPath();
	ctx.arc(x, y, thirdCircle, 0, Math.PI * 2);
	ctx.fillStyle = 'rgba(174, 255, 255, 0.7)';
	ctx.closePath();
	ctx.fill();


	ctx.beginPath();
	ctx.arc(x, y, smallestCircle, 0, Math.PI * 2);
	ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
	ctx.shadowColor = 'rgba(255, 255, 255, 1)';
	ctx.shadowBlur = 50;
	ctx.closePath();
	ctx.fill();

	
}



function beatEnergyBall(){

	if (beatingStatus == true){
		if (ballStatusAdd == false){
			biggestCircle += beatSpeed;
			secondCircle += beatSpeed;
			thirdCircle += beatSpeed;
			smallestCircle += beatsmallestSpeed;
		
		if (biggestCircle >= limitBeat){
			ballStatusAdd = true;
		}

		} else {
				biggestCircle -= beatSpeed;
				secondCircle -= beatSpeed;
				thirdCircle -= beatSpeed;
				smallestCircle -= beatsmallestSpeed;

				if (biggestCircle <= biggestCircleOrigRadius){
					ballStatusAdd = false;
				
				}
		}
	
	}
}


function energySpiritBall(x, y, radius, speed, collide, origX, origY){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;
	this.collide = collide;
	this.origX = origX;
	this.origY = origY;
}

function generateEnergySpiritBall(){

	for(var i = 0; i < 800; i++){
		var randomX = 0;
		var selectCoordinate = (Math.floor(Math.random() * 4) + 1);
		var randomY = 0;
		var radius = randomRadius(2,4);
		var speed = (Math.floor(Math.random() * 100) + 150);
		var collide = 0;
	
		if (selectCoordinate == 4){
			//TOP
			randomY = -(randomCoordinate(1, canvas.height));
			randomX = randomCoordinate(1, canvas.width);
		} else if (selectCoordinate == 3){
			//RIGHT
			randomY = randomCoordinate(1, canvas.height);
			randomX = randomCoordinate(canvas.width + 50, canvas.width + 200);
		} else if (selectCoordinate == 2){
			//LEFT
			randomY = randomCoordinate(1, canvas.height);
			randomX = -(randomCoordinate(100, 200));
		} else{
			randomY = (randomCoordinate(canvas.height + 50, canvas.height + 200));
			randomX = (randomCoordinate(1, canvas.width));
		}

		var create = new energySpiritBall(randomX, randomY, radius, speed, collide, randomX, randomY);
		spiritBallParticles.push(create);
	}
}

function randomCoordinate(min, max){
	return Math.random() * (max-min) + min;
}

function randomRadius(min, max){
	return Math.random() * (max-min) + min;
}

generateEnergySpiritBall();

function drawlendEnergy(){
	for(var i = 0; i < spiritBallParticles.length; i++){
		ctx.beginPath();
		ctx.arc(spiritBallParticles[i].x, spiritBallParticles[i].y, spiritBallParticles[i].radius, 0, Math.PI * 2);
		ctx.fillStyle = '#A8FFFE';
		ctx.shadowColor = '#FFFFFE';
		ctx.shadowBlur = 15;
		ctx.closePath();
		ctx.fill();

		if (spiritBallParticles.length == 0){
			break;
		}
	}
}

function drawCreatedEnergy(){
	for(var i = 0; i < userCreatedSpiritBall.length; i++){
		ctx.beginPath();
		ctx.arc(userCreatedSpiritBall[i].x, userCreatedSpiritBall[i].y, userCreatedSpiritBall[i].radius, 0, Math.PI * 2);
		ctx.fillStyle = '#A8FFFE';
		ctx.shadowColor = '#FFFFFE';
		ctx.shadowBlur = 15;
		ctx.closePath();
		ctx.fill();
	}
}


var storebiggestCircle = 0;
var storesecondCircle = 0;
var storethirdCircle = 0;
var storesmallestCircle = 0;


function moveLendEnergy(){


	for(var i = 0; i < spiritBallParticles.length; i++){

		//USE DISTANCE FORMULA
		if ((lastPointedParticles + limitEnergyLended) >= i){
			
				spiritBallParticles[i].x -= (spiritBallParticles[i].x - x) / spiritBallParticles[i].speed;
				spiritBallParticles[i].y -= (spiritBallParticles[i].y - y) / spiritBallParticles[i].speed;
				

				var getDistance = Math.sqrt(Math.pow(x - spiritBallParticles[i].x, 2) + Math.pow(y - spiritBallParticles[i].y, 2));
				var getTotalRadius = spiritBallParticles[i].radius + biggestCircle;

				if (getDistance < getTotalRadius){

					if (Math.round(spiritBallParticles[i].radius) == 4) { 
						storebiggestCircle += 0.06;
						storesecondCircle += 0.06;
						storethirdCircle += 0.06;
						storesmallestCircle += 0.03;
					} else if (Math.round(spiritBallParticles[i].radius) == 3) { 
						storebiggestCircle += 0.05;
						storesecondCircle += 0.05;
						storethirdCircle += 0.05;
						storesmallestCircle += 0.02;
					} else if (Math.round(spiritBallParticles[i].radius) == 2) { 
						storebiggestCircle += 0.04;
						storesecondCircle += 0.04;
						storethirdCircle += 0.04;
						storesmallestCircle += 0.01;
					}

					
					
					//spiritBallParticles[i].collide = 1;
					//spiritBallParticles[i].x = -100;
					//spiritBallParticles[i].y = -100;

					if (storebiggestCircle >= 3){

						biggestCircle += storebiggestCircle;
						secondCircle += storesecondCircle;
						thirdCircle += storethirdCircle;
						smallestCircle += storesmallestCircle;
						limitBeat = biggestCircle + 10;
						biggestCircleOrigRadius = biggestCircle;
				

						storebiggestCircle = 0;
						storesecondCircle = 0;
						storethirdCircle = 0;
						storesmallestCircle = 0;
					}
					
					spiritBallParticles.splice(i, 1);
					lastPointedParticles += 1;				
					
					if (spiritBallParticles.length == 0){
						break;
					}
					
				}
			
		}
	}
}


var newpointX = 0;
var newpointY = 0;
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener("click", function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;

	if (biggestCircle < 220){
		createEnergyBall();
	}

});


var userCreatedSpiritBall = [];

function createEnergyBall(){
	var randomX = mouseX;
	var randomY = mouseY;
	var radius = randomRadius(2,4);
	var speed = 300;
	var collide = 0;
	var create = new energySpiritBall(randomX, randomY, radius, speed, collide, randomX, randomY);
	userCreatedSpiritBall.push(create);
}


function moveCreatedEnergyBall(){

	for(var i = 0; i < userCreatedSpiritBall.length; i++){

		if (userCreatedSpiritBall[i].collide == 0){
			userCreatedSpiritBall[i].x -= (userCreatedSpiritBall[i].x - x) / userCreatedSpiritBall[i].speed;
			userCreatedSpiritBall[i].y -= (userCreatedSpiritBall[i].y - y) / userCreatedSpiritBall[i].speed;

			x -= ((x - mouseX) / 500) / 10;
			y -= ((y - mouseY) / 500) / 10;

			var getDistance = Math.sqrt(Math.pow(x - userCreatedSpiritBall[i].x, 2) + Math.pow(y - userCreatedSpiritBall[i].y, 2));
			var getTotalRadius = userCreatedSpiritBall[i].radius + biggestCircle;

				if (getDistance < getTotalRadius){
					

				if (Math.round(userCreatedSpiritBall[i].radius) == 4) { 
						storebiggestCircle += 0.06;
						storesecondCircle += 0.06;
						storethirdCircle += 0.06;
						storesmallestCircle += 0.03;
					} else if (Math.round(userCreatedSpiritBall[i].radius) == 3) { 
						storebiggestCircle += 0.05;
						storesecondCircle += 0.05;
						storethirdCircle += 0.05;
						storesmallestCircle += 0.02;
					} else if (Math.round(userCreatedSpiritBall[i].radius) == 2) { 
						storebiggestCircle += 0.04;
						storesecondCircle += 0.04;
						storethirdCircle += 0.04;
						storesmallestCircle += 0.01;
					}

					
					userCreatedSpiritBall[i].collide = 1;

					//userCreatedSpiritBall[i].x = -100;
					//userCreatedSpiritBall[i].y = -100;

					if (storebiggestCircle >= 3){

						biggestCircle += storebiggestCircle;
						secondCircle += storesecondCircle;
						thirdCircle += storethirdCircle;
						smallestCircle += storesmallestCircle;
						limitBeat = biggestCircle + 10;
						biggestCircleOrigRadius = biggestCircle;
				

						storebiggestCircle = 0;
						storesecondCircle = 0;
						storethirdCircle = 0;
						storesmallestCircle = 0;
					}
					userCreatedSpiritBall.splice(i, 1);

					if (userCreatedSpiritBall.length == 0){
						break;
					}
		
				}

		}
			
	}

}


function animate(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	if (biggestCircle < 220){
		drawMainSpiritBall();
		drawlendEnergy();
		moveCreatedEnergyBall();
		drawCreatedEnergy();
	} else {
		beatingStatus = false;
		drawEnergyExplosion();
		moveAndCreateExplosion();
	}
	
	requestAnimationFrame(animate);
}


var explosionAnimation = false;
var explotionEnergyBall = [];

function createEnergyExplosion(){
	for(var i = 0; i < 300; i++){
		var origX = 0;
		var origY = 0;
		var selectCoordinate = (Math.floor(Math.random() * 4) + 1);
		if (selectCoordinate == 4){
			//TOP
			origY = -(randomCoordinate(20, canvas.height));
			origX = randomCoordinate(20, canvas.width);
		} else if (selectCoordinate == 3){
			//RIGHT
			origY = randomCoordinate(20, canvas.height);
			origX = randomCoordinate(canvas.width + 20, canvas.width + 200);
		} else if (selectCoordinate == 2){
			//LEFT
			origY = randomCoordinate(20, canvas.height);
			origX = -(randomCoordinate(100, 200));
		} else{
			origY = (randomCoordinate(canvas.height + 50, canvas.height + 200));
			origX = (randomCoordinate(20, canvas.width));
		}

		var randomX = randomCoordinate(x + 200, x - 200);
		var randomY = randomCoordinate(y + 200, y - 200);
		var radius = randomRadius(4,8);
		var speed = randomCoordinate(40, 60);
		var collide = 0;
		var create = new energySpiritBall(randomX, randomY, radius, speed, collide, Math.floor(origX), Math.floor(origY));
		explotionEnergyBall.push(create);
	}
}



function drawEnergyExplosion(){
	for(var i = 0; i < explotionEnergyBall.length; i++){
		ctx.beginPath();
		ctx.arc(explotionEnergyBall[i].x, explotionEnergyBall[i].y, explotionEnergyBall[i].radius, 0, Math.PI * 2);
		ctx.fillStyle = '#A8FFFE';
		ctx.shadowColor = '#FFFFFE';
		ctx.shadowBlur = 15;
		ctx.closePath();
		ctx.fill();
	}
}


var checkScene = [];

function moveAndCreateExplosion(){

	checkScene.length = 0;
	for(var i = 0; i < explotionEnergyBall.length; i++){

		explotionEnergyBall[i].x -= (explotionEnergyBall[i].x - explotionEnergyBall[i].origX) / explotionEnergyBall[i].speed;
		explotionEnergyBall[i].y -= (explotionEnergyBall[i].y - explotionEnergyBall[i].origY) / explotionEnergyBall[i].speed;


		if(Math.round(explotionEnergyBall[i].x) !== explotionEnergyBall[i].origX){
			checkScene.push(i);
		}


	}

	if (checkScene.length == 0){
		biggestCircle = 40;
		biggestCircleOrigRadius = 40;
		secondCircle = 33;
		thirdCircle = 20;
		smallestCircle = 10;
		ballStatusAdd = false;
		limitBeat = biggestCircle + 10;
		beatSpeed = 2;
		beatsmallestSpeed = 1;
		checkMiddlePositionY = false;
		spiritBallParticles = [];
		lastPointedParticles = 0;
		limitEnergyLended = 45;
		beatingStatus = true;
		x = canvas.width / 2;
		y = canvas.height + 100;
		generateEnergySpiritBall();
	}

}

requestAnimationFrame(animate);

 